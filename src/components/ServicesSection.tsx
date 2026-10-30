import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import {
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Shield,
  Car,
  Package,
  HelpCircle,
} from 'lucide-react';
import { BUSINESS_CONFIG, type DetailingServiceItem } from '../config/businessInfo';
import { ASSETS } from '../assets/images';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = BUSINESS_CONFIG.serviceCategories;

  // Flatten or filter services
  const displayedServices: {
    service: DetailingServiceItem;
    categoryTitle: string;
    thumbnail: string;
  }[] = [];

  // Map thumbnails to services
  const getThumbnailForService = (id: string): string => {
    switch (id) {
      case 'pro-foam-wash':
        return ASSETS.snowFoamWash;
      case 'engine-bay-detail':
        return ASSETS.detailingSuppliesCart;
      case 'deep-interior-clean':
        return ASSETS.luxuryInteriorDetail;
      case 'calgary-full-detail':
        return ASSETS.indianXuvGloss;
      case 'multi-stage-correction':
        return ASSETS.paintCorrectionSplit;
      case 'ceramic-coating':
        return ASSETS.coatingBottlesKit;
      case 'paint-protection-film':
        return ASSETS.paintWaterBeads;
      case 'headlight-restoration':
        return ASSETS.headlightLens;
      case 'interior-accessories':
        return ASSETS.interiorFloorMats;
      case 'studio-inspection':
        return ASSETS.sedanPaintPolish;
      case 'wheel-tyre-care':
        return ASSETS.wheelAlloyRim;
      default:
        return ASSETS.ceramicGlowFinish;
    }
  };

  categories.forEach((cat) => {
    if (activeTab === 'all' || activeTab === cat.id) {
      cat.services.forEach((srv) => {
        displayedServices.push({
          service: srv,
          categoryTitle: cat.categoryName,
          thumbnail: getThumbnailForService(srv.id),
        });
      });
    }
  });

  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-4 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "OUR SERVICES" in #0C0C0C */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs uppercase tracking-widest text-[#0C0C0C]/80 font-semibold mb-3">
            <span>Automotive Detailing Only</span>
            <span>·</span>
            <span>Padil Studio, Mangaluru</span>
          </div>

          <h2
            style={{ fontSize: 'clamp(2.75rem, 11vw, 150px)' }}
            className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center mb-6"
          >
            OUR SERVICES
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-12 sm:mb-16">
            Precision automotive care, swirl-free paint correction, interior hygiene, and nano-ceramic shielding tailored to coastal Karnataka driving conditions
          </p>
        </FadeIn>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0C0C0C] text-white shadow-md'
                : 'bg-black/5 text-slate-700 hover:bg-black/10'
            }`}
          >
            All Services ({categories.reduce((acc, c) => acc + c.services.length, 0)})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#0C0C0C] text-white shadow-md'
                  : 'bg-black/5 text-slate-700 hover:bg-black/10'
              }`}
            >
              {cat.categoryName} ({cat.services.length})
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="border-t border-[#0C0C0C]/15 space-y-2">
          {displayedServices.map(({ service, categoryTitle, thumbnail }, index) => {
            const numStr = String(index + 1).padStart(2, '0');

            return (
              <FadeIn
                key={service.id}
                delay={index * 0.05}
                y={25}
                duration={0.65}
                className="border-b border-[#0C0C0C]/15 py-8 sm:py-10"
              >
                <div className="group flex flex-col lg:flex-row items-start justify-between gap-6 p-4 sm:p-6 -mx-2 sm:-mx-4 rounded-3xl hover:bg-[#F4F5F8] transition-all duration-300">
                  {/* Left: Number */}
                  <div
                    style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}
                    className="font-black text-[#0C0C0C] leading-none shrink-0 tracking-tight lg:w-24 group-hover:scale-105 transition-transform"
                  >
                    {numStr}
                  </div>

                  {/* Center Column: Service Details */}
                  <div className="flex-1 space-y-4 max-w-2xl">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-black/5 text-slate-700 border border-black/10">
                          {categoryTitle}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                          <Clock className="w-3 h-3" />
                          <span>Duration: Condition &amp; Scope Dependent</span>
                        </span>
                      </div>

                      <h3
                        style={{ fontSize: 'clamp(1.15rem, 2vw, 1.75rem)' }}
                        className="font-bold uppercase text-[#0C0C0C] tracking-wide group-hover:text-black transition-colors"
                      >
                        {service.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-700 font-light mt-1.5 leading-relaxed">
                        {service.summary}
                      </p>
                    </div>

                    {/* Inclusions bullet points */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-900 block">
                        Included in this Treatment:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                        {service.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exclusive Monthly Wash Perk Banner for Ceramic & PPF */}
                    {service.monthlyWashPerk && (
                      <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs font-semibold">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Exclusive Calgary Benefit: 1 Free Studio Maintenance Wash Once Every Month</span>
                      </div>
                    )}

                    {/* Realistic Expectations & Who it is for */}
                    <div className="p-3.5 rounded-2xl bg-white border border-black/10 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase tracking-wider text-[10px]">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Realistic Studio Expectations</span>
                      </div>
                      <p className="text-slate-600 font-light leading-relaxed text-[11px]">
                        {service.realisticExpectations}
                      </p>
                    </div>

                    {/* Professional Duration Notice */}
                    <p className="text-[11px] text-slate-500 italic bg-black/5 p-2.5 rounded-xl border border-black/5 leading-relaxed">
                      Service duration and vehicle collection depend on the selected service and the vehicle&apos;s condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.
                    </p>

                    {/* Transparent Quote Basis & Perk Pill */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-700 font-medium">
                      <span className="font-bold text-black uppercase tracking-wider">Pricing:</span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/5 text-slate-700">
                        {service.quoteBasis}
                      </span>
                      {service.monthlyWashPerk && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          1 Free Wash / Month Included
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Thumbnail & CTA Button */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 shrink-0 pt-2 lg:pt-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/10 group-hover:border-black/30 transition-all shadow-sm bg-slate-100">
                      <img
                        src={thumbnail}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService?.(service.name)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0C0C0C] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-md active:scale-95 whitespace-nowrap"
                    >
                      <span>Inquire Now</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Free Inspection Studio Callout Box */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#0C0C0C] text-[#D7E2EA] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
              Padil Bay Walk-Ins Welcome
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Unsure which treatment your car needs?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
              Visit our studio in Padil, Mangaluru for a complimentary 20-minute digital paint depth audit and swirl-finder evaluation. Zero sales pressure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectService?.('Complimentary Surface Inspection & Custom Quote')}
            className="px-6 py-3 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shrink-0 shadow-md active:scale-95"
          >
            Book Free Studio Audit
          </button>
        </div>
      </div>
    </section>
  );
};
