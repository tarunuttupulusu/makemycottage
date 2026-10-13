import React from 'react';
import { motion } from 'framer-motion';

/**
 * GalleryHeroImage Component
 * Premium hero image banner for the gallery page with smooth entrance zoom animation.
 */
const GalleryHeroImage = ({
  src = '/images/gallery-hero.png',
  alt = 'MakeMyCottage Luxury Glass Cottage in Winter',
  className = '',
}) => {
  return (
    <motion.div
      initial={{ scale: 1.08, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`absolute inset-0 w-full h-full overflow-hidden bg-[#1c1d21] pointer-events-none ${className}`}
    >
      <motion.img
        initial={{ scale: 1.25 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center select-none"
        loading="eager"
      />
      {/* Multi-Stop Gradient Overlay: Dark at top for navbar legibility, dark at bottom for notch contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/60 pointer-events-none" />
    </motion.div>
  );
};

export default GalleryHeroImage;
