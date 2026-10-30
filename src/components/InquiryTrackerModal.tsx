import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Car,
  MessageSquare,
  Copy,
  Trash2,
  Phone,
  ExternalLink,
  ShieldCheck,
  Check,
  RotateCcw,
} from 'lucide-react';
import {
  getStoredInquiries,
  clearStoredInquiries,
  buildWhatsAppUrl,
  type CustomerInquiry,
} from '../services/inquiryAutomation';
import { getPhoneCallUrl, BUSINESS_CONFIG } from '../config/businessInfo';

interface InquiryTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewBooking: () => void;
}

const formatVehicleDisplay = (v: unknown): string => {
  if (!v) return 'Vehicle Not Specified';
  if (typeof v === 'string') return v;
  if (typeof v === 'object') {
    const obj = v as Record<string, unknown>;
    const parts = [obj.makeModel, obj.segment, obj.condition].filter(
      (p): p is string => typeof p === 'string' && p.trim().length > 0
    );
    return parts.join(' - ') || 'Vehicle Not Specified';
  }
  return String(v);
};

export const InquiryTrackerModal: React.FC<InquiryTrackerModalProps> = ({
  isOpen,
  onClose,
  onOpenNewBooking,
}) => {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadInquiries = () => {
    const items = getStoredInquiries();
    setInquiries(items);
    if (items.length > 0 && !selectedInquiry) {
      setSelectedInquiry(items[0]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen]);

  const handleCopyMessage = async (inq: CustomerInquiry) => {
    try {
      await navigator.clipboard.writeText(inq.generatedMessage);
      setCopiedId(inq.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleLaunchWhatsApp = (inq: CustomerInquiry) => {
    const url = buildWhatsAppUrl(inq.generatedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all locally saved detailing inquiries from this browser?')) {
      clearStoredInquiries();
      setInquiries([]);
      setSelectedInquiry(null);
    }
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#121418] border border-[#272B35] rounded-[32px] sm:rounded-[40px] text-[#D7E2EA] shadow-2xl z-10 my-8 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-7 border-b border-[#272B35] bg-[#14161C]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 text-[#BBCCD7] flex items-center justify-center shrink-0 border border-white/10">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    <span>Inquiry Tracker & History</span>
                    <span>·</span>
                    <span>Padil Studio</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-tight">
                    Your Detailing Requests
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {inquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="p-2 rounded-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Clear saved inquiries"
                    aria-label="Clear all inquiries"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {inquiries.length === 0 ? (
              <div className="p-10 sm:p-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-slate-500">
                  <Car className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold uppercase text-white">No Inquiries Found Yet</h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto font-light leading-relaxed">
                  When you submit a detailing request using our intelligent questionnaire, your generated WhatsApp payloads and tracking references will appear here for fast review.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenNewBooking();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-semibold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Start New Detailing Inquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
                {/* Left List Column (5 cols) */}
                <div className="md:col-span-5 border-r border-[#272B35] bg-[#0E1014] overflow-y-auto max-h-[500px] p-3 space-y-2">
                  <div className="px-2 py-1 text-[11px] uppercase tracking-wider text-slate-500 font-semibold flex items-center justify-between">
                    <span>Recent Inquiries ({inquiries.length})</span>
                    <span>Local Device</span>
                  </div>

                  {inquiries.map((inq) => {
                    const isSelected = selectedInquiry?.id === inq.id;
                    return (
                      <button
                        key={inq.id}
                        type="button"
                        onClick={() => setSelectedInquiry(inq)}
                        className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#181B22] border-[#BBCCD7]/40 text-white shadow-md'
                            : 'bg-[#121418] border-white/5 hover:border-white/15 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span className="font-mono text-emerald-400 font-semibold">{inq.id}</span>
                          <span>
                            {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="text-sm font-semibold truncate text-white">
                          {inq.serviceRequired}
                        </div>
                        <div className="text-xs text-slate-400 font-light truncate mt-0.5">
                          {formatVehicleDisplay(inq.vehicle)} · {typeof inq.preferredDropOff === 'string' ? inq.preferredDropOff : 'Padil Studio'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Details Column (7 cols) */}
                {selectedInquiry ? (
                  <div className="md:col-span-7 p-6 sm:p-8 bg-[#121418] overflow-y-auto max-h-[500px] space-y-6 flex flex-col justify-between">
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#272B35]">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                            Reference: {selectedInquiry.id}
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold uppercase text-white mt-0.5">
                            {selectedInquiry.serviceRequired}
                          </h4>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                          Ready for WhatsApp
                        </span>
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#0C0C0C] border border-[#272B35]">
                          <span className="text-slate-500 uppercase tracking-wider block text-[10px]">Customer & Vehicle</span>
                          <span className="text-white font-medium">{selectedInquiry.customerName || 'N/A'}</span>
                          <span className="text-slate-400 block text-[11px]">{formatVehicleDisplay(selectedInquiry.vehicle)}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-[#0C0C0C] border border-[#272B35]">
                          <span className="text-slate-500 uppercase tracking-wider block text-[10px]">Drop-off & Schedule</span>
                          <span className="text-white font-medium truncate block">{selectedInquiry.preferredDropOff}</span>
                          <span className="text-emerald-400 block text-[11px]">
                            {selectedInquiry.appointmentDate
                              ? `${selectedInquiry.appointmentDate} ${selectedInquiry.appointmentTime || ''}`
                              : 'Pending coordination'}
                          </span>
                        </div>
                      </div>

                      {/* Formatted Message Payload */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                          <span className="uppercase tracking-wider font-medium">WhatsApp Message Payload</span>
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(selectedInquiry)}
                            className="inline-flex items-center gap-1 text-[11px] text-[#BBCCD7] hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedId === selectedInquiry.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0A0B0E] border border-[#272B35] font-mono text-xs text-slate-300 whitespace-pre-line max-h-44 overflow-y-auto select-all leading-relaxed">
                          {selectedInquiry.generatedMessage}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[#272B35] flex flex-wrap items-center justify-between gap-3">
                      <a
                        href={getPhoneCallUrl()}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call: {BUSINESS_CONFIG.contact.displayPhone}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleLaunchWhatsApp(selectedInquiry)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer shadow-lg active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Open In WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Architecture note / footer */}
            <div className="p-4 bg-[#0A0B0E] border-t border-[#272B35] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Calgary Padil Studio · Client-side persistence active · Ready for WhatsApp Cloud API Webhook
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenNewBooking();
                }}
                className="text-[#BBCCD7] hover:text-white transition-colors uppercase font-semibold text-[10px] tracking-wider"
              >
                + New Inquiry
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
