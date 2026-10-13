import { motion } from 'framer-motion';

/**
 * OurProjectsCard Component
 * Exact dimensions matching ProjectsPage hero notch:
 * - Top concave fillet (20px x 20px SVG)
 * - Right concave fillet (20px x 20px SVG)
 * - White cutout box (rounded-tr-[28px] sm:rounded-tr-[32px])
 * - Dark pill badge (px-8 sm:px-12 py-4 sm:py-5, rounded-[20px] sm:rounded-[24px])
 * - Clean sans-serif title (text-3xl sm:text-5xl md:text-[54px])
 */
const OurProjectsCard = ({
  title = 'Our Gallery',
  className = '',
}) => {
  return (
    <div className={`relative z-10 flex items-end select-none ${className}`}>
      <div className="bg-white pt-3 sm:pt-4 pr-3.5 sm:pr-4 pb-0 pl-0 rounded-tr-[28px] sm:rounded-tr-[32px] relative">
        {/* Top Concave Fillet Curve */}
        <div className="absolute -top-[20px] left-0 w-5 h-5 pointer-events-none">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
            <path d="M0 20L0 0C0 11.0457 8.9543 20 20 20L0 20Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Right Concave Fillet Curve */}
        <div className="absolute bottom-0 -right-[20px] w-5 h-5 pointer-events-none">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 block">
            <path d="M0 20H20C8.9543 20 0 11.0457 0 0V20Z" fill="#ffffff" />
          </svg>
        </div>

        {/* The Dark Pill Badge with Clean Sans-Serif Title Case & Smooth Fade Animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-[#28282c] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-[20px] sm:rounded-[24px] flex items-center shadow-sm"
        >
          <h1 className="font-sans text-3xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-white leading-none">
            {title}
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default OurProjectsCard;
