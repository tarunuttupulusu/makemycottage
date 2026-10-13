import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { BUSINESS_INFO } from '../../utils/constants';

const FAQS = [
  {
    question: 'What types of projects does Make My Cottage Group specialize in?',
    answer: 'We specialize in designing and building wooden cottages, farmhouses, luxury holiday homes, resorts, weekend retreats, and customized nature-inspired spaces tailored to your vision and lifestyle.'
  },
  {
    question: 'Can I customize the design of my wooden house or farmhouse?',
    answer: 'Absolutely! We offer customized designs based on your preferences, plot size, budget, and functional requirements. From compact cottages to luxurious farmhouses and resort developments, we help bring your ideas to life.'
  },
  {
    question: 'How much does it cost to build a wooden cottage or farmhouse?',
    answer: 'The cost depends on the size, design, materials, location, site conditions, and level of finishing. Contact our team with your requirements to discuss a suitable design and project estimate.'
  },
  {
    question: 'How long does it take to complete a wooden house?',
    answer: "The construction timeline depends on the project's size, design complexity, site preparation, material availability, and finishing requirements. We establish an estimated schedule after understanding your project scope."
  },
  {
    question: 'Are wooden houses durable and suitable for Indian weather conditions?',
    answer: 'Yes, wooden houses can be designed for Indian climatic conditions when the right materials, protective treatments, moisture management, ventilation, and construction methods are used. The specific requirements depend on your location and environment.'
  },
  {
    question: 'Do you build farmhouses and resorts on existing plots?',
    answer: 'Yes, we can discuss projects on your existing land, including farmhouses, private cottages, resort units, and holiday retreats. The design and construction approach will depend on site conditions, access, local regulations, and your project requirements.'
  },
  {
    question: 'What materials are used to construct your wooden cottages?',
    answer: 'Material selection depends on the design, intended use, budget, and site conditions. Depending on the project, construction may include suitable timber, engineered wood, structural framing, insulation, weather-resistant finishes, and other complementary materials.'
  },
  {
    question: 'Can you build cottages for commercial resorts and hospitality businesses?',
    answer: 'Yes, we can discuss cottage developments for resorts, holiday stays, eco-retreats, and hospitality projects. Designs can be planned around guest comfort, privacy, aesthetics, and the intended scale of your property.'
  },
  {
    question: 'Do you help with design, planning, and construction?',
    answer: 'We can discuss your project requirements from the initial concept through design coordination and construction. The exact services included will depend on the agreed project scope.'
  },
  {
    question: 'How can I get started with my cottage or farmhouse project?',
    answer: 'Getting started is simple! Contact Make My Cottage Group with your plot location, approximate land or building size, preferred design, and budget. Our team can discuss your vision and the next steps for your project.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto border-t border-[#e3e3de] relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
        
        {/* Left Column: Pins neatly on scroll and fits comfortably in viewport */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 lg:self-start space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141517] text-white text-xs uppercase tracking-wider font-semibold mb-4 shadow-sm">
              <HiQuestionMarkCircle className="w-4 h-4 text-white" />
              <span>FAQ</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#141517] font-bold tracking-tight leading-[1.08] mb-3.5">
              Got Questions?<br />We Have Answers.
            </h2>

            <p className="text-sm sm:text-base text-[#666] font-light leading-relaxed max-w-md">
              From first consultation to final installation, we know you want to understand exactly what to expect. Here’s everything you need to know about building with Make My Cottage.
            </p>
          </div>

          {/* Consultant Portrait Card - increased height with clean face framing */}
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="relative rounded-3xl overflow-hidden w-full max-w-[340px] sm:max-w-[360px] h-[370px] sm:h-[420px] shadow-xl border border-[#e3e3de] group bg-stone-100 block cursor-pointer transition-all hover:shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
              alt="Make My Cottage Architectural Consultation"
              className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity group-hover:opacity-90" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#ff8a65] block font-semibold mb-1">
                Design &amp; Engineering Team
              </span>
              <p className="text-sm font-heading font-medium text-white leading-snug">
                Turnkey Wooden Architecture Specialists
              </p>
              <span className="text-xs text-white/85 font-light mt-1.5 flex items-center gap-1 group-hover:text-white">
                Call {BUSINESS_INFO.displayPhone} &rarr;
              </span>
            </div>
          </a>
        </div>

        {/* Right Column: Individual Rounded Pill Card Accordion (Exact RBP Imageworks Clone) */}
        <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={faq.question} 
                className="rounded-2xl bg-[#f2f1ee] hover:bg-[#eae8e4] transition-colors overflow-hidden"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="group flex w-full items-center justify-between gap-6 rounded-2xl px-5 py-5 sm:px-6 sm:py-6 text-left text-[16px] sm:text-[17px] leading-6 font-medium text-[#141517] cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="transition-colors group-hover:text-[#141517]/85 font-heading">
                      {faq.question}
                    </span>
                    <span 
                      aria-hidden="true" 
                      className={`flex h-5 w-5 shrink-0 items-center justify-center text-[#141517]/70 transition-transform duration-300 transform select-none ${
                        isOpen ? 'rotate-45 text-[#141517]' : 'group-hover:text-[#141517]'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-[18px] w-[18px]"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-5 pb-6 text-[14px] sm:text-[15px] leading-7 text-[#666] font-light sm:px-6 sm:pb-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
