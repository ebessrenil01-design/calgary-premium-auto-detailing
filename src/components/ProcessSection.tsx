import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { Search, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSETS } from '../assets/images';

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  imageTag: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Consultation',
    subtitle: 'Surface Audit & Assessment',
    description:
      'Every vehicle starts with an in-depth audit at our Padil studio. We measure paint thickness, map swirl defects, and evaluate cabin materials to tailor the exact detailing protocol.',
    image: ASSETS.detailingSuppliesCart,
    imageAlt: 'Workshop detailing supplies and audit tools',
    imageTag: 'Audit & Chemical Prep',
    deliverables: ['Digital paint depth analysis', 'Defect mapping & contamination audit', 'Customized treatment recommendation'],
    icon: Search,
  },
  {
    step: '02',
    title: 'Execution',
    subtitle: 'Precision Multi-Stage Craft',
    description:
      'Conducted in our controlled studio bay using pH-balanced decontamination, multi-stage dual-action machine polishing, and climate-timed ceramic coating application.',
    image: ASSETS.coatingBottlesKit,
    imageAlt: 'Ceramic coating application kit and PPF film',
    imageTag: 'Compound & Nano-Coating',
    deliverables: ['Contactless snow foam & iron bath', 'Two-stage swirl & haze correction', 'Infrared-assisted ceramic curing'],
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Quality Inspection',
    subtitle: 'High-CRI Audit & Handover',
    description:
      'Before handover, each panel, wheel barrel, and cabin crease undergoes a 360-degree inspection under high-CRI specular lighting to ensure uncompromising optical clarity.',
    image: ASSETS.paintCorrectionSplit,
    imageAlt: '50/50 paint correction inspection under specular lighting',
    imageTag: 'High-CRI Specular Audit',
    deliverables: ['Multi-angle light bar inspection', 'Interior sanitation verification', 'Personalized maintenance schedule'],
    icon: CheckCircle2,
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="relative bg-[#0C0C0C] py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-slate-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-2 block">
            Methodology & Standards
          </span>
          <h2
            style={{ fontSize: 'clamp(2.75rem, 9vw, 130px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            OUR PROCESS
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 mt-4 max-w-xl mx-auto font-light">
            A disciplined three-stage progression engineered to restore, protect, and elevate your vehicle
          </p>
        </FadeIn>

        {/* Timeline Component */}
        <div className="relative">
          {/* Horizontal connecting track line for desktop (hidden on mobile) */}
          <div className="hidden md:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-0" />

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {PROCESS_STEPS.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <FadeIn
                  key={item.step}
                  delay={index * 0.15}
                  y={30}
                  duration={0.7}
                  className="group relative flex flex-col justify-between rounded-[32px] sm:rounded-[36px] bg-[#121418] border border-white/10 p-6 sm:p-8 hover:border-[#D7E2EA]/30 hover:bg-[#16181F] transition-all duration-300 shadow-xl"
                >
                  <div>
                    {/* Top Row: Icon badge + Timeline Step Number */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#1C1F28] border border-white/10 flex items-center justify-center text-[#D7E2EA] group-hover:scale-110 group-hover:border-white/30 group-hover:text-white transition-all duration-300 shadow-inner">
                        <IconComponent className="w-6 h-6 stroke-[1.75]" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">
                          Stage
                        </span>
                        <span className="text-3xl sm:text-4xl font-black text-[#D7E2EA]/40 group-hover:text-[#D7E2EA] transition-colors font-['Kanit',sans-serif]">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mb-4">
                      <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7] font-semibold block">
                        {item.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">
                        {item.title}
                      </h3>
                    </div>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Visual Craft Preview */}
                    <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/25 transition-all">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] uppercase tracking-wider text-slate-300 font-medium border border-white/10">
                        {item.imageTag}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables / Checklist */}
                  <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
                    {item.deliverables.map((deliverable, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-[#BBCCD7] transition-colors shrink-0" />
                        <span className="truncate">{deliverable}</span>
                      </div>
                    ))}
                  </div>

                  {/* Desktop connector arrow badge between steps */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-[58px] z-20 w-8 h-8 rounded-full bg-[#181B22] border border-white/15 items-center justify-center text-slate-400 shadow-lg">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
