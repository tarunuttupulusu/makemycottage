import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LogoLoop from '../components/common/LogoLoop';

const groundRules = [
  {
    number: '01',
    badge: 'Quality Materials',
    title: 'Built with lasting quality',
    description: 'We choose durable, high-quality materials to create cottages that stay beautiful, comfortable, and reliable for years to come.'
  },
  {
    number: '02',
    badge: 'Thoughtful Design',
    title: 'Every detail matters',
    description: 'From smart layouts to natural finishes, every detail is planned to create a welcoming space that feels just right.'
  },
  {
    number: '03',
    badge: 'Faster Construction',
    title: 'From plans to reality',
    description: 'Our streamlined construction process helps bring your dream cottage to life efficiently, with attention to every detail.'
  },
  {
    number: '04',
    badge: 'Complete Transparency',
    title: 'Confidence at every step',
    description: 'From the initial design to the final handover, we keep you informed about the process, costs, and progress.'
  }
];

const timelineMilestones = [
  {
    year: '2009',
    badge: 'Growth',
    title: 'First crew',
    description: 'Make My Cottage started with dedicated timber artisan crews managing challenging wooden cottages and custom retreat builds.'
  },
  {
    year: '2012',
    badge: 'Challenge',
    title: 'Missed deadline',
    description: 'A delayed fit-out required Make My Cottage to completely overhaul scheduling, modular prefabrication, and supplier coordination.'
  },
  {
    year: '2015',
    badge: 'Commitment',
    title: 'Walked away',
    description: 'Make My Cottage rejected a lucrative contract due to unrealistic timelines that would have compromised wood seasoning and structural joinery.'
  },
  {
    year: '2018',
    badge: 'Milestone',
    title: 'Structural pivot',
    description: 'Transitioned to 100% precision CNC engineered timber, certified kiln-dried woods, and European-standard thermal insulation systems.'
  },
  {
    year: '2021',
    badge: 'Innovation',
    title: 'Live tracking',
    description: 'Pioneered direct client portal access with daily photo journals and milestone sign-offs, eliminating communication vacuums.'
  },
  {
    year: '2024',
    badge: 'Scale',
    title: 'Nationwide presence',
    description: 'Over 50+ luxury wooden cottages, eco-resorts, and farmhouses delivered turnkey across Telangana, Andhra, Karnataka, and Pan-India.'
  }
];

const teamMembers = [
  {
    name: 'Manjunath',
    role: 'Founder & Visionary Leader',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    bio: 'With a passion for traditional craftsmanship and timeless architecture, Manjunath leads the vision behind Make My Cottage. He is dedicated to creating thoughtfully designed spaces while preserving the beauty of natural materials and traditional wooden artistry through Manuvalogillu, a collection of vintage wooden treasures.'
  },
  {
    name: 'Madhuri',
    role: 'Co-Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    bio: 'Madhuri brings creativity, elegance, and a deep appreciation for traditional Indian heritage to Make My Cottage. Alongside Manjunath, she helps celebrate the charm of vintage wooden pieces through Manuvalogillu, bringing character, culture, and timeless beauty into modern homes.'
  }
];

const recognitions = [
  {
    id: '01',
    year: '2011',
    title: 'NHBC registered builder & craftsman',
    awardedBy: 'National House Building Council',
    detail: 'Recognized for precision timber joinery and foundation waterproofing integrity.'
  },
  {
    id: '02',
    year: '2016',
    title: 'Federation of master builders member',
    awardedBy: 'Master Builders Guild',
    detail: 'Certified for high-standard craftsmanship and verified ethical client management.'
  },
  {
    id: '03',
    year: '2019',
    title: 'ISO 9001:2015 Quality Certified',
    awardedBy: 'International Quality Standards',
    detail: 'Endorsed for structural timber quality control, lumber kiln seasoning, and risk mitigation.'
  },
  {
    id: '04',
    year: '2023',
    title: 'Built environment architecture award',
    awardedBy: 'Industry Excellence Board',
    detail: 'Awarded for landmark eco-resorts and climate-resilient wooden farmhouses.'
  },
  {
    id: '05',
    year: '2024',
    title: 'CHAS accredited principal contractor',
    awardedBy: 'Contractors Health & Safety Scheme',
    detail: 'Acknowledged for zero-incident site safety records and disciplined coordination.'
  }
];

// Brand logos for <LogoLoop /> with transparent backgrounds
const brandLogos = [
  {
    src: '/images/logos/jk-fenner.png',
    alt: 'JK Fenner',
    title: 'JK Fenner'
  },
  {
    src: '/images/logos/andhra-pradesh-govt.png',
    alt: 'Government of Andhra Pradesh',
    title: 'Government of Andhra Pradesh'
  },
  {
    src: '/images/logos/grandpaw-resorts.png',
    alt: 'Grandpaw Pet Resorts',
    title: 'Grandpaw Pet Resorts'
  },
  {
    src: '/images/logos/navya-developers.png',
    alt: 'Navya Developers',
    title: 'Navya Developers'
  },
  {
    src: '/images/logos/velugu-organisation.png',
    alt: 'Velugu A Voluntary Organisation',
    title: 'Velugu A Voluntary Organisation'
  }
];

const springTransition = {
  type: 'spring',
  damping: 42,
  stiffness: 90,
  mass: 1
};

const TimelineMilestoneItem = ({ item, idx, historyProgress }) => {
  const thresholds = [0.0, 0.18, 0.38, 0.58, 0.78, 0.96];
  const threshold = thresholds[idx];

  const dotBorder = useTransform(
    historyProgress,
    [Math.max(0, threshold - 0.04), threshold],
    ['#DDD5C2', '#1B1915']
  );
  const dotBg = useTransform(
    historyProgress,
    [Math.max(0, threshold - 0.04), threshold],
    ['#FAF7F0', '#1B1915']
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Milestone Circle Dot centered directly on the timeline line at every year */}
      <motion.span
        style={{
          borderColor: dotBorder,
          backgroundColor: dotBg
        }}
        className="absolute left-[-40px] md:left-[-56px] top-2 sm:top-2.5 w-4 h-4 rounded-full border-[3px] shadow-sm z-20"
      />

      {/* Year & Badge Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#1B1915] tracking-tight">
          {item.year}
        </span>
        <span className="bg-[#FAE1A6] text-[#271E07] px-3 py-1 rounded-[4px] text-xs font-medium shadow-sm">
          {item.badge}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1B1915] mb-2.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-base text-[#504732] leading-relaxed font-normal max-w-xl">
        {item.description}
      </p>
    </motion.div>
  );
};

const AboutPage = () => {
  // Sticky Stacking Cards Section Scroll Controller
  const stackedSectionRef = useRef(null);
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackedSectionRef,
    offset: ['start start', 'end end']
  });

  // Background blur and dimming over the panoramic foundation image
  // 0 to 0.12: Crystal clear (0px blur, 0 dim) - user sees pure background image
  // 0.12 to 0.28: Smoothly blurs (0 -> 14px) and dims (0 -> 0.32) as Card 1 arrives
  // 0.28 to 0.86: Stays blurred while cards are being read
  // 0.86 to 1.0: Remains blurred as Card 2 exits into Ground Rules
  const bgBlur = useTransform(stackProgress, [0, 0.12, 0.28, 0.86], [0, 0, 14, 14]);
  const bgDim = useTransform(stackProgress, [0, 0.12, 0.28, 0.86], [0, 0, 0.32, 0.32]);

  // Card 1 ("Future Expectation")
  // 0 to 0.12: Hidden below (y: 120, opacity: 0) while background is shown clearly
  // 0.12 to 0.28: Slides up smoothly into center (y: 120 -> 0, opacity: 0 -> 1, scale: 0.94 -> 1)
  // 0.28 to 0.48: Centered and fully readable (y: 0, opacity: 1, scale: 1)
  // 0.48 to 0.62: Slides up slightly and fades out (y: 0 -> -35, opacity: 1 -> 0, scale: 1 -> 0.92)
  const card1Y = useTransform(stackProgress, [0, 0.12, 0.28, 0.48, 0.62], [120, 120, 0, 0, -35]);
  const card1Scale = useTransform(stackProgress, [0, 0.12, 0.28, 0.48, 0.62], [0.94, 0.94, 1, 1, 0.92]);
  const card1Opacity = useTransform(stackProgress, [0, 0.12, 0.26, 0.48, 0.60], [0, 0, 1, 1, 0]);
  const card1Pointer = useTransform(card1Opacity, o => (o > 0.2 ? 'auto' : 'none'));

  // Card 2 ("Working standard")
  // 0 to 0.48: Hidden below (y: 160, opacity: 0)
  // 0.48 to 0.64: Slides up smoothly into center (y: 160 -> 0, opacity: 0 -> 1, scale: 0.94 -> 1)
  // 0.64 to 0.84: Centered and fully readable (y: 0, opacity: 1, scale: 1)
  // 0.84 to 1.0: Slides up and fades out (y: 0 -> -90, opacity: 1 -> 0, scale: 1 -> 0.95)
  const card2Y = useTransform(stackProgress, [0, 0.48, 0.64, 0.84, 1.0], [160, 160, 0, 0, -90]);
  const card2Scale = useTransform(stackProgress, [0, 0.48, 0.64, 0.84, 1.0], [0.94, 0.94, 1, 1, 0.95]);
  const card2Opacity = useTransform(stackProgress, [0, 0.48, 0.62, 0.84, 0.98], [0, 0, 1, 1, 0]);
  const card2Pointer = useTransform(card2Opacity, o => (o > 0.2 ? 'auto' : 'none'));

  // =========================================================================
  // Ground Rules Sticky Scroll Controller & One-by-One Line Shrinking
  // The section stays pinned in the viewport while each line progressively shrinks
  // from 254px down to 133px one by one along with the scroll.
  // All 4 bars complete shrinking by 65% progress, ensuring all bars are fully
  // completed before the section ever scrolls down.
  // =========================================================================
  const groundRulesRef = useRef(null);
  const { scrollYProgress: groundProgress } = useScroll({
    target: groundRulesRef,
    offset: ['start start', 'end end']
  });

  const col1Height = useTransform(groundProgress, [0.05, 0.20], [254, 133]);
  const col2Height = useTransform(groundProgress, [0.20, 0.35], [254, 133]);
  const col3Height = useTransform(groundProgress, [0.35, 0.50], [254, 133]);
  const col4Height = useTransform(groundProgress, [0.50, 0.65], [254, 133]);
  const colHeights = [col1Height, col2Height, col3Height, col4Height];

  // =========================================================================
  // History Timeline Scroll-Driven Black Progress Line
  // Black line extends downwards along the timeline as the user scrolls
  // =========================================================================
  const historyTimelineRef = useRef(null);
  const { scrollYProgress: historyProgress } = useScroll({
    target: historyTimelineRef,
    offset: ['start 75%', 'end 55%']
  });
  const historyLineHeight = useTransform(historyProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="bg-white min-h-screen w-full pt-32 pb-0 text-[#141517]">
      <Helmet>
        <title>About Us | Make My Cottage - Handcrafted Wooden Homes & Cottages</title>
        <meta
          name="description"
          content="Discover Make My Cottage. We blend master timber craftsmanship with modern engineering to design and construct handcrafted wooden homes, luxury cottages, and nature retreats."
        />
      </Helmet>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Screenshot 1) */}
      {/* ========================================================================= */}
      <section className="pt-32 sm:pt-40 md:pt-44 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-medium tracking-[-0.035em] leading-[0.96] text-[#1B1915] mb-8 max-w-5xl"
        >
          Crafting timeless<br />
          wooden homes rooted<br />
          in nature.
        </motion.h1>

        {/* Subtitle & Book a Call CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-[#504732] max-w-xl font-normal leading-relaxed"
          >
            From handcrafted wooden cottages to luxury timber farmhouses, we blend master craftsmanship and precision engineering to build timeless sanctuaries in harmony with nature.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#1B1915] hover:bg-black text-[#FAF7F0] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.03] shadow-md group"
            >
              <span>Book a call</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STICKY BLURRED HERO BANNER + STACKING FEATURE CARDS (Screenshot 1 & 2) */}
      {/* ========================================================================= */}
      <section ref={stackedSectionRef} className="relative h-[300vh] w-full">
        {/* Unified Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-8">
          {/* Panoramic Foundation Background Image */}
          <motion.img
            style={{
              filter: useTransform(bgBlur, b => `blur(${b}px)`),
              WebkitFilter: useTransform(bgBlur, b => `blur(${b}px)`),
              scale: useTransform(bgBlur, [0, 14], [1, 1.05])
            }}
            src="/images/about/hero-foundation.jpg"
            onError={(e) => {
              e.currentTarget.src = "https://framerusercontent.com/images/J9MqEXKjA7McbiNo1TApI5zUMQQ.jpg";
            }}
            alt="Handcrafted lakeside wooden cottage foundation and framework construction"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-[transform,filter] duration-200"
            loading="eager"
          />

          {/* Dynamic Backdrop Blur & Tint */}
          <motion.div
            style={{
              backdropFilter: useTransform(bgBlur, b => `blur(${b}px)`),
              WebkitBackdropFilter: useTransform(bgBlur, b => `blur(${b}px)`),
              backgroundColor: useTransform(bgDim, d => `rgba(20, 18, 14, ${d})`)
            }}
            className="absolute inset-0 z-[1] pointer-events-none transition-colors"
          />

          {/* Center Card Container */}
          <div className="relative z-10 w-full max-w-4xl flex items-center justify-center min-h-[420px]">

            {/* ---------------- CARD 1: Future Expectation ---------------- */}
            <motion.div
              style={{
                y: card1Y,
                scale: card1Scale,
                opacity: card1Opacity,
                pointerEvents: card1Pointer
              }}
              className="absolute w-full bg-[#F9F0DA] border border-[#E0D5BD] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
                {/* Left Image: Engineers and timber cottage construction */}
                <div className="w-full md:w-[260px] lg:w-[280px] h-[220px] sm:h-[260px] md:h-[290px] shrink-0 rounded-2xl overflow-hidden shadow-sm bg-[#E8DFC8]">
                  <img
                    src="/images/about/card1-vision.jpg"
                    alt="Engineers planning wooden cottage construction in nature"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right Text Content */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#1B1915]">
                    Our Vision for Better Living
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Make My Cottage aims to transform the way people experience cottage design and construction by bringing together thoughtful architecture, natural materials, and quality craftsmanship. We focus on creating beautiful, comfortable, and functional cottages that blend seamlessly with nature while reflecting each client's unique vision.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Our goal is to make every step—from initial planning and design to construction and final handover—smooth, transparent, and reliable, so our clients can turn their dream cottage into reality with confidence.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ---------------- CARD 2: Working standard ---------------- */}
            <motion.div
              style={{
                y: card2Y,
                scale: card2Scale,
                opacity: card2Opacity,
                pointerEvents: card2Pointer
              }}
              className="absolute w-full bg-[#F9F0DA] border border-[#E0D5BD] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl z-20"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
                {/* Left Image: Architectural planning & luxury sunset cottage */}
                <div className="w-full md:w-[260px] lg:w-[280px] h-[220px] sm:h-[260px] md:h-[290px] shrink-0 rounded-2xl overflow-hidden shadow-sm bg-[#E8DFC8]">
                  <img
                    src="/images/about/card2-working.jpg"
                    alt="Architectural design and finished sunset timber retreat"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right Text Content */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#1B1915]">
                    Our Way of Working
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    At Make My Cottage, every project begins with understanding your vision and turning it into a well-planned reality. From design and material selection to construction and final handover, we focus on quality, clear communication, and careful attention to every detail.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Our organized approach keeps you informed about project progress, timelines, and important decisions, ensuring a smooth and reliable experience from the first step to the finished cottage.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GROUND RULES - 4 SCROLL-SHRINKING TIMELINE PILLARS (Screenshot 1 vs 2) */}
      {/* ========================================================================= */}
      <section
        ref={groundRulesRef}
        className="relative bg-[#FAF7F0] border-t border-[#EAE3D2] md:h-[360vh] py-20 md:py-0"
      >
        <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center pt-8 md:pt-20 pb-8 md:pb-12 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto w-full z-10">
          {/* Section Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-[#6B6149] uppercase">
              Why Choose Us
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.08] text-[#1B1915] max-w-3xl mb-8 md:mb-12">
            Thoughtfully designed cottages, made for better living
          </h2>

          {/* 4 Animated Columns whose timeline lines shrink one by one along with scroll */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 items-start w-full">
            {groundRules.map((rule, idx) => (
              <div key={idx} className="flex flex-col">
                {/* Number (01, 02, 03, 04) */}
                <div className="text-4xl sm:text-5xl font-light text-[#BAB3A2] tracking-tight mb-4 select-none">
                  {rule.number}
                </div>

                {/* Dynamic Scroll-Linked Timeline Line (shrinks from 254px to 133px one by one) */}
                <motion.div
                  style={{ height: colHeights[idx] }}
                  className="relative w-8 mb-6 flex flex-col items-center justify-between"
                >
                  {/* Top Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1B1915] shrink-0" />

                  {/* Center Vertical Line */}
                  <div className="w-[2px] bg-[#1B1915] flex-1 my-0.5" />

                  {/* Bottom Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1B1915] shrink-0" />
                </motion.div>

                {/* Amber Pill Badge (glides upward as line shrinks) */}
                <div className="mb-4">
                  <span className="inline-block bg-[#FAE1A6] text-[#271E07] px-3.5 py-1.5 rounded-[4px] text-xs font-medium tracking-wide shadow-sm">
                    {rule.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#1B1915] mb-2.5">
                  {rule.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#504732] leading-relaxed font-normal">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HISTORY / STICKY TIMELINE SECTION (Screenshot 5) */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            History
          </span>
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#1B1915] max-w-3xl mb-16 md:mb-20"
        >
          What Make My Cottage learned along the way
        </motion.h2>

        {/* 2-Column Layout with Sticky Sunset Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Timeline Milestones with Scroll-Driven Black Progress Line & Dots at Every Year */}
          <div ref={historyTimelineRef} className="lg:col-span-7 relative pl-10 md:pl-14 space-y-16 md:space-y-24 py-2">
            {/* Base background beige line starting at first year (2009) down to last year (2024) */}
            <div className="absolute left-[6px] top-3.5 sm:top-4 bottom-3.5 sm:bottom-4 w-[4px] bg-[#DDD5C2] rounded-full overflow-hidden">
              {/* Dynamic black progress line that extends downwards on scroll */}
              <motion.div
                style={{ height: historyLineHeight }}
                className="w-full bg-[#1B1915] rounded-full origin-top"
              />
            </div>

            {timelineMilestones.map((item, idx) => (
              <TimelineMilestoneItem
                key={idx}
                item={item}
                idx={idx}
                historyProgress={historyProgress}
              />
            ))}
          </div>

          {/* Right Column: Sticky Sunset Framing Image (Pinned at top: 80px, height: 753px matching Konstra) */}
          <div className="lg:col-span-5 hidden lg:block lg:sticky lg:top-20">
            <div className="h-[753px] rounded-xl overflow-hidden shadow-2xl border border-black/5 relative group bg-[#1B1915]">
              <img
                src="/images/about/history-sunset.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://framerusercontent.com/images/efmBUaPsdR45OdRoi5sOpflVXrM.jpg";
                }}
                alt="Tower cranes silhouettes during dramatic orange sunset"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wider uppercase opacity-85">
                Precision timber framing &bull; Tested for extreme weather
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LEADERSHIP & TEAM SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Team
          </span>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#1B1915] mb-4"
          >
            The minds shaping modern timber architecture
          </motion.h2>
          <p className="text-base text-[#504732] max-w-xl mx-auto leading-relaxed">
            Dedicated to thoughtful architectural design, natural materials, and the timeless beauty of handcrafted wooden artistry.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: 'spring',
                damping: 42,
                stiffness: 90,
                delay: idx * 0.08
              }}
              className="bg-[#F9F0DA] border border-[#E0D5BD] rounded-2xl p-6 group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6 bg-[#E8DFC8]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mb-1">
                  <h3 className="text-xl font-medium text-[#1B1915] tracking-tight">
                    {member.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-[#DE5533] mb-3">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm text-[#504732] leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RECOGNITION & INDUSTRY AWARDS */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-[#EAE3D2]">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
          <span className="text-sm font-medium tracking-wider text-[#6B6149] uppercase">
            Award & certification
          </span>
        </div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.05] text-[#1B1915] max-w-3xl mb-16"
        >
          Built on a record that speaks for itself.
        </motion.h2>

        {/* List of Awards */}
        <div className="divide-y divide-[#E0D7C4] border-t border-b border-[#E0D7C4]">
          {recognitions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: 'spring',
                damping: 42,
                stiffness: 90,
                delay: idx * 0.08
              }}
              className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-[#F9F0DA]/60 transition-colors px-3 sm:px-4 rounded-xl"
            >
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="text-xs font-mono text-[#897F6C]">{item.id}</span>
                <span className="text-lg font-medium text-[#1B1915]">{item.year}</span>
              </div>
              <div className="md:col-span-6">
                <h3 className="text-lg sm:text-xl font-medium text-[#1B1915] group-hover:text-[#DE5533] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E644F] mt-1 font-light">
                  {item.detail}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <span className="inline-block bg-[#F9F0DA] border border-[#E0D5BD] text-[#271E07] text-xs font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                  {item.awardedBy}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6.5 PARTNERS & LOGO LOOP (React Bits Integration) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-[#FAF7F0] border-t border-[#EAE3D2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-[#6B6149] uppercase">
              Brands & Clients
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1B1915]">
            We work with the best brands
          </h3>
        </div>

        <div className="w-full relative py-4">
          <LogoLoop
            logos={brandLogos}
            speed={65}
            direction="left"
            logoHeight={56}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#FAF7F0"
            ariaLabel="We work with the best brands"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BOTTOM CONSULTATION CTA SECTION (FULL-WIDTH IMMERSIVE) */}
      {/* ========================================================================= */}
      <section id="consultation-cta" className="relative w-full overflow-hidden bg-[#030000] py-28 sm:py-36 md:py-48 lg:py-64 flex items-center min-h-[640px] md:min-h-[780px] lg:min-h-[872px]">
        {/* Photographic Background - Construction Site at Sunset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about/cta-sunset-site.webp"
            alt="Construction worker looking at sunset site"
            className="w-full h-full object-cover object-[75%_center] md:object-center"
          />
          {/* Subtle gradient scrim on the left for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
          {/* Seamless gradient into the black footer */}
          <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 md:h-80 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full">
          <div className="max-w-[490px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-[-0.025em] leading-[1.08] text-[#FCF6E9] mb-6"
            >
              Bring your dream wooden sanctuary to life.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-base sm:text-lg text-[#BAB3A2] leading-relaxed font-normal mb-10"
            >
              Connect directly with our master timber architects. Gain clear insight into custom 3D blueprints, transparent turnkey pricing, and rapid prefabricated construction timelines tailored to your land.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-[#FCF6E9] hover:bg-white text-[#1B1915] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-lg group"
              >
                <span>Schedule a consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
