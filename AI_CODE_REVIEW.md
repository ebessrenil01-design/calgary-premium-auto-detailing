# Calgary Premium Auto Detailing — Complete Code & Architecture Export for AI Review

> Use this document to share the website's complete codebase and architecture with ChatGPT, Claude, or any external AI reviewer.

---

## 1. System Overview
- **Product**: Calgary Premium Auto Detailing website
- **Location**: Padil, Mangaluru, Karnataka, India
- **Tech Stack**: React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, Lucide React, Vite 8
- **Aesthetic Direction**: High-end automotive studio (#0C0C0C charcoal dark mode, #D7E2EA cool silver type, linear gradient display typography, pure white contrasting services section, floating isolated 3D components, sticky-stacking interactive cards).

---

## 2. Component Hierarchy
```
App.tsx
├── HeroSection.tsx (Full viewport, 4-link navbar, massive gradient heading, magnetic car portrait)
├── MarqueeSection.tsx (Dual opposing horizontal scroll rows with 21 automotive categories)
├── AboutSection.tsx (The Calgary Standard, 4 floating 3D corner assets, scroll-driven AnimatedText)
├── ProcessSection.tsx (Three-step horizontal timeline: Consultation -> Execution -> Quality Inspection)
├── ServicesSection.tsx (Contrasting #FFFFFF section, oversized numerals, interactive hover states)
├── ProjectsSection.tsx (The Detailing Experience, 3 sticky stacking cards with scale transform)
├── GallerySection.tsx (The Art of Detailing Bento grid, zoom effects, lightbox modal)
├── ContactSection.tsx (Ready For a Better Finish, WhatsApp builder, Instagram link, business info)
├── Footer
├── ContactModal.tsx (Booking modal with direct WhatsApp message dispatch)
└── ProjectModal.tsx (Showcase inspection modal with detailing process & deliverables)
```

---

## 3. Core Component Sources

### `src/config/businessInfo.ts`
```typescript
export const BUSINESS_CONFIG = {
  name: 'Calgary Premium Auto Detailing',
  shortName: 'Calgary Detailing',
  tagline: 'PREMIUM AUTOMOTIVE CARE. PRECISION IN EVERY DETAIL.',
  location: {
    city: 'Mangaluru',
    neighborhood: 'Padil',
    state: 'Karnataka',
    country: 'India',
    pincode: '575007',
    displayAddress: 'Padil, Mangaluru, Karnataka, India',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Calgary+Premium+Auto+Detailing+Padil+Mangaluru',
  },
  social: {
    instagram: 'https://www.instagram.com/calgary_mangalore/',
    instagramHandle: '@calgary_mangalore',
    justdial: 'https://www.justdial.com/Mangalore/Calgary-Premium-Auto-Detailing/0824PX824-X824-181212174544-M8W7_BZDET',
  },
  contact: {
    whatsappNumber: '919845012345',
    isVerifiedNumber: false,
    displayPhone: '+91 (Configurable - Tap to Enquire)',
    email: 'calgary.mangalore@gmail.com',
  },
  hours: 'Monday – Saturday: 9:00 AM – 7:30 PM · Sunday by Appointment',
};

export function getWhatsAppUrl(service?: string, vehicle?: string): string {
  const base = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappNumber}`;
  const greeting = 'Hello Calgary Premium Auto Detailing,';
  let message = `${greeting} I would like to enquire about`;

  if (service) {
    message += ` the ${service} package`;
  } else {
    message += ` your detailing services`;
  }

  if (vehicle && vehicle.trim()) {
    message += ` for my vehicle (${vehicle.trim()})`;
  } else {
    message += ` for my car`;
  }

  message += ` at your Padil, Mangaluru studio.`;
  return `${base}?text=${encodeURIComponent(message)}`;
}
```

### `src/components/ProcessSection.tsx`
```typescript
import React from 'react';
import { FadeIn } from './FadeIn';
import { Search, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
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
    deliverables: ['Digital paint depth analysis', 'Defect mapping & contamination audit', 'Customized treatment recommendation'],
    icon: Search,
  },
  {
    step: '02',
    title: 'Execution',
    subtitle: 'Precision Multi-Stage Craft',
    description:
      'Conducted in our controlled studio bay using pH-balanced decontamination, multi-stage dual-action machine polishing, and climate-timed ceramic coating application.',
    deliverables: ['Contactless snow foam & iron bath', 'Two-stage swirl & haze correction', 'Infrared-assisted ceramic curing'],
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Quality Inspection',
    subtitle: 'High-CRI Audit & Handover',
    description:
      'Before handover, each panel, wheel barrel, and cabin crease undergoes a 360-degree inspection under high-CRI specular lighting to ensure uncompromising optical clarity.',
    deliverables: ['Multi-angle light bar inspection', 'Interior sanitation verification', 'Personalized maintenance schedule'],
    icon: CheckCircle2,
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative bg-[#0C0C0C] py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-2 block">
            Methodology & Standards
          </span>
          <h2 style={{ fontSize: 'clamp(2.75rem, 9vw, 130px)' }} className="hero-heading font-black uppercase leading-none tracking-tight text-center">
            OUR PROCESS
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 mt-4 max-w-xl mx-auto font-light">
            A disciplined three-stage progression engineered to restore, protect, and elevate your vehicle
          </p>
        </FadeIn>

        <div className="relative">
          <div className="hidden md:block absolute top-[68px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-0" />

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
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#1C1F28] border border-white/10 flex items-center justify-center text-[#D7E2EA] group-hover:scale-110 group-hover:border-white/30 group-hover:text-white transition-all duration-300 shadow-inner">
                        <IconComponent className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Stage</span>
                        <span className="text-3xl sm:text-4xl font-black text-[#D7E2EA]/40 group-hover:text-[#D7E2EA] transition-colors">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7] font-semibold block">{item.subtitle}</span>
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mt-1">{item.title}</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">{item.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
                    {item.deliverables.map((deliverable, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-[#BBCCD7] transition-colors shrink-0" />
                        <span className="truncate">{deliverable}</span>
                      </div>
                    ))}
                  </div>

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
```

---

## 4. Suggested Prompts for ChatGPT Review
Paste this file into ChatGPT along with any of the following prompts:
- *"Review this React + TypeScript + Tailwind architecture for Calgary Premium Auto Detailing. Are there any performance bottlenecks, accessibility issues, or responsive layout flaws?"*
- *"Evaluate the SEO and conversion funnel of this automotive detailing landing page. What recommendations do you have to improve booking conversions?"*
- *"Check the Framer Motion animation patterns used for sticky card stacking and magnetic mouse-hover in this codebase. Is it clean and performant?"*
