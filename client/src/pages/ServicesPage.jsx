import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  HiArrowNarrowRight,
  HiX,
  HiOutlineCheck,
  HiOutlineInformationCircle
} from 'react-icons/hi';
import SectionLabel from '../components/common/SectionLabel';
import CTAButton from '../components/common/CTAButton';
import { SERVICES, BUSINESS_INFO } from '../utils/constants';

const serviceItems = [
  {
    title: "Wooden Homes",
    image: SERVICES.find((s) => s.id === "wooden-homes")?.image || "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80",
    href: "#wooden-homes"
  },
  {
    title: "Farm Houses",
    image: SERVICES.find((s) => s.id === "farm-houses")?.image || "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1000&q=80",
    href: "#farm-houses"
  },
  {
    title: "Cottage Homes",
    image: SERVICES.find((s) => s.id === "cottage-homes")?.image || "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1000&q=80",
    href: "#cottage-homes"
  },
  {
    title: "Prefabricated Homes",
    image: SERVICES.find((s) => s.id === "prefabricated-homes")?.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=80",
    href: "#prefabricated-homes"
  },
  {
    title: "Resort Cottages",
    image: SERVICES.find((s) => s.id === "resort-cottages")?.image || "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1000&q=80",
    href: "#resort-cottages"
  },
  {
    title: "Custom Structures",
    image: SERVICES.find((s) => s.id === "custom-structures")?.image || "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1000&q=80",
    href: "#custom-structures"
  }
];

// Detailed specifications for each of our 6 turnkey service offerings
const SERVICE_SPECS = {
  'wooden-homes': {
    leadTime: '90 - 120 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Treated Teak, Pine & Canadian Cedar',
    construction: 'Post & Beam / Interlocking Timber Frame',
    deliverables: [
      'Custom 3D Architectural Blueprint & Site Elevation',
      '100% Pressure-Treated Vacuum Preserved Timber',
      'Double-Glazed Weather-Sealed Glass Systems',
      'Turnkey Plumbing, Electrical & Polished Timber Flooring'
    ]
  },
  'farm-houses': {
    leadTime: '120 - 150 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Sal Wood, High-Density Teak & Granite',
    construction: 'Heritage Timber Framing + Natural Stone Base',
    deliverables: [
      'Expansive Verandah & High-Ceiling Truss Detailing',
      'Site Topography & Landscape Integration Plan',
      'Deep Shading Overhangs for Passive Cooling',
      'Complete Interior Woodwork & Exterior Weather Sealing'
    ]
  },
  'cottage-homes': {
    leadTime: '60 - 75 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Imported Kiln-Dried Pine & Cedar',
    construction: 'Log Profile & Precision Timber Frame',
    deliverables: [
      'Compact High-Thermal Efficiency Spatial Layout',
      'Fireplace Chimney & Natural Stone Hearth Options',
      'Heavy-Duty Roof Shingles with Waterproof Membranes',
      'Pre-Fitted Ready-to-Live Bathrooms & Kitchenette'
    ]
  },
  'prefabricated-homes': {
    leadTime: '45 - 60 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Precision Glulam & Cross-Laminated Timber (CLT)',
    construction: 'Off-Site CNC Precision Factory Assembly',
    deliverables: [
      'Zero On-Site Construction Mess or Waste',
      'Millimeter-Accurate Off-Site Factory Engineering',
      'Rapid 45-Day Erection & Foundation Bolting',
      'Acoustic & Fire-Retardant Certified Wall Assemblies'
    ]
  },
  'resort-cottages': {
    leadTime: '75 - 90 Days',
    warranty: '10 Years Structural',
    woodSpecies: 'Commercial Grade Teak, Pine & Treated Bamboo',
    construction: 'Heavy-Duty Luxury Hospitality Timber Units',
    deliverables: [
      'Multi-Unit Repeatable Cluster Layout Planning',
      'High-Turnover Commercial Grade Hardware & Finishes',
      'Panoramic Balcony Decks with Safety Balustrades',
      'Turnkey Resort Villa Fitment Ready for Guest Check-in'
    ]
  },
  'custom-structures': {
    leadTime: '30 - 45 Days',
    warranty: '5 Years Structural',
    woodSpecies: 'Seasoned Hardwoods, Cedar & Teak Joinery',
    construction: 'Artisanal Mortise & Tenon Custom Joinery',
    deliverables: [
      'Architectural Pergolas, Gazebos & Glass Pavilions',
      'Lakeside Decks, Rooftop Lounges & Poolside Cabanas',
      'UV-Resistant Polycarbonate / Timber Louver Roofing',
      'Precision Hand-Carved Joinery and Hidden Metal Anchors'
    ]
  }
};

// Resentii-modeled detailed services configuration with authentic Make My Cottage assets & specs
const DETAILED_SERVICES = [
  {
    id: 'wooden-homes',
    num: '01',
    title: 'Wooden Homes',
    description: 'From the architectural bones of a space to the finishing details that make it feel like home, our custom-designed wooden houses are built around your lifestyle with natural warmth, timeless aesthetics, and enduring structural strength.',
    subTitle: 'Bespoke Timber Architecture',
    subDescription: 'We handle every phase from custom 3D architectural elevations to pressure-treated timber selection, foundation bolting, and luxury turnkey interior finishes so you can move straight into your handcrafted sanctuary.',
    notchTitle: 'Wooden Home Craftsmanship',
    notchDescription: 'Engineered for generational living using vacuum pressure-treated Canadian cedar and seasoned teak, precision timber joinery, and passive thermal insulation in any climate.',
    primaryImage: '/images/wooden-homes-showcase.jpg',
    imagePosition: '38% 15%',
    cardBaseHeight: 620,
    cardShrunkHeight: 520,
    secondaryImage: '/images/wooden-homes-interior.jpg',
    type: 'A' // Bottom-Right Notch
  },
  {
    id: 'farm-houses',
    num: '02',
    title: 'Farm Houses',
    description: 'Every estate we create is born from a conversation shaped by your taste, your land, and your vision. Relaxed, natural spaces designed for weekend living, organic farm retreats, and countryside estates that blend indoor and outdoor living seamlessly.',
    subTitle: 'Heritage Craftsmanship',
    subDescription: 'Our master carpenters bring together traditional timber framing and natural stone masonry to create expansive high-ceiling estates that transcend the ordinary and stand as works of art that endure through time.',
    notchTitle: 'Country Farm House Living',
    notchDescription: 'Crafted for countryside retreats and weekend estates, combining heavy timber framing, natural stone foundations, wide breezy verandas, and timeless indoor-outdoor warmth.',
    primaryImage: '/images/farm-houses-showcase.jpg',
    imagePosition: 'center 45%',
    cardBaseHeight: 620,
    cardShrunkHeight: 520,
    secondaryImage: '/images/farm-houses-interior.jpg',
    type: 'B' // Left Showcase Card / Right Story
  },
  {
    id: 'cottage-homes',
    num: '03',
    title: 'Cottage Homes',
    description: 'Your sanctuary has a story worth preserving and a future worth investing in. Compact, high-thermal efficiency cottages engineered for resorts, hill retreats, farms, and private scenic properties maximizing every square foot.',
    subTitle: 'Scenic Hillside Living',
    subDescription: 'From compact floor plans to high-end architectural roof shingles, we handle every layer of complexity with precision. Our focus is always on structural integrity and spatial efficiency creating cozy environments that work beautifully for the way you live.',
    notchTitle: 'Cozy Cottage Home Sanctuaries',
    notchDescription: 'Scenic, thermally efficient cottage retreats engineered with weatherproof tongue-and-groove logs, premium architectural shingles, and move-in ready turnkey luxury in 60 days.',
    primaryImage: '/images/cottage-homes-showcase.jpg',
    imagePosition: 'center 45%',
    cardBaseHeight: 620,
    cardShrunkHeight: 520,
    secondaryImage: '/images/cottage-homes-interior.jpg',
    type: 'A' // Right Showcase Card / Left Story
  },
  {
    id: 'prefabricated-homes',
    num: '04',
    title: 'Prefabricated Homes',
    description: 'A beautiful home is nothing without smart engineering behind it. Efficient precision construction with modern modular prefabricated timber systems for rapid delivery without ever compromising on aesthetics or structural permanence.',
    subTitle: 'Precision Factory Assembly',
    subDescription: 'We go beyond the blueprint with millimeter-accurate off-site CNC factory engineering that eliminates on-site mess, accelerates foundation bolting, and erects fully livable modular homes in just 45 days.',
    notchTitle: 'Precision Prefabricated Architecture',
    notchDescription: 'Factory-engineered Glulam and CLT modular timber systems delivering millimeter-level precision, rapid on-site assembly, seismic durability, and move-in readiness in just 45 days.',
    primaryImage: '/images/prefabricated-homes-showcase.jpg',
    imagePosition: 'center 45%',
    cardBaseHeight: 620,
    cardShrunkHeight: 520,
    secondaryImage: '/images/prefabricated-homes-interior.jpg',
    type: 'B' // Left Showcase Card / Right Story
  },
  {
    id: 'resort-cottages',
    num: '05',
    title: 'Resort Cottages',
    description: 'Distinctive wooden accommodation spaces engineered for hospitality luxury and guest escapism. We design environments that flow effortlessly, offering guests an immersive natural retreat with all modern luxury comforts.',
    subTitle: 'Luxury Hospitality Suites',
    subDescription: 'Repeatable cluster layouts designed for high turnover commercial resort environments, featuring panoramic balcony decks, spa ensuites, and bespoke timber interior fitments ready for guest check-in.',
    notchTitle: 'Luxury Resort Cottage Suites',
    notchDescription: 'High-turnover hospitality cottages designed with panoramic private decks, commercial-grade weatherproofing, and repeatable cluster layouts built for ultimate guest escapism.',
    primaryImage: '/images/resort-cottages-showcase.jpg?v=2',
    imagePosition: 'center 45%',
    cardBaseHeight: 620,
    cardShrunkHeight: 520,
    secondaryImage: '/images/resort-cottages-interior.jpg',
    type: 'A' // Right Showcase Card / Left Story
  },
  {
    id: 'custom-structures',
    num: '06',
    title: 'Custom Structures',
    description: 'Unique architectural wooden pergolas, pavilions, gazebos, rooftop lounges, and bespoke timber extensions made to your exact property specifications, bringing warmth, character, and outdoor elegance to your lifestyle.',
    subTitle: 'Artisanal Architectural Joinery',
    subDescription: 'Every custom structure concludes with a comprehensive design roadmap and artisanal joinery that flawlessly blends into your existing grounds, providing shade, beauty, and relaxation for decades.',
    notchTitle: 'Architectural Custom Structures',
    notchDescription: 'Artisanal wooden pergolas, poolside cabanas, rooftop gazebos, and garden pavilions hand-carved with concealed structural joinery and UV-shielded timber framing.',
    primaryImage: '/images/custom-structures-showcase.jpg',
    imagePosition: 'center 45%',
    cardBaseHeight: 620,
    cardShrunkHeight: 520,
    secondaryImage: '/images/custom-structures-interior.jpg',
    type: 'B' // Left Showcase Card / Right Story
  }
];

const HERO_SLIDES = [
  {
    src: '/images/services-hero-1-hd.jpg',
    alt: 'Make My Cottage - Scandinavian Handcrafted Wooden Home'
  },
  {
    src: '/images/services-hero-2-hd.jpg',
    alt: 'Make My Cottage - Modern Timber Chalet & Architecture'
  },
  {
    src: '/images/services-hero-3-hd.jpg',
    alt: 'Make My Cottage - Bespoke Wood House & Artisanal Gazebo'
  },
  {
    src: '/images/services-hero-4-hd.jpg',
    alt: 'Make My Cottage - Handcrafted Resort Cottages & Villas'
  },
  {
    src: '/images/services-hero-5-hd.jpg',
    alt: 'Make My Cottage - Luxury Forest Wooden Chalets'
  },
  {
    src: '/images/services-hero-6-hd.jpg',
    alt: 'Make My Cottage - Modern Sloping Timber Villa & Pool'
  }
];

// Individual Showcase Section for each service with sticky side-by-side showcase card
const ServiceSectionRow = ({ srv, rawService, isTypeA, setSelectedServiceModal }) => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      key={srv.id}
      id={srv.id}
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-16 sm:py-24 lg:py-28 border-b border-black/5 last:border-b-0 scroll-mt-24 relative"
    >
      {isTypeA ? (
        /* ====================================================================
           MODEL TYPE A: Left Scrolling Story / Right Sticky Showcase Card
        ==================================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">

          {/* Left Column: Headline, Description, Secondary Image & Action (Scrolls naturally) */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-2 pb-6 order-1 space-y-10 sm:space-y-12 lg:space-y-14 lg:min-h-[880px]">
            {/* Top Headline Block */}
            <div>
              <h2
                className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#101014] font-normal tracking-tight leading-[1.15] mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {srv.title}
              </h2>
              <p className="font-sans text-base sm:text-[17px] text-[#3d3d47] font-light leading-relaxed max-w-xl">
                {srv.description}
              </p>
            </div>

            {/* Middle Secondary Showcase Image */}
            {srv.secondaryImage && (
              <div
                onClick={() => setSelectedServiceModal(rawService)}
                className="rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[16/9] w-full shadow-md border border-black/5 group cursor-pointer bg-black/5"
              >
                <img
                  src={srv.secondaryImage}
                  alt={`${srv.title} Showcase`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}

            {/* Bottom Feature Block & CTA Button */}
            <div className="space-y-4 pt-2">
              <h4 className="font-sans text-2xl sm:text-3xl text-[#101014] font-medium tracking-tight">
                {srv.subTitle}
              </h4>
              <p className="font-sans text-sm sm:text-base text-[#555] font-light leading-relaxed max-w-xl">
                {srv.subDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#141517] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:scale-105 active:scale-95 group"
                >
                  <span>Request Consultation</span>
                  <span className="text-sm font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedServiceModal(rawService)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e3e3de] hover:border-[#141517] text-xs font-semibold uppercase tracking-wider text-[#141517] bg-white/60 hover:bg-white transition-all shadow-sm"
                >
                  <HiOutlineInformationCircle className="w-4 h-4 text-[#777]" />
                  <span>Quick Specs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Large Image with Bottom-Right Inverted Corner Cutout Notch (Sticky on scroll) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start w-full order-2">
            <div className="relative w-full h-[520px] sm:h-[560px] lg:h-[580px] xl:h-[600px] rounded-[32px] sm:rounded-[38px] rounded-br-none overflow-hidden bg-black/5 shadow-xl flex flex-col justify-end group">
              {/* Architectural Showcase Image */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <img
                  src={srv.primaryImage}
                  alt={srv.title}
                  style={{ objectPosition: srv.imagePosition || 'center' }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Bottom-Right Cutout Notch */}
              <div className="relative z-10 flex items-end justify-end pointer-events-auto">
                <div className="bg-[#f5f2f2] pt-3 sm:pt-4 pl-3.5 sm:pl-4 pb-0 pr-0 rounded-tl-[28px] sm:rounded-tl-[32px] relative">
                  {/* Top Concave Fillet Curve */}
                  <div className="absolute -top-[20px] right-0 w-5 h-5 pointer-events-none">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                      <path d="M20 20L20 0C20 11.0457 11.0457 20 0 20L20 20Z" fill="#f5f2f2" />
                    </svg>
                  </div>

                  {/* Left Concave Fillet Curve */}
                  <div className="absolute bottom-0 -left-[20px] w-5 h-5 pointer-events-none">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                      <path d="M20 20H0C11.0457 20 20 11.0457 20 0V20Z" fill="#f5f2f2" />
                    </svg>
                  </div>

                  {/* Dark Charcoal Card */}
                  <div className="bg-[#1c1d21] text-white p-5 sm:p-7 md:p-8 rounded-[20px] sm:rounded-[24px] max-w-[280px] sm:max-w-sm md:max-w-md shadow-2xl border border-white/5">
                    <h4 className="font-sans text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2.5">
                      {srv.notchTitle}
                    </h4>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#d0d1db]/90 font-light leading-relaxed">
                      {srv.notchDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ====================================================================
           MODEL TYPE B: Left Sticky Showcase Card / Right Scrolling Story
        ==================================================================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">
          {/* Left Column: Large Image with Bottom-Left Inverted Corner Cutout Notch (Sticky on scroll) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start w-full order-2 lg:order-1">
            <div className="relative w-full h-[520px] sm:h-[560px] lg:h-[580px] xl:h-[600px] rounded-[32px] sm:rounded-[38px] rounded-bl-none overflow-hidden bg-black/5 shadow-xl flex flex-col justify-end group">
              {/* Architectural Showcase Image */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <img
                  src={srv.primaryImage}
                  alt={srv.title}
                  style={{ objectPosition: srv.imagePosition || 'center' }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Bottom-Left Cutout Notch */}
              <div className="relative z-10 flex items-end justify-start pointer-events-auto">
                <div className="bg-[#f5f2f2] pt-3 sm:pt-4 pr-3.5 sm:pr-4 pb-0 pl-0 rounded-tr-[28px] sm:rounded-tr-[32px] relative">
                  {/* Top Concave Fillet Curve */}
                  <div className="absolute -top-[20px] left-0 w-5 h-5 pointer-events-none">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                      <path d="M0 20L0 0C0 11.0457 8.9543 20 20 20L0 20Z" fill="#f5f2f2" />
                    </svg>
                  </div>

                  {/* Right Concave Fillet Curve */}
                  <div className="absolute bottom-0 -right-[20px] w-5 h-5 pointer-events-none">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                      <path d="M0 20H20C8.9543 20 0 11.0457 0 0V20Z" fill="#f5f2f2" />
                    </svg>
                  </div>

                  {/* Dark Charcoal Card */}
                  <div className="bg-[#1c1d21] text-white p-5 sm:p-7 md:p-8 rounded-[20px] sm:rounded-[24px] max-w-[280px] sm:max-w-sm md:max-w-md shadow-2xl border border-white/5">
                    <h4 className="font-sans text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2.5">
                      {srv.notchTitle}
                    </h4>
                    <p className="font-sans text-xs sm:text-[13.5px] text-[#d0d1db]/90 font-light leading-relaxed">
                      {srv.notchDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Headline, Secondary Image, Sub-feature & CTA (Scrolls naturally) */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-2 pb-6 order-1 lg:order-2 space-y-10 sm:space-y-12 lg:space-y-14 lg:min-h-[880px]">
            {/* Top Headline Block */}
            <div>
              <h2
                className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#101014] font-normal tracking-tight leading-[1.15] mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {srv.title}
              </h2>
              <p className="font-sans text-base sm:text-[17px] text-[#3d3d47] font-light leading-relaxed max-w-xl">
                {srv.description}
              </p>
            </div>

            {/* Middle Secondary Showcase Image */}
            {srv.secondaryImage && (
              <div
                onClick={() => setSelectedServiceModal(rawService)}
                className="rounded-[22px] sm:rounded-[28px] overflow-hidden aspect-[16/9] w-full shadow-md border border-black/5 group cursor-pointer bg-black/5"
              >
                <img
                  src={srv.secondaryImage}
                  alt={`${srv.title} Showcase`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            )}

            {/* Bottom Feature Block & CTA Button */}
            <div className="space-y-4 pt-2">
              <h4 className="font-sans text-2xl sm:text-3xl text-[#101014] font-medium tracking-tight">
                {srv.subTitle}
              </h4>
              <p className="font-sans text-sm sm:text-base text-[#555] font-light leading-relaxed max-w-xl">
                {srv.subDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#141517] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:scale-105 active:scale-95 group"
                >
                  <span>Request Consultation</span>
                  <span className="text-sm font-bold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedServiceModal(rawService)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e3e3de] hover:border-[#141517] text-xs font-semibold uppercase tracking-wider text-[#141517] bg-white/60 hover:bg-white transition-all shadow-sm"
                >
                  <HiOutlineInformationCircle className="w-4 h-4 text-[#777]" />
                  <span>Quick Specs</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};

const ServicesPage = () => {
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic hero slideshow matching theespacio.in (4.5s cycle)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, []);

  // Lock body scrolling when Quick Specs modal is open so only the modal scrolls
  useEffect(() => {
    if (selectedServiceModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedServiceModal]);

  // Responsive hero dimensions: matching target image ratio (~88.5% of viewport height)
  const getHeroDims = () => {
    if (typeof window === 'undefined') return { base: 650, shrunk: 360 };
    const w = window.innerWidth;
    const h = window.innerHeight;
    const baseH = Math.max(w < 640 ? 500 : 560, Math.round(h * 0.885));
    const shrunkH = w < 640 ? 320 : w < 1024 ? 340 : 360;
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

  return (
    <div className="bg-[#f5f2f2] min-h-screen w-full text-[#141517] selection:bg-black selection:text-white">
      <Helmet>
        <title>Services | Make My Cottage - Premium Handcrafted Wooden Home Construction</title>
        <meta
          name="description"
          content="Explore our complete range of turnkey timber construction services: custom wooden homes, farmhouses, cottages, prefabricated modular villas, resort accommodations, and bespoke timber structures."
        />
      </Helmet>

      {/* =========================================================================
          01 — SERVICES HERO SECTION (Full-Width & Full-Height Matching Image 1)
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
            {/* Background Architectural Photo Slideshow (Crossfade + Subtle Scale matching theespacio.in) */}
            <div
              style={{ height: `${heroDims.base}px` }}
              className="absolute top-0 left-0 w-full z-0 overflow-hidden pointer-events-none"
            >
              <div className="w-full h-full relative">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity,transform] ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-100' : 'scale-105'
                          }`}
                        onError={(e) => {
                          if (slide.fallback) e.currentTarget.src = slide.fallback;
                        }}
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
              <div className="bg-[#f5f2f2] pt-3 sm:pt-4 pr-3.5 sm:pr-4 pb-0 pl-0 rounded-tr-[28px] sm:rounded-tr-[32px] relative">
                {/* Top Concave Fillet Curve */}
                <div className="absolute -top-[20px] left-0 w-5 h-5 pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                    <path d="M0 20L0 0C0 11.0457 8.9543 20 20 20L0 20Z" fill="#f5f2f2" />
                  </svg>
                </div>

                {/* Right Concave Fillet Curve */}
                <div className="absolute bottom-0 -right-[20px] w-5 h-5 pointer-events-none">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
                    <path d="M0 20H20C8.9543 20 0 11.0457 0 0V20Z" fill="#f5f2f2" />
                  </svg>
                </div>

                {/* The Dark Pill Badge with Clean Sans-Serif Title Case */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.7, delay: 0.15 }}
                  className="bg-[#28282c] text-white px-4 sm:px-6 py-[20px] sm:py-[26px] rounded-[20px] sm:rounded-[24px] flex items-center justify-center text-center shadow-sm w-[30vw] min-w-fit"
                >
                  <h1 className="font-sans text-2xl sm:text-4xl md:text-[40px] lg:text-[44px] font-normal tracking-tight !text-white leading-none whitespace-nowrap">
                    Our Services
                  </h1>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          02 — SCROLLING CONTENT LAYER (Our Services Notch Tab + Portfolio Specs)
      ========================================================================= */}
      <div className="relative z-20 w-full bg-[#f5f2f2]">
        {/* =========================================================================
            02 — RESENTII SERVICE SHOWCASE SECTIONS (All 6 Make My Cottage Services)
        ========================================================================= */}
        <div id="service-details" className="w-full pt-4 sm:pt-6 lg:pt-8 pb-20 sm:pb-28">
          {DETAILED_SERVICES.map((srv) => {
            const rawService = SERVICES.find((s) => s.id === srv.id) || SERVICES[0];
            const isTypeA = srv.type === 'A';

            return (
              <ServiceSectionRow
                key={srv.id}
                srv={srv}
                rawService={rawService}
                isTypeA={isTypeA}
                setSelectedServiceModal={setSelectedServiceModal}
              />
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          06 — INTERACTIVE SERVICE MODAL
      ========================================================================= */}
      <AnimatePresence>
        {selectedServiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overscroll-contain"
            onClick={() => setSelectedServiceModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain shadow-2xl border border-[#e3e3de] p-6 sm:p-8 relative text-[#141517]"
            >
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#141517] transition-all"
                aria-label="Close modal"
              >
                <HiX className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans text-2xl text-[#ff4b18] font-light">
                  {selectedServiceModal.num}
                </span>
                <span className="w-8 h-[1px] bg-black/15" />
                <span className="text-xs uppercase tracking-widest text-[#888] font-medium font-sans">
                  Turnkey Architectural Service
                </span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl text-[#141517] font-medium tracking-tight mb-4">
                {selectedServiceModal.title}
              </h3>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-black/5 shadow-md">
                <img
                  src={selectedServiceModal.image}
                  alt={selectedServiceModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-base text-[#555] font-light leading-relaxed mb-6">
                {selectedServiceModal.description}
              </p>

              {/* Inclusions summary */}
              {SERVICE_SPECS[selectedServiceModal.id] && (
                <div className="bg-[#f9f8f6] rounded-2xl p-5 mb-6 border border-[#e3e3de]/60 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#141517]">
                    Technical Deliverables:
                  </h4>
                  <div className="space-y-2 text-xs text-[#555]">
                    {SERVICE_SPECS[selectedServiceModal.id].deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to="/contact"
                  onClick={() => setSelectedServiceModal(null)}
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-full bg-[#141517] text-white hover:bg-black text-xs uppercase tracking-widest font-semibold text-center transition-all shadow-md"
                >
                  Enquire for {selectedServiceModal.title} &rarr;
                </Link>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full border border-[#e3e3de] hover:bg-black/5 text-[#141517] text-xs uppercase tracking-widest font-semibold text-center transition-all"
                >
                  Call {BUSINESS_INFO.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
};

export default ServicesPage;
