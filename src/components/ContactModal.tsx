import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MessageSquare,
  Check,
  Phone,
  Copy,
  Calendar,
  Clock,
  Car,
  AlertCircle,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import { BUSINESS_CONFIG, getPhoneCallUrl } from '../config/businessInfo';
import {
  generateInquiryId,
  generateWhatsAppMessage,
  buildWhatsAppUrl,
  saveInquiryToStorage,
  dispatchInquiryToBackend,
  CALGARY_SERVICES,
  DROP_OFF_OPTIONS,
  type CustomerInquiry,
  type CalgaryService,
  type DropOffOption,
} from '../services/inquiryAutomation';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  onOpenLegal?: (tab: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Ceramic Coating Protection (SiO2)',
  onOpenLegal,
}) => {
  // 1. Customer Name
  const [customerName, setCustomerName] = useState<string>('');

  // 2. Phone Number
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // 3. Vehicle Name/Model
  const [vehicle, setVehicle] = useState<string>('');

  // 4. Service Required
  const [serviceRequired, setServiceRequired] = useState<string>(CALGARY_SERVICES[2]);

  // 5. Preferred Drop-off Type
  const [preferredDropOff, setPreferredDropOff] = useState<DropOffOption>(DROP_OFF_OPTIONS[0]);

  // Appointment Date & Time Selection (Associating with booking request)
  const todayStr = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');

  // UI state
  const [step, setStep] = useState<'form' | 'review' | 'confirmed'>('form');
  const [inquiryId, setInquiryId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Map incoming initialService to one of the 6 authentic Calgary services
  useEffect(() => {
    if (initialService) {
      const lower = initialService.toLowerCase();
      if (lower.includes('wash') || lower.includes('foam')) {
        setServiceRequired('Professional Snow Foam Wash & Decontamination');
      } else if (lower.includes('ppf') || lower.includes('film')) {
        setServiceRequired('Paint Protection Film (PPF)');
      } else if (lower.includes('ceramic') || lower.includes('coating')) {
        setServiceRequired('Ceramic Coating Protection (SiO2)');
      } else if (lower.includes('paint') || lower.includes('correction') || lower.includes('polish')) {
        setServiceRequired('Multi-Stage Paint Correction & Polishing');
      } else if (lower.includes('interior') || lower.includes('cabin')) {
        setServiceRequired('Deep Interior Detailing & Sanitization');
      } else if (lower.includes('wheel') || lower.includes('tyre') || lower.includes('tire')) {
        setServiceRequired('Precision Wheel & Tyre Care');
      }
    }
  }, [initialService, isOpen]);

  // Calculate day-of-week for selected date (Sunday vs Mon-Sat)
  const isSunday = useMemo(() => {
    if (!appointmentDate) return false;
    const parts = appointmentDate.split('-');
    if (parts.length === 3) {
      const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return dateObj.getDay() === 0;
    }
    return false;
  }, [appointmentDate]);

  // Generate available precise appointment time slots based on business hours
  const availableTimeSlots = useMemo(() => {
    if (!appointmentDate) return [];

    // Mon–Sat: 9:00 AM – 7:00 PM (Studio closes at 7:30 PM)
    // Sunday: 10:00 AM – 3:45 PM (Studio closes at 4:00 PM, by appointment)
    const startHour = isSunday ? 10 : 9;
    const endHour = isSunday ? 15 : 19; // 3 PM or 7 PM
    const endMinuteMax = isSunday ? 45 : 0;

    const slots: string[] = [];
    for (let h = startHour; h <= endHour; h++) {
      for (const m of [0, 15, 30, 45]) {
        if (h === endHour && m > endMinuteMax) continue;

        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        const displayMinute = String(m).padStart(2, '0');
        const formatted = `${String(displayHour).padStart(2, '0')}:${displayMinute} ${period}`;

        // If selected date is today, exclude times that have already passed
        if (appointmentDate === todayStr) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();

          // Buffer of 30 minutes for realistic same-day arrival
          if (h < currentHour || (h === currentHour && m <= currentMinute + 30)) {
            continue;
          }
        }

        slots.push(formatted);
      }
    }

    return slots;
  }, [appointmentDate, isSunday, todayStr]);

  // Reset selected time if it becomes invalid when date changes
  useEffect(() => {
    if (appointmentTime && !availableTimeSlots.includes(appointmentTime)) {
      setAppointmentTime('');
    }
  }, [availableTimeSlots, appointmentTime]);

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phoneNumber)) return;
    if (!customerName.trim() || !vehicle.trim()) return;

    if (!inquiryId) {
      setInquiryId(generateInquiryId());
    }
    setStep('review');
  };

  const handleConfirmAndLaunchWhatsApp = () => {
    const id = inquiryId || generateInquiryId();
    const payload: CustomerInquiry = {
      id,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      vehicle: vehicle.trim(),
      serviceRequired,
      preferredDropOff,
      appointmentDate: appointmentDate || undefined,
      appointmentTime: appointmentTime || undefined,
      status: 'WHATSAPP_LAUNCHED',
      generatedMessage: generateWhatsAppMessage({
        customerName,
        phoneNumber,
        vehicle,
        serviceRequired,
        preferredDropOff,
        appointmentDate,
        appointmentTime,
      }),
    };

    // 1. Save to local storage for tracking
    saveInquiryToStorage(payload);

    // 2. Dispatch to backend/webhook stub
    dispatchInquiryToBackend(payload);

    // 3. Launch WhatsApp in new tab
    const url = buildWhatsAppUrl(payload.generatedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');

    setStep('confirmed');
  };

  const handleCopyMessage = async () => {
    const message = generateWhatsAppMessage({
      customerName,
      phoneNumber,
      vehicle,
      serviceRequired,
      preferredDropOff,
      appointmentDate,
      appointmentTime,
    });
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
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
            className="relative w-full max-w-xl bg-[#121418] border border-[#272B35] rounded-[32px] sm:rounded-[40px] text-[#D7E2EA] shadow-2xl z-10 my-6 max-h-[94vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-7 border-b border-[#272B35] bg-[#15171F] flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    Calgary Premium Auto Detailing
                  </span>
                  <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                    Padil · Mangaluru
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">
                  {step === 'form' && 'Book Detailing Appointment'}
                  {step === 'review' && 'Review Appointment Request'}
                  {step === 'confirmed' && 'Appointment Request Sent'}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {step === 'form' && (
                <form onSubmit={handleProceedToReview} className="space-y-5">
                  {/* Field 1: Customer Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      1. Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Shetty"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0B0E] border border-[#272B35] text-white text-sm focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Field 2: Phone Number */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      2. Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 97456 03303"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (phoneError) setPhoneError('');
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-[#0A0B0E] border text-white text-sm focus:outline-none transition-colors placeholder:text-slate-600 ${
                        phoneError ? 'border-red-500' : 'border-[#272B35] focus:border-slate-400'
                      }`}
                    />
                    {phoneError && (
                      <span className="text-[11px] text-red-400 mt-1 block">{phoneError}</span>
                    )}
                  </div>

                  {/* Field 3: Vehicle Name/Model */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      3. Vehicle Name / Model *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyundai Creta, Toyota Fortuner, Honda City"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0B0E] border border-[#272B35] text-white text-sm focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Field 4: Service Required */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                      4. Service Required *
                    </label>
                    <select
                      value={serviceRequired}
                      onChange={(e) => setServiceRequired(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0B0E] border border-[#272B35] text-white text-sm focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
                    >
                      {CALGARY_SERVICES.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field 5: Preferred Drop-off Type */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                      5. Preferred Drop-off Type *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DROP_OFF_OPTIONS.map((opt) => {
                        const isSelected = preferredDropOff === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPreferredDropOff(opt)}
                            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between text-xs ${
                              isSelected
                                ? 'bg-[#181B24] border-emerald-500/70 text-white font-medium shadow-md'
                                : 'bg-[#0A0B0E] border-[#272B35] text-slate-400 hover:text-white'
                            }`}
                          >
                            <span>{opt}</span>
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                                isSelected
                                  ? 'bg-emerald-500 border-emerald-500 text-black'
                                  : 'border-slate-600 bg-transparent'
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Appointment Date and Time Selection Section */}
                  <div className="pt-4 border-t border-[#272B35] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 font-semibold">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>Requested Appointment Schedule</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {isSunday ? 'Sunday Hours (10 AM–4 PM)' : 'Mon–Sat (9 AM–7:30 PM)'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Date Picker */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                          Appointment Date
                        </label>
                        <input
                          type="date"
                          min={todayStr}
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0B0E] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
                        />
                      </div>

                      {/* Precise Time Picker */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-medium">
                          Preferred Time (Exact Minutes)
                        </label>
                        <select
                          disabled={!appointmentDate}
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0A0B0E] border text-white text-xs sm:text-sm focus:outline-none transition-colors ${
                            !appointmentDate
                              ? 'border-[#272B35] opacity-50 cursor-not-allowed'
                              : 'border-[#272B35] focus:border-slate-400 cursor-pointer'
                          }`}
                        >
                          <option value="">
                            {!appointmentDate
                              ? 'Select date first'
                              : availableTimeSlots.length === 0
                              ? 'No slots remaining today'
                              : 'Choose appointment time'}
                          </option>
                          {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Live Availability Confirmation Notice */}
                    <div className="p-3 rounded-xl bg-[#0A0B0E] border border-[#272B35] text-[11px] text-slate-400 flex items-start gap-2.5 leading-relaxed">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-300">Subject to Studio Confirmation:</strong> Requested appointment date and time are checked against bay availability. Calgary will verify schedule and confirm your appointment via WhatsApp or telephone call.
                      </span>
                    </div>
                  </div>

                  {/* Form Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-lg active:scale-98"
                    >
                      <span>CONTINUE TO REVIEW</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {step === 'review' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#0A0B0E] border border-[#272B35] space-y-3">
                    <div className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold border-b border-[#272B35] pb-2">
                      Summary of Your Request
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Customer Name:</span>
                        <span className="text-white font-medium">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone Number:</span>
                        <span className="text-white font-medium">{phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vehicle:</span>
                        <span className="text-white font-medium">{vehicle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Service Required:</span>
                        <span className="text-white font-medium">{serviceRequired}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Preferred Drop-off:</span>
                        <span className="text-white font-medium">{preferredDropOff}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5">
                        <span className="text-slate-400">Requested Schedule:</span>
                        <span className="text-emerald-400 font-medium">
                          {appointmentDate && appointmentTime
                            ? `${appointmentDate} at ${appointmentTime}`
                            : appointmentDate
                            ? appointmentDate
                            : 'To be coordinated with studio'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Generated WhatsApp Message Preview */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="uppercase tracking-wider font-medium">WhatsApp Message Payload</span>
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-1 text-[11px] text-[#BBCCD7] hover:text-white transition-colors cursor-pointer"
                      >
                        {copied ? (
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

                    <div className="p-3.5 rounded-xl bg-[#0A0B0E] border border-[#272B35] font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                      {generateWhatsAppMessage({
                        customerName,
                        phoneNumber,
                        vehicle,
                        serviceRequired,
                        preferredDropOff,
                        appointmentDate,
                        appointmentTime,
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      Back to Edit
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmAndLaunchWhatsApp}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>SEND REQUEST VIA WHATSAPP</span>
                    </button>
                  </div>
                </div>
              )}

              {step === 'confirmed' && (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white">Opening WhatsApp Chat...</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                    Your appointment request has been prepared and opened in WhatsApp. Simply tap &ldquo;Send&rdquo; in WhatsApp to dispatch your vehicle details to our Padil studio team for bay schedule verification.
                  </p>

                  <div className="p-4 rounded-xl bg-[#0A0B0E] border border-[#272B35] text-xs text-slate-400 space-y-1">
                    <div className="font-semibold text-slate-200">Confirmation Protocol:</div>
                    <p>
                      Because bay slots are scheduled to preserve unhurried craftsmanship, Calgary will review your requested time and reply on WhatsApp to confirm your slot.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                    <a
                      href={getPhoneCallUrl()}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs uppercase tracking-wider font-medium hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Studio Direct</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetAndClose}
                      className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="p-4 bg-[#0A0B0E] border-t border-[#272B35] flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Padil, Mangaluru · Mon–Sat 9:00 AM – 7:30 PM</span>
              </span>
              <button
                type="button"
                onClick={() => onOpenLegal?.('privacy')}
                className="text-[#BBCCD7] hover:text-white underline cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
