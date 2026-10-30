import React, { useRef, useState, useEffect } from 'react';
import { ASSETS } from '../assets/images';

export interface MarqueeItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  fallbackUrl: string;
}

export const AUTOMOTIVE_MARQUEE_ITEMS: MarqueeItem[] = [
  {
    id: 1,
    title: 'Creta Studio Ceramic Finish',
    category: 'Compact SUV Care',
    imageUrl: ASSETS.indianSuvHero,
    fallbackUrl: '/images/indian_suv_hero_1792860438216.jpg',
  },
  {
    id: 2,
    title: 'Ceramic Coating Application',
    category: 'Paint Protection',
    imageUrl: ASSETS.paintWaterBeads,
    fallbackUrl: '/images/paint_water_beads_1792178356657.jpg',
  },
  {
    id: 3,
    title: 'Paint Polishing Close-Up',
    category: 'Machine Correction',
    imageUrl: ASSETS.paintPolishingClose,
    fallbackUrl: '/images/paint_polishing_close_1792178378783.jpg',
  },
  {
    id: 4,
    title: 'Nano-Ceramic Vials & Suede Kit',
    category: 'Coating Materials',
    imageUrl: ASSETS.coatingBottlesKit,
    fallbackUrl: '/images/coating_bottles_kit_1792861000118.jpg',
  },
  {
    id: 5,
    title: 'Cabin Interior Detailing',
    category: 'Deep Interior Clean',
    imageUrl: ASSETS.luxuryInteriorDetail,
    fallbackUrl: '/images/luxury_interior_detail_1792178377594.jpg',
  },
  {
    id: 6,
    title: '7D Tailored Diamond Floor Mats',
    category: 'Cabin Accessories',
    imageUrl: ASSETS.interiorFloorMats,
    fallbackUrl: '/images/interior_floor_mats_1792861014644.jpg',
  },
  {
    id: 7,
    title: 'Forged Wheel & Tyre Treatment',
    category: 'Wheel Care',
    imageUrl: ASSETS.wheelAlloyRim,
    fallbackUrl: '/images/wheel_alloy_rim_1792178355937.jpg',
  },
  {
    id: 8,
    title: 'Crystal Headlight Restoration',
    category: 'Clarity Enhancement',
    imageUrl: ASSETS.headlightLens,
    fallbackUrl: '/images/headlight_lens_1792178356267.jpg',
  },
  {
    id: 9,
    title: 'Honda City Precision Polishing',
    category: 'Sedan Paint Correction',
    imageUrl: ASSETS.sedanPaintPolish,
    fallbackUrl: '/images/sedan_paint_polish_1792860470323.jpg',
  },
  {
    id: 10,
    title: 'Dense Snow Foam Bath',
    category: 'Contactless Prep Wash',
    imageUrl: ASSETS.snowFoamWash,
    fallbackUrl: '/images/snow_foam_wash_1792178379611.jpg',
  },
  {
    id: 11,
    title: '50/50 Swirl & Scratch Inspection',
    category: 'Optical Test',
    imageUrl: ASSETS.paintCorrectionSplit,
    fallbackUrl: '/images/paint_correction_split_1792861029584.jpg',
  },
  {
    id: 12,
    title: 'Mahindra XUV700 Studio Gloss',
    category: 'Midsize SUV Protection',
    imageUrl: ASSETS.indianXuvGloss,
    fallbackUrl: '/images/indian_xuv_gloss_1792860485177.jpg',
  },
  {
    id: 13,
    title: 'Dual-Action Machine Polisher & Sprays',
    category: 'Professional Equipment',
    imageUrl: ASSETS.detailingPolisher,
    fallbackUrl: '/images/detailing_polisher_1792178356004.jpg',
  },
  {
    id: 14,
    title: 'Studio Detailing Cart & Supplies',
    category: 'Workshop Products',
    imageUrl: ASSETS.detailingSuppliesCart,
    fallbackUrl: '/images/detailing_supplies_cart_1792861044366.jpg',
  },
  {
    id: 15,
    title: 'Immaculate Mirror Paint Finish',
    category: 'Optical Reflection',
    imageUrl: ASSETS.ceramicGlowFinish,
    fallbackUrl: '/images/ceramic_glow_finish_1792178378682.jpg',
  },
  {
    id: 16,
    title: 'Console & Digital Cockpit Detailing',
    category: 'Interior Trim Care',
    imageUrl: ASSETS.luxuryInteriorDetail,
    fallbackUrl: '/images/luxury_interior_detail_1792178377594.jpg',
  },
  {
    id: 17,
    title: 'Kia Seltos Ceramic Shield',
    category: 'SUV Surface Coating',
    imageUrl: ASSETS.seltosCompactSuv,
    fallbackUrl: '/images/seltos_compact_suv_1792860532668.jpg',
  },
  {
    id: 18,
    title: 'Executive Sedan Reflection',
    category: 'Luxury Care',
    imageUrl: ASSETS.luxuryGermanSedan,
    fallbackUrl: '/images/luxury_german_sedan_1792860517810.jpg',
  },
  {
    id: 19,
    title: 'Clearcoat Leveling & Depth Test',
    category: 'Optical Refinement',
    imageUrl: ASSETS.paintPolishingClose,
    fallbackUrl: '/images/paint_polishing_close_1792178378783.jpg',
  },
  {
    id: 20,
    title: 'Multi-Year Ceramic Shielding',
    category: 'Hydrophobic Seal',
    imageUrl: ASSETS.paintWaterBeads,
    fallbackUrl: '/images/paint_water_beads_1792178356657.jpg',
  },
  {
    id: 21,
    title: 'Innova Hycross Handover Finish',
    category: 'Handover Finish',
    imageUrl: ASSETS.innovaHycrossFinish,
    fallbackUrl: '/images/innova_hycross_finish_1792860500516.jpg',
  },
];

const ROW1_ITEMS = AUTOMOTIVE_MARQUEE_ITEMS.slice(0, 11);
const ROW2_ITEMS = AUTOMOTIVE_MARQUEE_ITEMS.slice(11);

// Tripled lists for seamless scroll visuals
const ROW1_TRIPLED = [...ROW1_ITEMS, ...ROW1_ITEMS, ...ROW1_ITEMS];
const ROW2_TRIPLED = [...ROW2_ITEMS, ...ROW2_ITEMS, ...ROW2_ITEMS];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateOffset = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setOffset(calculatedOffset);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateOffset();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: moves RIGHT on scroll (translateX(offset - 200)) */}
        <div
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
          className="flex gap-3 w-max"
        >
          {ROW1_TRIPLED.map((item, index) => (
            <div
              key={`row1-${item.id}-${index}`}
              className="group relative w-[420px] min-w-[420px] h-[270px] rounded-2xl overflow-hidden bg-[#121214] border border-white/5 shadow-xl shrink-0"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (item.fallbackUrl && e.currentTarget.src !== item.fallbackUrl) {
                    e.currentTarget.src = item.fallbackUrl;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-5">
                <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7] font-semibold">
                  {item.category}
                </span>
                <span className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: moves LEFT on scroll (translateX(-(offset - 200))) */}
        <div
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
          className="flex gap-3 w-max"
        >
          {ROW2_TRIPLED.map((item, index) => (
            <div
              key={`row2-${item.id}-${index}`}
              className="group relative w-[420px] min-w-[420px] h-[270px] rounded-2xl overflow-hidden bg-[#121214] border border-white/5 shadow-xl shrink-0"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (item.fallbackUrl && e.currentTarget.src !== item.fallbackUrl) {
                    e.currentTarget.src = item.fallbackUrl;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-5">
                <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7] font-semibold">
                  {item.category}
                </span>
                <span className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
