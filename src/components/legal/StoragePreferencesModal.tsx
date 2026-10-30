import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  HardDrive,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
  Lock,
} from 'lucide-react';
import {
  getStoredInquiries,
  clearStoredInquiries,
  type CustomerInquiry,
} from '../../services/inquiryAutomation';

interface StoragePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTracker?: () => void;
  onOpenLegal?: (tab: string) => void;
}

const ANALYTICS_CONSENT_KEY = 'calgary_analytics_consent';

export const StoragePreferencesModal: React.FC<StoragePreferencesModalProps> = ({
  isOpen,
  onClose,
  onOpenTracker,
  onOpenLegal,
}) => {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [clearedMessage, setClearedMessage] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ANALYTICS_CONSENT_KEY) === 'granted';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isOpen) {
      setInquiries(getStoredInquiries());
      setClearedMessage(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClearInquiries = () => {
    clearStoredInquiries();
    setInquiries([]);
    setClearedMessage(true);
    setTimeout(() => setClearedMessage(false), 4000);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(
        ANALYTICS_CONSENT_KEY,
        analyticsConsent ? 'granted' : 'denied'
      );
    } catch {
      // Ignore
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl rounded-3xl bg-[#0E1015] border border-[#272B35] text-[#D7E2EA] p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
          role="dialog"
          aria-labelledby="cookie-settings-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#272B35]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7] font-semibold block">
                  Transparency & Control
                </span>
                <h2
                  id="cookie-settings-title"
                  className="text-lg sm:text-xl font-bold uppercase text-white tracking-wide"
                >
                  Cookie & Data Storage Settings
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-6 text-xs text-slate-300">
            <p className="text-slate-400 font-light leading-relaxed">
              We believe in honest, privacy-conscious engineering. Below is the exact status of technologies used by Calgary Premium Auto Detailing on your device.
            </p>

            {/* Section 1: Functional Local Storage */}
            <div className="p-4 rounded-2xl bg-[#14161F] border border-[#272B35] space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-white uppercase tracking-wider text-xs">
                    Functional LocalStorage
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Strictly Functional
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                Stores your inquiry history (<code className="text-slate-300">calgary_customer_inquiries_v1</code>) solely inside your personal browser. This enables you to track your inquiry references without needing a cloud account. It is never transmitted to advertisers.
              </p>

              {/* Current Storage State */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>
                    Current Browser Storage:{' '}
                    <strong className="text-white">
                      {inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'} saved
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {inquiries.length > 0 && onOpenTracker && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenTracker();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  )}

                  {inquiries.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearInquiries}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear Data</span>
                    </button>
                  )}
                </div>
              </div>

              {clearedMessage && (
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Your local inquiry history has been completely deleted from this browser.</span>
                </div>
              )}
            </div>

            {/* Section 2: Advertising Pixels & Trackers */}
            <div className="p-4 rounded-2xl bg-[#14161F] border border-[#272B35] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-bold text-white uppercase tracking-wider text-xs">
                    Advertising & Marketing Pixels
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  Zero Deployed
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                We do NOT install Meta Pixel, Google Remarketing, TikTok Pixel, or third-party ad networks. We do not sell or monetize your browsing behavior.
              </p>
            </div>

            {/* Section 3: Optional Anonymous Performance Analytics */}
            <div className="p-4 rounded-2xl bg-[#14161F] border border-[#272B35] space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-white uppercase tracking-wider text-xs block">
                    Future Anonymous Studio Analytics
                  </span>
                  <span className="text-[11px] text-slate-400 font-light">
                    Controls whether non-essential anonymized traffic telemetry is permitted if enabled in future updates.
                  </span>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Currently, no third-party analytics scripts run on this website. This switch ensures any future telemetry remains blocked without your consent.
                </span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-[#272B35]">
            <div className="text-[11px] text-slate-400">
              Read our full{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLegal?.('cookies');
                }}
                className="text-[#BBCCD7] underline hover:text-white cursor-pointer"
              >
                Cookie & Storage Policy
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
