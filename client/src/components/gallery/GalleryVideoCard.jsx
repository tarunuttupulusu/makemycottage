import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import {
  registerGalleryVideo,
  notifyVideoStartedPlaying,
} from './galleryVideoManager';

/**
 * GalleryVideoCard Component
 * Strictly for MakeMyCottage Gallery Section.
 * - Embeds YouTube videos with all native YouTube controls & branding suppressed (controls=0).
 * - Custom minimalist controls: Play/Pause button and Mute/Unmute button.
 * - Single-active playback: strictly only ONE video can play at a time.
 *   If any video starts playing, all other gallery videos are instantly paused.
 * - Plays muted by default; user can freely toggle mute/unmute via custom volume button.
 */
const GalleryVideoCard = ({
  id,
  videoId,
  title = 'MakeMyCottage Video Tour',
  className = '',
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const userPausedManuallyRef = useRef(false);
  const iframeId = `gallery-yt-frame-${id}`;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Helper to send postMessage commands to YouTube iframe
  const sendCommand = useCallback((func, args = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  }, []);

  // Safe pause handler combining direct YT.Player API and postMessage
  const handlePause = useCallback((isUserAction = false) => {
    if (isUserAction) {
      userPausedManuallyRef.current = true;
    }
    try {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
    } catch {
      // Fallback
    }
    sendCommand('pauseVideo');
    setIsPlaying(false);
  }, [sendCommand]);

  // Safe play handler
  const handlePlay = useCallback(() => {
    userPausedManuallyRef.current = false;
    notifyVideoStartedPlaying(id);
    try {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        ytPlayerRef.current.playVideo();
      }
    } catch {
      // Fallback
    }
    sendCommand('playVideo');
    setIsPlaying(true);
  }, [id, sendCommand]);

  // Toggle play/pause handler
  const handleTogglePlay = (e) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      handlePause(true);
    } else {
      handlePlay();
    }
  };

  // Toggle mute/unmute handler
  const handleToggleMute = (e) => {
    if (e) e.stopPropagation();
    if (isMuted) {
      try {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
        }
      } catch {
        // Fallback
      }
      sendCommand('unMute');
      setIsMuted(false);
    } else {
      try {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.mute === 'function') {
          ytPlayerRef.current.mute();
        }
      } catch {
        // Fallback
      }
      sendCommand('mute');
      setIsMuted(true);
    }
  };

  // Register this video card with the central Gallery Video Manager
  useEffect(() => {
    const unregister = registerGalleryVideo(id, {
      pause: () => handlePause(false),
      iframe: iframeRef.current,
      sendCommand,
    });
    return () => unregister();
  }, [id, handlePause, sendCommand]);

  // Load YouTube IFrame API script once if not already on the page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.YT) {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    }
  }, []);

  // Initialize YT.Player instance when API is available
  const setupYTPlayer = useCallback(() => {
    if (typeof window === 'undefined' || !window.YT || !window.YT.Player) return;
    if (ytPlayerRef.current) return;

    try {
      ytPlayerRef.current = new window.YT.Player(iframeId, {
        events: {
          onReady: (event) => {
            try {
              event.target.mute();
              setIsMuted(true);
            } catch {
              // Ignore
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING = 1, YT.PlayerState.BUFFERING = 3
            if (event.data === 1) {
              setIsPlaying(true);
              notifyVideoStartedPlaying(id);
            } else if (event.data === 2 || event.data === 0) {
              // YT.PlayerState.PAUSED = 2, YT.PlayerState.ENDED = 0
              setIsPlaying(false);
            }
          },
        },
      });
    } catch {
      // Ignore if iframe not yet ready or already bound
    }
  }, [id, iframeId]);

  // Handle iframe load
  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Subscribe to postMessage state change events
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'listening' }),
        '*'
      );
      sendCommand('mute');
      setIsMuted(true);
    }

    if (window.YT && window.YT.Player) {
      setupYTPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        setupYTPlayer();
      };
    }
  };

  // Listen for YouTube postMessage events specifically sent from THIS iframe
  useEffect(() => {
    const handleWindowMessage = (e) => {
      // Strictly verify message source comes from THIS iframe's window
      if (e.source !== iframeRef.current?.contentWindow) return;

      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'onStateChange') {
          if (data.info === 1) {
            setIsPlaying(true);
            notifyVideoStartedPlaying(id);
          } else if (data.info === 2 || data.info === 0) {
            setIsPlaying(false);
          }
        }
      } catch {
        // Ignore non-json postMessages
      }
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [id]);

  // IntersectionObserver: single-video scroll playback with automatic pausing when scrolled out
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!userPausedManuallyRef.current) {
              notifyVideoStartedPlaying(id);
              sendCommand('mute');
              setIsMuted(true);
              try {
                if (ytPlayerRef.current?.mute) ytPlayerRef.current.mute();
                if (ytPlayerRef.current?.playVideo) ytPlayerRef.current.playVideo();
              } catch {
                // Fallback
              }
              sendCommand('playVideo');
              setIsPlaying(true);
            }
          } else {
            // Scrolled out of view: pause immediately
            handlePause(false);
          }
        });
      },
      {
        threshold: 0.7, // Must be prominently centered in the viewport
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id, handlePause, sendCommand]);

  const originParam = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div
      ref={containerRef}
      onClick={handleTogglePlay}
      className={`group relative rounded-2xl sm:rounded-[22px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-charcoal/25 hover:border-charcoal/50 bg-black aspect-[16/9] w-full flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      {/* YouTube Iframe with controls=0 (removes YouTube logo, More Videos, scrub bar, channel header) */}
      <iframe
        id={iframeId}
        ref={iframeRef}
        onLoad={handleIframeLoad}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&fs=0&disablekb=1${
          originParam ? `&origin=${encodeURIComponent(originParam)}` : ''
        }`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
      />

      {/* Center Play Button Overlay (shown when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-all duration-300 z-20 pointer-events-none">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-[#28282c] shadow-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 active:scale-95 group-hover:bg-white"
            aria-hidden="true"
          >
            <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
          </div>
        </div>
      )}

      {/* Bottom Minimalist Control Bar: ONLY Play/Pause and Mute/Unmute */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 ${
          isPlaying ? 'opacity-90 group-hover:opacity-100' : 'opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Play / Pause Toggle Button */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border border-white/25 cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" />
            )}
          </button>
          <span className="text-white text-xs sm:text-[13px] font-medium tracking-tight drop-shadow truncate max-w-[150px] sm:max-w-[230px]">
            {title}
          </span>
        </div>

        {/* Mute / Unmute Toggle Button */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border border-white/25 cursor-pointer"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default GalleryVideoCard;

