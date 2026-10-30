import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageSquare, Shield, Sparkles } from 'lucide-react';
import { ContactButton } from './ContactButton';
import type { DetailingShowcase } from './ProjectsSection';
import { getWhatsAppUrl } from '../config/businessInfo';

interface ProjectModalProps {
  showcase: DetailingShowcase | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  showcase,
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!showcase) return null;

  const handleDirectWhatsApp = () => {
    const url = getWhatsAppUrl(showcase.name);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 25 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#101114] border border-[#272B35] rounded-[32px] sm:rounded-[40px] text-[#D7E2EA] shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-[#272B35] bg-[#14161C]/50">
              <div className="flex items-center gap-4">
                <span className="text-3xl sm:text-4xl font-black text-[#D7E2EA] leading-none">
                  {showcase.number}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    <span>{showcase.category}</span>
                    <span>·</span>
                    <span>Calgary Studio Showcase</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    {showcase.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Image Grid Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 flex flex-col gap-4">
                  <div className="rounded-2xl overflow-hidden border border-[#272B35] bg-black">
                    <img
                      src={showcase.col1Img1}
                      alt={`${showcase.name} view 1`}
                      className="w-full h-44 sm:h-52 object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        if (showcase.fallback1 && e.currentTarget.src !== showcase.fallback1) {
                          e.currentTarget.src = showcase.fallback1;
                        }
                      }}
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-[#272B35] bg-black">
                    <img
                      src={showcase.col1Img2}
                      alt={`${showcase.name} view 2`}
                      className="w-full h-48 sm:h-64 object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        if (showcase.fallback2 && e.currentTarget.src !== showcase.fallback2) {
                          e.currentTarget.src = showcase.fallback2;
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="md:col-span-7">
                  <div className="rounded-2xl overflow-hidden border border-[#272B35] bg-black h-full">
                    <img
                      src={showcase.col2Img}
                      alt={`${showcase.name} featured visual`}
                      className="w-full h-full min-h-[300px] object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        if (showcase.fallback3 && e.currentTarget.src !== showcase.fallback3) {
                          e.currentTarget.src = showcase.fallback3;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Service Details & Process */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#272B35]">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    Service Scope & Methodology
                  </h4>
                  <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                    {showcase.overview}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Signature Highlights
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {showcase.keyHighlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:border-l md:border-[#272B35] md:pl-6">
                  <div>
                    <h5 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Studio Standards
                    </h5>
                    <div className="space-y-2 text-xs text-slate-400 font-light">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-slate-300" />
                        <span>Padil, Mangaluru Facility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-slate-300" />
                        <span>pH-Neutral & Safe Compounds</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#272B35]/60 space-y-2.5">
                    <button
                      type="button"
                      onClick={handleDirectWhatsApp}
                      className="w-full py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Enquiry</span>
                    </button>

                    <ContactButton
                      onClick={() => {
                        onClose();
                        onOpenBooking(showcase.name);
                      }}
                      label="Book Consultation"
                      className="w-full text-center justify-center text-xs py-2.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
