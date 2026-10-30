import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { X, ZoomIn, Instagram, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/businessInfo';
import { CALGARY_MEDIA_REGISTRY, type MediaAsset } from '../config/mediaRegistry';

export const GallerySection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<MediaAsset | null>(null);

  return (
    <section id="gallery" className="bg-[#0C0C0C] py-20 sm:py-28 px-4 sm:px-6 md:px-10 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-2 block">
            Studio Portfolio & Craftsmanship
          </span>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            THE ART OF DETAILING
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            Precision surface craft, optical paint correction and protective finishes by Calgary Detailing
          </p>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CALGARY_MEDIA_REGISTRY.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05} y={20} duration={0.6}>
              <div
                className={`group relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#121418] cursor-pointer shadow-lg ${item.orientationClass}`}
                onClick={() => setActiveItem(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    if (item.fallbackUrl && e.currentTarget.src !== item.fallbackUrl) {
                      e.currentTarget.src = item.fallbackUrl;
                    }
                  }}
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] uppercase tracking-wider font-semibold text-slate-300 shadow-md">
                    {item.badge}
                  </span>
                </div>

                {/* Zoom Icon Button */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Gradient Scrim & Metadata */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-6 sm:p-7">
                  <div className="text-[11px] uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    <span>{item.category}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight mt-1 group-hover:text-[#D7E2EA] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 font-light mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-black/92 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#121418] border border-white/20 rounded-3xl overflow-hidden z-10 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[62vh] bg-black flex items-center justify-center overflow-hidden relative">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-contain max-h-[62vh]"
                  decoding="async"
                  onError={(e) => {
                    if (activeItem.fallbackUrl && e.currentTarget.src !== activeItem.fallbackUrl) {
                      e.currentTarget.src = activeItem.fallbackUrl;
                    }
                  }}
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#14161C] flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10">
                <div className="max-w-xl">
                  <div className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    {activeItem.category}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mt-1">
                    {activeItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 leading-relaxed">
                    {activeItem.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                  <a
                    href={getWhatsAppUrl(activeItem.category)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#20ba5a] transition-colors shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4 fill-black" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>View Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
