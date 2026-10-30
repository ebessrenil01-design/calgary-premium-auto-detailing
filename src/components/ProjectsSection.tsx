import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ASSETS } from '../assets/images';

export interface DetailingShowcase {
  number: string;
  name: string;
  category: string;
  supportingCopy: string;
  overview: string;
  keyHighlights: string[];
  serviceAnchor: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  fallback1?: string;
  fallback2?: string;
  fallback3?: string;
}

export const SHOWCASE_CARDS: DetailingShowcase[] = [
  {
    number: '01',
    name: 'EXTERIOR FINISH',
    category: 'EXTERIOR DETAILING',
    supportingCopy: 'Precision wash, iron decontamination & high-gloss exterior refinement.',
    overview:
      'A complete exterior overhaul starting with snow-foam pre-wash, two-bucket hand wash, iron decontamination, and precision cleaning of door jambs, wheels, and wheel arches.',
    keyHighlights: [
      'Gentle pH-balanced snow foam soak',
      'Wheel barrels and caliper detailing',
      'Glass decontamination and optical wipe-down',
      'Trim dressing and tire conditioning',
    ],
    serviceAnchor: 'PROFESSIONAL CAR WASH',
    col1Img1: ASSETS.snowFoamWash,
    col1Img2: ASSETS.wheelAlloyRim,
    col2Img: ASSETS.indianXuvGloss,
    fallback1: '/images/snow_foam_wash_1792178379611.jpg',
    fallback2: '/images/wheel_alloy_rim_1792178355937.jpg',
    fallback3: '/images/indian_xuv_gloss_1792860485177.jpg',
  },
  {
    number: '02',
    name: 'CABIN & INTERIOR',
    category: 'INTERIOR CARE',
    supportingCopy: 'Deep cabin hygiene and specialized interior treatment.',
    overview:
      'Thorough interior cabin restoration focusing on high-contact zones, leather nourishment, fabric steam cleaning, dashboard conditioning, and germ-free hygienic treatment.',
    keyHighlights: [
      'Deep carpet and mat extraction',
      'Supple leather cleaning and conditioning',
      'Vent sanitization and germ-free treatment',
      'Console and cockpit detail conditioning',
    ],
    serviceAnchor: 'INTERIOR DETAILING',
    col1Img1: ASSETS.luxuryInteriorDetail,
    col1Img2: ASSETS.interiorFloorMats,
    col2Img: ASSETS.innovaHycrossFinish,
    fallback1: '/images/luxury_interior_detail_1792178377594.jpg',
    fallback2: '/images/interior_floor_mats_1792861014644.jpg',
    fallback3: '/images/innova_hycross_finish_1792860500516.jpg',
  },
  {
    number: '03',
    name: 'PAINT, CERAMIC & PPF',
    category: 'PAINT PROTECTION & COATINGS',
    supportingCopy: 'Multi-stage paint correction, SiO2 ceramic coating & TPU self-healing PPF.',
    overview:
      'Multi-stage machine paint polishing to eliminate swirl marks, haze, and light scratches, followed by professional ceramic coating or TPU paint protection film application with complimentary monthly maintenance washing.',
    keyHighlights: [
      '1 Free studio maintenance wash once every month included',
      'Digital paint depth and clearcoat defect audit',
      'Dual-action machine polishing eliminating 85–95% of swirls',
      '9H Hydrophobic nano-ceramic & TPU impact protection',
    ],
    serviceAnchor: 'CERAMIC & PPF PROTECTION',
    col1Img1: ASSETS.coatingBottlesKit,
    col1Img2: ASSETS.paintCorrectionSplit,
    col2Img: ASSETS.sedanPaintPolish,
    fallback1: '/images/coating_bottles_kit_1792861000118.jpg',
    fallback2: '/images/paint_correction_split_1792861029584.jpg',
    fallback3: '/images/sedan_paint_polish_1792860470323.jpg',
  },
];

interface ShowcaseCardProps {
  showcase: DetailingShowcase;
  index: number;
  totalCards: number;
  onExplore: (showcase: DetailingShowcase) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  showcase,
  index,
  totalCards,
  onExplore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[720px] md:h-[85vh] flex items-start justify-center relative"
    >
      <motion.div
        style={{
          top: `calc(5.5rem + ${index * 28}px)`,
          scale,
        }}
        className="sticky w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden relative"
      >
        {/* Top row: Number, category label, title, and "EXPLORE SERVICE" button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              className="font-black text-[#D7E2EA] leading-none shrink-0"
            >
              {showcase.number}
            </span>
            <div>
              <div className="mb-0.5">
                <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 font-semibold">
                  {showcase.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-white tracking-tight">
                {showcase.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
                {showcase.supportingCopy}
              </p>
            </div>
          </div>

          <div className="self-end sm:self-center">
            <LiveProjectButton
              label="EXPLORE SERVICE"
              onClick={() => onExplore(showcase)}
            />
          </div>
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Left column (40% width): 2 stacked images showing process / craft */}
          <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6">
            <div className="overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-white/10 bg-black relative group">
              <img
                src={showcase.col1Img1}
                alt={`${showcase.name} - ${showcase.category} process and surface preparation`}
                style={{ height: 'clamp(130px, 16vw, 220px)' }}
                className="w-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (showcase.fallback1 && e.currentTarget.src !== showcase.fallback1) {
                    e.currentTarget.src = showcase.fallback1;
                  }
                }}
              />
              <span className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-slate-300 font-medium border border-white/10">
                Prep & Technique
              </span>
            </div>

            <div className="overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-white/10 bg-black relative group">
              <img
                src={showcase.col1Img2}
                alt={`${showcase.name} - ${showcase.category} component detailing`}
                style={{ height: 'clamp(150px, 20vw, 300px)' }}
                className="w-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  if (showcase.fallback2 && e.currentTarget.src !== showcase.fallback2) {
                    e.currentTarget.src = showcase.fallback2;
                  }
                }}
              />
              <span className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-slate-300 font-medium border border-white/10">
                Component Detail
              </span>
            </div>
          </div>

          {/* Right column (60% width): 1 large finish visual */}
          <div className="w-full md:w-[60%] flex overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-white/15 bg-black relative group">
            <img
              src={showcase.col2Img}
              alt={`${showcase.name} - completed finish presentation at Calgary studio Mangaluru`}
              className="w-full h-full min-h-[300px] object-cover select-none group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                if (showcase.fallback3 && e.currentTarget.src !== showcase.fallback3) {
                  e.currentTarget.src = showcase.fallback3;
                }
              }}
            />
            <span className="absolute bottom-4 left-5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] uppercase tracking-wider text-slate-300 font-medium border border-white/10">
              Completed Finish
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onExploreShowcase: (showcase: DetailingShowcase) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onExploreShowcase }) => {
  return (
    <section
      id="work"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pt-20 sm:pt-24 md:pt-28 pb-24 px-4 sm:px-6 md:px-10"
    >
      {/* Heading: "THE DETAILING EXPERIENCE" */}
      <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-16 sm:mb-20 md:mb-24">
        <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-2 block">
          Editorial Showcase
        </span>
        <h2
          style={{ fontSize: 'clamp(2.5rem, 8vw, 130px)' }}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
        >
          THE DETAILING EXPERIENCE
        </h2>
        <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 mt-4 max-w-xl mx-auto font-light leading-relaxed">
          A curated preview of our detailing stages, from pre-wash surface decontamination to high-gloss optical perfection
        </p>
      </FadeIn>

      {/* 3 sticky-stacking project cards */}
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {SHOWCASE_CARDS.map((showcase, index) => (
          <ShowcaseCard
            key={showcase.number}
            showcase={showcase}
            index={index}
            totalCards={SHOWCASE_CARDS.length}
            onExplore={onExploreShowcase}
          />
        ))}
      </div>
    </section>
  );
};
