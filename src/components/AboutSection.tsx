import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';
import { ASSETS } from '../assets/images';
import { MapPin } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const aboutText =
    "Every vehicle has its own character. At Calgary Premium Auto Detailing, the focus is on the details that bring out its best — from the finish of the paintwork to the care given to the cabin. Explore professional automotive care designed around your vehicle and your expectations.";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden bg-[#0C0C0C]"
    >
      {/* Decorative 1: Top-left Polished Alloy Wheel */}
      <div className="hidden xl:block absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 pointer-events-none w-[110px] sm:w-[150px] md:w-[190px]">
        <FadeIn delay={0.1} x={-60} y={0} duration={0.9}>
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black"
          >
            <img
              src={ASSETS.wheelAlloyRim}
              alt="Precision alloy wheel and brake caliper detailing at Calgary Auto Detailing Padil"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/images/wheel_alloy_rim_1792178355937.jpg';
              }}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Decorative 2: Bottom-left Detailing Machine & Spray */}
      <div className="hidden xl:block absolute bottom-[8%] left-[2%] sm:left-[4%] md:left-[6%] z-0 pointer-events-none w-[110px] sm:w-[140px] md:w-[180px]">
        <FadeIn delay={0.25} x={-60} y={0} duration={0.9}>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black"
          >
            <img
              src={ASSETS.detailingPolisher}
              alt="Dual-action machine paint correction polisher at Calgary studio Mangaluru"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/images/detailing_polisher_1792178356004.jpg';
              }}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Decorative 3: Top-right Crystal LED Headlight */}
      <div className="hidden xl:block absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 pointer-events-none w-[110px] sm:w-[150px] md:w-[190px]">
        <FadeIn delay={0.15} x={60} y={0} duration={0.9}>
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black"
          >
            <img
              src={ASSETS.headlightLens}
              alt="Restored crystal LED headlight lens after multi-stage optical polishing"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/images/headlight_lens_1792178356267.jpg';
              }}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Decorative 4: Bottom-right Ceramic Hydrophobic Water Beads */}
      <div className="hidden xl:block absolute bottom-[8%] right-[2%] sm:right-[4%] md:right-[6%] z-0 pointer-events-none w-[120px] sm:w-[150px] md:w-[190px]">
        <FadeIn delay={0.3} x={60} y={0} duration={0.9}>
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black"
          >
            <img
              src={ASSETS.paintWaterBeads}
              alt="Hydrophobic 9H ceramic coating water beading on automotive clearcoat"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/images/paint_water_beads_1792178356657.jpg';
              }}
            />
          </motion.div>
        </FadeIn>
      </div>

      {/* Center Content Column */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Studio Location Pill */}
        <FadeIn delay={0} y={20} duration={0.6}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-slate-300 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#BBCCD7]" />
            <span>Padil, Mangaluru · Dedicated Detailing Facility</span>
          </div>
        </FadeIn>

        {/* Heading: "THE CALGARY STANDARD" */}
        <FadeIn delay={0.1} y={35} duration={0.8} className="w-full text-center">
          <h2
            style={{ fontSize: 'clamp(2.75rem, 10vw, 150px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            THE CALGARY STANDARD
          </h2>
        </FadeIn>

        {/* Animated paragraph: character-by-character scroll reveal */}
        <div className="mt-8 sm:mt-12 max-w-[620px] mx-auto text-center px-4">
          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed"
          />
        </div>

        {/* Contact CTA */}
        <div className="mt-12 sm:mt-16">
          <FadeIn delay={0.3} y={20} duration={0.7}>
            <ContactButton
              onClick={onOpenBooking}
              label="LET’S TALK ABOUT YOUR CAR"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
