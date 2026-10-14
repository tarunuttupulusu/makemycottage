import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Home,
  Building2,
  Activity,
  Trees,
  GraduationCap,
  Store,
  Hotel,
  PlusCircle,
  HardHat,
  Utensils,
  PhoneCall
} from 'lucide-react';
import { BUSINESS_INFO } from '../utils/constants';
import LogoLoop from '../components/common/LogoLoop';
import FoldText from '../components/common/FoldText';

const ABOUT_HERO_SLIDES = [
  {
    src: '/images/projects/country-hills/hero.jpg',
    alt: 'Make My Cottage - Handcrafted Timber Architecture & Hilltop Chalet'
  },
  {
    src: '/images/about/history-sunset.jpg',
    alt: 'Make My Cottage - Panoramic Sunset Wooden Cottage Sanctuary'
  },
  {
    src: '/images/projects/shathakshi-resort/hero.jpg',
    alt: 'Make My Cottage - Shathakshi Resort Overwater Chalets'
  },
  {
    src: '/images/projects/ecobliss-shamirpet/image-2.jpg',
    alt: 'Make My Cottage - Artisanal Craftsmanship & Architectural Planning'
  },
  {
    src: '/images/services-hero-2.jpg',
    alt: 'Make My Cottage - Modern Timber Chalet & Natural Living'
  },
  {
    src: '/images/slider/slide-8.jpg',
    alt: 'Make My Cottage - Handcrafted Timber Chalets by the Water'
  }
];

const groundRules = [
  {
    number: '01',
    badge: 'Eco & Healthier',
    title: 'Healthier, eco-friendly living',
    description: 'Wooden houses are 100% eco-friendly and significantly healthier to live in. Natural timber breathes, constantly purifying indoor air and maintaining balanced humidity without toxic synthetic materials.'
  },
  {
    number: '02',
    badge: '15-Day Completion',
    title: 'Fast to build, low maintenance',
    description: 'We construct your dream wooden home in just 15 days through precision off-site prefabrication. Swift, clean on-site assembly eliminates construction hassle and requires minimal lifelong maintenance.'
  },
  {
    number: '03',
    badge: 'Natural Thermo-Protector',
    title: 'Warm in winter, cool in summer',
    description: 'Wood is nature’s supreme thermo-protector material. Cellular thermal barriers keep your interiors naturally warm in chilly winters and refreshingly cool in hot summers, drastically lowering electricity costs.'
  },
  {
    number: '04',
    badge: 'Canadian Timber',
    title: 'Durable for centuries',
    description: 'Constructed with premium Canadian imported wood and master interlocking notched joinery. Highly resistant to moisture, pests, and weathering, properly notched and maintained houses stand for centuries.'
  }
];

const whatWeBuildCategories = [
  {
    title: 'Farm Houses & Guest Houses',
    category: 'Residential',
    icon: Home,
    description: 'Private countryside sanctuaries, weekend retreats, and luxury timber farm estates tailored to your land.'
  },
  {
    title: 'Resort Cottages',
    category: 'Hospitality',
    icon: Trees,
    description: 'Eco-resort wooden cabins, luxury lakefront chalets, and holiday cottages that elevate guest experiences.'
  },
  {
    title: 'Hospitality & Wellness',
    category: 'Commercial',
    icon: Hotel,
    description: 'Destination boutique villas, wellness spa retreats, yoga shalas, and resort clubhouses.'
  },
  {
    title: 'Restaurants & Cafes',
    category: 'Dining',
    icon: Utensils,
    description: 'Rustic wooden cafes, scenic open-air dining pavilions, and warm timber bistros with timeless ambiance.'
  },
  {
    title: 'Office Spaces',
    category: 'Workplace',
    icon: Building2,
    description: 'Biophilic executive offices, eco-friendly corporate headquarters, and serene garden studios.'
  },
  {
    title: 'Home Extensions',
    category: 'Residential',
    icon: PlusCircle,
    description: 'Rooftop wooden chalets, terrace penthouses, garden guest suites, and mezzanine extensions.'
  },
  {
    title: 'Retail Stores & Supermarkets',
    category: 'Retail',
    icon: Store,
    description: 'Distinctive timber retail pavilions, organic markets, lifestyle outlets, and display showrooms.'
  },
  {
    title: 'Schools & Kindergartens',
    category: 'Education',
    icon: GraduationCap,
    description: 'Healthier, toxin-free wooden classrooms and early learning centers that nurture children in natural light.'
  },
  {
    title: 'Medical & Sports Facilities',
    category: 'Wellness & Sports',
    icon: Activity,
    description: 'Ayurvedic & holistic health clinics, fitness clubhouses, sports complexes, and therapy pavilions.'
  },
  {
    title: 'Site Accommodation',
    category: 'Turnkey Infrastructure',
    icon: HardHat,
    description: 'Rapidly deployable executive site offices, mining lodges, and rugged modular staff quarters.'
  }
];

const timelineMilestones = [
  {
    year: '2009',
    badge: 'Inception',
    title: 'Handcrafted timber roots',
    description: 'MakeMyCottage began with dedicated master timber artisans building custom wooden farm retreats, guest houses, and private sanctuaries.'
  },
  {
    year: '2012',
    badge: 'Canadian Timber',
    title: 'Certified imported wood',
    description: 'Established sustainable direct sourcing of certified Canadian imported wood — chosen for its superior density, natural thermo-protection, and enduring beauty.'
  },
  {
    year: '2015',
    badge: 'Craftsmanship',
    title: 'Notched joinery standards',
    description: 'Refined master interlocking notched joints and natural preservative treatments, guaranteeing timber structures engineered to stand for centuries.'
  },
  {
    year: '2018',
    badge: 'Innovation',
    title: 'The 15-day build system',
    description: 'Pioneered precision modular off-site pre-engineering, slashing on-site construction to just 15 days without compromising luxury finish or structural integrity.'
  },
  {
    year: '2021',
    badge: 'Expansion',
    title: 'Resorts & farm villas',
    description: 'Delivered landmark overwater chalets, luxury resort cottages, and eco-friendly farm villa communities across South India.'
  },
  {
    year: '2024',
    badge: 'Leadership',
    title: 'Nationwide presence',
    description: 'Over 50+ delivered turnkey timber projects spanning resorts, residential farmhouses, commercial spaces, and educational facilities nationwide.'
  }
];

const teamMembers = [
  {
    name: 'MANJUNATH REDDY',
    role: 'Founder & Visionary Leader',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    bio: 'With an unyielding passion for authentic timber craftsmanship and sustainable architecture, Manjunath Reddy leads MakeMyCottage. He pioneered the adoption of Canadian imported wood and 15-day rapid wooden home construction in India, empowering clients to build eco-friendly dream homes that stand for centuries while celebrating traditional wooden artistry through Manuvalogillu.'
  },
  {
    name: 'MADHURI',
    role: 'Co-Founder & Creative Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    bio: 'Madhuri shapes the spatial elegance, interior serenity, and natural ambiance of every MakeMyCottage project. She specializes in crafting warm, cozy resort chalets and farm villas that harmonize Canadian timber textures with contemporary luxury living, celebrating cultural authenticity through Manuvalogillu vintage wooden treasures.'
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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic hero slideshow matching ServicesPage (4.5s cycle)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ABOUT_HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  // Responsive hero dimensions: matching target image ratio (~88.5% of viewport height)
  const getHeroDims = () => {
    if (typeof window === 'undefined') return { base: 660, shrunk: 390 };
    const w = window.innerWidth;
    const h = window.innerHeight;
    const baseH = Math.max(w < 640 ? 520 : 580, Math.round(h * 0.885));
    const shrunkH = w < 640 ? 330 : w < 1024 ? 360 : 390;
    return { base: baseH, shrunk: shrunkH };
  };

  const [heroDims, setHeroDims] = useState(getHeroDims);

  useEffect(() => {
    const handleResize = () => {
      setHeroDims(getHeroDims());
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  const cardHeight = useTransform(scrollY, (value) => {
    const distance = heroDims.base - heroDims.shrunk;
    if (value <= 0) return `${heroDims.base}px`;
    if (value >= distance) return `${heroDims.shrunk}px`;
    const progress = value / distance;
    const h = heroDims.base - progress * (heroDims.base - heroDims.shrunk);
    return `${h}px`;
  });

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
    <div className="bg-[#f5f2f2] min-h-screen w-full text-[#141517] selection:bg-black selection:text-white">
      <Helmet>
        <title>About Us | Make My Cottage - Luxurious Wooden Homes & Resort Chalets</title>
        <meta
          name="description"
          content="MakeMyCottage builds dream wooden homes in just 15 days using premium Canadian imported wood. Eco-friendly, low-maintenance resort chalets, farm villas, and bespoke wooden structures designed to endure for centuries."
        />
      </Helmet>

      {/* =========================================================================
          01 — ABOUT US HERO SECTION (Matching Services Hero Page Design & Scroll Physics)
      ========================================================================= */}
      <section className="relative w-full p-3 sm:p-4 md:p-5">
        {/* Pinned Hero Track */}
        <div 
          className="relative w-full"
          style={{ height: `${heroDims.base}px` }}
        >
          {/* Shrinking Hero Card (Sticky at top, bottom shrinks upward) */}
          <motion.div
            style={{ height: cardHeight }}
            className="sticky top-3 sm:top-4 md:top-5 w-full rounded-t-[28px] sm:rounded-t-[32px] rounded-br-[28px] sm:rounded-br-[32px] rounded-bl-none overflow-hidden bg-[#1c1d21] flex flex-col justify-end shadow-sm"
          >
            {/* Background Architectural Photo Slideshow (Crossfade + Subtle Scale matching Services) */}
            <div
              style={{ height: `${heroDims.base}px` }}
              className="absolute top-0 left-0 w-full z-0 overflow-hidden pointer-events-none"
            >
              <div className="w-full h-full relative">
                {ABOUT_HERO_SLIDES.map((slide, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity,transform] ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                          isActive ? 'scale-100' : 'scale-105'
                        }`}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  );
                })}

                {/* Multi-Stop Gradient Overlay: Dark at top for navbar legibility, dark at bottom for notch contrast */}
                <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/65 via-black/15 to-black/60 pointer-events-none" />
              </div>
            </div>

            {/* Signature Inverted Notch Button (Sitting at bottom-left, glides upwards over image as card shrinks) */}
            <div className="relative z-30 flex items-end">
              <div className="bg-[#f5f2f2] pt-4 sm:pt-5 pr-5 sm:pr-6 pb-0 pl-0 rounded-tr-[36px] sm:rounded-tr-[44px] relative">
                {/* Top Concave Fillet Curve */}
                <div className="absolute -top-[28px] left-0 w-7 h-7 pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full block">
                    <path d="M0 20L0 0C0 11.0457 8.9543 20 20 20L0 20Z" fill="#f5f2f2" />
                  </svg>
                </div>

                {/* Right Concave Fillet Curve */}
                <div className="absolute bottom-0 -right-[28px] w-7 h-7 pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" className="w-full h-full block">
                    <path d="M0 20H20C8.9543 20 0 11.0457 0 0V20Z" fill="#f5f2f2" />
                  </svg>
                </div>

                {/* The Dark Pill Badge with Clean Sans-Serif Title Case (40% Increased Size with FoldText Animation) */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.7, delay: 0.15 }}
                  className="bg-[#28282c] text-white px-11 sm:px-16 py-5 sm:py-7 rounded-[28px] sm:rounded-[34px] flex items-center shadow-md"
                >
                  <h1 className="font-sans text-[40px] sm:text-[64px] md:text-[76px] font-normal tracking-tight !text-white leading-none">
                    <FoldText
                      text="About Us"
                      splitBy="char"
                      hinge="top"
                      trigger="mount"
                      duration={0.65}
                      stagger={0.045}
                      ease="power3.out"
                      perspective={700}
                      creaseShading={0.45}
                      fontSize="inherit"
                      fontWeight="inherit"
                      color="#ffffff"
                    />
                  </h1>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          02 — SCROLLING CONTENT LAYER
      ========================================================================= */}
      <div className="relative z-20 w-full bg-[#f5f2f2]">
        {/* Introductory Narrative Section */}
        <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          {/* Main Display Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-[-0.035em] leading-[1.0] text-[#1B1915] mb-8 max-w-5xl"
          >
            Luxurious wooden homes & resort chalets — built in just 15 days.
          </motion.h2>

          {/* Subtitle & Book a Call CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-[#504732] max-w-2xl font-normal leading-relaxed"
            >
              MakeMyCottage is the premier builder of luxurious wooden houses, resort chalets, and farm villas. Sourcing certified Canadian imported wood, we engineer eco-friendly, healthier living spaces that are naturally warm in winter, cool in summer, and built to stand for centuries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap sm:flex-nowrap gap-4 shrink-0"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#1B1915] hover:bg-black text-[#FAF7F0] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.03] shadow-md group"
              >
                <span>Call us to build today</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Quick Highlight Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 border-t border-[#E0D7C4]"
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1B1915]">
              <span className="w-2 h-2 rounded-full bg-[#DE5533]" />
              <span>15-Day Rapid Build</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1B1915]">
              <span className="w-2 h-2 rounded-full bg-[#DE5533]" />
              <span>Canadian Imported Wood</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1B1915]">
              <span className="w-2 h-2 rounded-full bg-[#DE5533]" />
              <span>Natural Thermo-Protector</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1B1915]">
              <span className="w-2 h-2 rounded-full bg-[#DE5533]" />
              <span>Eco-Friendly & Healthier</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#1B1915] col-span-2 sm:col-span-1">
              <span className="w-2 h-2 rounded-full bg-[#DE5533]" />
              <span>Stands for Centuries</span>
            </div>
          </motion.div>
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
            src="/images/projects/country-hills/hero.jpg"
            onError={(e) => {
              e.currentTarget.src = "/images/projects/shathakshi-resort/hero.jpg";
            }}
            alt="Make My Cottage - Handcrafted timber chalet and wooden home retreat"
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
                {/* Left Image: Authentic MakeMyCottage timber cottage in nature */}
                <div className="w-full md:w-[260px] lg:w-[280px] h-[220px] sm:h-[260px] md:h-[290px] shrink-0 rounded-2xl overflow-hidden shadow-sm bg-[#E8DFC8]">
                  <img
                    src="/images/projects/ecobliss-shamirpet/image-2.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/images/projects/myron-dynasty/image-1.jpg";
                    }}
                    alt="Authentic MakeMyCottage handcrafted timber cottage in nature"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#FAE1A6] text-[#271E07] px-3 py-1 rounded-[4px] text-xs font-medium uppercase tracking-wider">
                    Why Wooden House?
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#1B1915]">
                    Eco-Friendly, Healthier Living & Built in Just 15 Days
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Wooden houses are naturally eco-friendly and significantly healthier to live in. As nature's supreme thermo-protector material, wood acts as a natural climate buffer — staying comfortably warm in winter and pleasantly cool in summer, while filtering air and regulating humidity for your family's daily wellness.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Through advanced modular pre-engineering, we build your complete dream wooden home in just 15 days. Easy and fast to construct, clean on-site, and remarkably low on maintenance, we deliver effortless luxury living ready for you to move in.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ---------------- CARD 2: Canadian Wood & Resort Chalets ---------------- */}
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
                {/* Left Image: Authentic MakeMyCottage architectural woodwork */}
                <div className="w-full md:w-[260px] lg:w-[280px] h-[220px] sm:h-[260px] md:h-[290px] shrink-0 rounded-2xl overflow-hidden shadow-sm bg-[#E8DFC8]">
                  <img
                    src="/images/services-hero-2.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "/images/slider/slide-8.jpg";
                    }}
                    alt="Authentic MakeMyCottage handcrafted timber craftsmanship"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Right Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#FAE1A6] text-[#271E07] px-3 py-1 rounded-[4px] text-xs font-medium uppercase tracking-wider">
                    Resort & Farm Villas
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium tracking-tight text-[#1B1915]">
                    Canadian Wood & Durability That Stands for Centuries
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Canadian imported wood is renowned worldwide for its durability, aesthetic appeal, and sustainable sourcing, making it the ideal choice for constructing wooden chalets in resort and farm villa developments. Its natural strength creates cozy, eco-friendly environments that blend seamlessly with rustic and luxurious settings.
                  </p>
                  <p className="text-sm sm:text-base lg:text-lg text-[#504732] leading-relaxed font-normal">
                    Wood is one of the most durable building materials known to humankind. Built with precision interlocking notched joinery and weather-resistant finishes, properly notched and maintained MakeMyCottage homes can stand strong for centuries.
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
              Why Wooden House?
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.08] text-[#1B1915] max-w-3xl mb-8 md:mb-12">
            Why choose a wooden house? Built for health, rapid living, and eternity.
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
      {/* 3.5 WE BUILD YOU - 10 SECTORS ARCHITECTURAL SHOWCASE (Screenshot 3) */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAF7F0] border-t border-[#EAE3D2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#DE5533] rounded-[2px]" />
                <span className="text-xs sm:text-sm font-medium tracking-wider text-[#6B6149] uppercase">
                  Comprehensive Capabilities
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] leading-[1.08] text-[#1B1915] max-w-2xl">
                We Build For You:
              </h2>
            </div>
            <p className="text-base text-[#504732] max-w-md font-normal leading-relaxed">
              From private residential sanctuaries and luxury resort chalets to commercial developments and community institutions, our Canadian timber architecture adapts effortlessly to your vision.
            </p>
          </div>

          {/* 10 Sectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {whatWeBuildCategories.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  className="bg-[#F9F0DA] border border-[#E0D5BD] rounded-2xl p-5 hover:border-[#1B1915] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] border border-[#E0D5BD] flex items-center justify-center mb-4 group-hover:bg-[#1B1915] group-hover:text-white transition-colors duration-300 text-[#1B1915]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A7D63] block mb-1.5">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-medium text-[#1B1915] tracking-tight mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#504732] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call-out Banner at bottom of We Build You */}
          <div className="mt-12 bg-[#1B1915] text-[#FAF7F0] rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FAE1A6]">
                Turnkey Rapid Delivery
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
                Have a unique development or property in mind?
              </h3>
              <p className="text-sm text-[#BAB3A2] max-w-xl">
                We build your dream wooden homes in just 15 days using premium Canadian imported wood — fully customized, certified, and turnkey.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#FAE1A6] hover:bg-[#F2D48B] text-[#1B1915] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.03] shadow-md shrink-0"
            >
              <span>Call us to build today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
          Our journey in timber craftsmanship & rapid innovation
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
                  <h3 className="text-xl font-medium text-[#1B1915] tracking-tight uppercase">
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
          <div className="max-w-[540px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-medium tracking-[-0.025em] leading-[1.08] text-[#FCF6E9] mb-6"
            >
              We build your dream wooden homes in just 15 days.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-base sm:text-lg text-[#BAB3A2] leading-relaxed font-normal mb-10"
            >
              Call MakeMyCottage to build your wooden house today. Sourced with Canadian imported wood, our eco-friendly, naturally climate-regulated chalets and farm villas are fast to build, low on maintenance, and engineered to endure for centuries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 bg-[#FCF6E9] hover:bg-white text-[#1B1915] px-7 py-3.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 hover:scale-[1.02] shadow-lg group"
              >
                <span>Call us to build today</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-medium text-sm md:text-base backdrop-blur-sm transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4 text-[#FAE1A6]" />
                <span>{BUSINESS_INFO.displayPhone}</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default AboutPage;
