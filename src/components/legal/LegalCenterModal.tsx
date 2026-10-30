import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Shield,
  FileText,
  Lock,
  RotateCcw,
  AlertTriangle,
  HelpCircle,
  Search,
  Printer,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import { LEGAL_DOCUMENTS, type LegalSection } from '../../data/legalContent';
import { BUSINESS_CONFIG, getPhoneCallUrl } from '../../config/businessInfo';

interface LegalCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
  onOpenBooking?: () => void;
  onOpenStorageSettings?: () => void;
}

const TABS = [
  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
  { id: 'cookies', label: 'Cookies & Storage', icon: Shield },
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'serviceBooking', label: 'Booking & Refunds', icon: RotateCcw },
  { id: 'disclaimer', label: 'Estimate Disclaimer', icon: AlertTriangle },
  { id: 'grievance', label: 'Privacy Requests', icon: HelpCircle },
];

export const LegalCenterModal: React.FC<LegalCenterModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
  onOpenBooking,
  onOpenStorageSettings,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync activeTab when initialTab prop changes
  useEffect(() => {
    if (initialTab && LEGAL_DOCUMENTS[initialTab]) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Handle URL hash updates
  useEffect(() => {
    if (isOpen) {
      window.history.replaceState(null, '', `#${activeTab}`);
    }
  }, [isOpen, activeTab]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const currentDoc: LegalSection = useMemo(() => {
    return LEGAL_DOCUMENTS[activeTab] || LEGAL_DOCUMENTS.privacy;
  }, [activeTab]);

  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) return currentDoc.content;
    const query = searchQuery.toLowerCase();
    return currentDoc.content.filter((line) => line.toLowerCase().includes(query));
  }, [currentDoc, searchQuery]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${activeTab}`;
    navigator.clipboard?.writeText?.(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Main Modal Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl h-[92vh] max-h-[920px] rounded-[32px] sm:rounded-[40px] bg-[#0C0C0C] border border-[#272B35] text-[#D7E2EA] shadow-2xl flex flex-col z-10 overflow-hidden"
          role="dialog"
          aria-labelledby="legal-modal-title"
          aria-modal="true"
        >
          {/* Top Modal Header */}
          <div className="flex items-center justify-between gap-4 p-4 sm:p-6 border-b border-[#272B35] bg-[#101217]/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#BBCCD7]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black uppercase tracking-wider text-white">
                    CALGARY LEGAL &amp; PRIVACY CENTER
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-[#BBCCD7]">
                    Padil · Mangaluru
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-light hidden sm:block">
                  Plain-language policies, consumer rights, data minimization &amp; studio operational standards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
                title="Copy link to this policy"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Share Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
                title="Print current policy"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close legal center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 px-4 sm:px-6 py-3 border-b border-[#272B35] bg-[#0E1015] overflow-x-auto no-scrollbar shrink-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D7E2EA] text-[#0C0C0C] shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0C0C0C]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Body Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
            {/* Document Header & Plain-English Executive Summary */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7] font-bold block mb-1">
                    Official Information Document
                  </span>
                  <h1
                    id="legal-modal-title"
                    className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide"
                  >
                    {currentDoc.title}
                  </h1>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Version: {currentDoc.lastUpdated}</span>
                </div>
              </div>

              {/* Plain-Language Takeaway Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#141620] border border-[#272B35] space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-emerald-400">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>Plain-Language Summary (In Short)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {currentDoc.shortSummary}
                </p>
              </div>

              {/* Legal Notice & Owner Placeholder Notice */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-200/90 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span>
                    <strong>Legal Review Posture:</strong> This documentation is an operational draft prepared for customer clarity and alignment with the DPDP Act 2023. It does not replace formal legal counsel.
                  </span>
                  {currentDoc.ownerReviewItems && currentDoc.ownerReviewItems.length > 0 && (
                    <div className="pt-1">
                      <span className="font-semibold text-amber-300 block">
                        Pending Business Owner Approvals for this Document:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-amber-200/80">
                        {currentDoc.ownerReviewItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* In-Document Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search within ${currentDoc.title}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#101217] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 placeholder:text-slate-600 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Document Paragraphs & Sections */}
            <div className="space-y-4 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {filteredContent.map((paragraph, idx) => {
                // Section Heading 3
                if (paragraph.startsWith('### ')) {
                  return (
                    <h2
                      key={idx}
                      className="text-base sm:text-lg font-bold uppercase text-white tracking-wide pt-4 pb-1 border-b border-white/5"
                    >
                      {paragraph.replace('### ', '')}
                    </h2>
                  );
                }

                // Sub-heading 4
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h3
                      key={idx}
                      className="text-sm font-semibold uppercase text-[#BBCCD7] tracking-wider pt-2"
                    >
                      {paragraph.replace('#### ', '')}
                    </h3>
                  );
                }

                // Bullet point
                if (paragraph.startsWith('• ') || paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                  return (
                    <div key={idx} className="flex items-start gap-2 pl-2 sm:pl-4">
                      <span className="text-emerald-400 shrink-0 font-bold">•</span>
                      <span>{paragraph.replace(/^[•\d\.]+\s*/, '')}</span>
                    </div>
                  );
                }

                // Standard paragraph
                return (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}

              {filteredContent.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  <p>No sections matched your search query &ldquo;{searchQuery}&rdquo;.</p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs text-[#BBCCD7] underline cursor-pointer"
                  >
                    Reset search
                  </button>
                </div>
              )}
            </div>

            {/* Document Bottom Help & Contact Bar */}
            <div className="mt-10 p-5 rounded-2xl bg-[#12141A] border border-[#272B35] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  Have questions regarding our terms or your vehicle care?
                </span>
                <p className="text-[11px] text-slate-400 font-light">
                  Our detailing team at Padil, Mangaluru is available for consultations, walk-in inspections, and privacy requests.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
                <a
                  href={getPhoneCallUrl()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-xs uppercase tracking-wider font-semibold hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_CONFIG.contact.displayPhone}</span>
                </a>

                {onOpenBooking && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                  >
                    <span>Inquiry Wizard</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Modal Bottom Sticky Footer */}
          <div className="p-3 sm:p-4 border-t border-[#272B35] bg-[#0E1015] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px]">
                {BUSINESS_CONFIG.name} · Padil, Mangaluru 575007
              </span>
            </div>

            <div className="flex items-center gap-3">
              {onOpenStorageSettings && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenStorageSettings();
                  }}
                  className="text-[11px] text-[#BBCCD7] hover:text-white underline cursor-pointer"
                >
                  Manage Storage &amp; Cookies
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
