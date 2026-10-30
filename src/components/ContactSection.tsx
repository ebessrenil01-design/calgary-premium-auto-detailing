import React, { useState, useMemo } from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { BUSINESS_CONFIG, getPhoneCallUrl } from '../config/businessInfo';
import {
  CALGARY_SERVICES,
  DROP_OFF_OPTIONS,
  generateWhatsAppMessage,
  buildWhatsAppUrl,
  saveInquiryToStorage,
  generateInquiryId,
  type DropOffOption,
  type CustomerInquiry,
} from '../services/inquiryAutomation';
import {
  MessageSquare,
  Instagram,
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface ContactSectionProps {
  onOpenBookingModal: (preselectedService?: string) => void;
  onOpenTracker?: () => void;
  onOpenLegal?: (tab: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenBookingModal,
  onOpenTracker,
  onOpenLegal,
}) => {
  // 1. Customer Name
  const [customerName, setCustomerName] = useState('');
  // 2. Phone Number
  const [phoneNumber, setPhoneNumber] = useState('');
  // 3. Vehicle Name/Model
  const [vehicle, setVehicle] = useState('');
  // 4. Service Required
  const [serviceRequired, setServiceRequired] = useState<string>(CALGARY_SERVICES[2]);
  // 5. Preferred Drop-off Type
  const [preferredDropOff, setPreferredDropOff] = useState<DropOffOption>(DROP_OFF_OPTIONS[0]);

  // Appointment Scheduling
  const todayStr = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const isSunday = useMemo(() => {
    if (!appointmentDate) return false;
    const parts = appointmentDate.split('-');
    if (parts.length === 3) {
      const dateObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      return dateObj.getDay() === 0;
    }
    return false;
  }, [appointmentDate]);

  const availableTimeSlots = useMemo(() => {
    if (!appointmentDate) return [];
    const startHour = isSunday ? 10 : 9;
    const endHour = isSunday ? 15 : 19;
    const endMinuteMax = isSunday ? 45 : 0;

    const slots: string[] = [];
    for (let h = startHour; h <= endHour; h++) {
      for (const m of [0, 15, 30, 45]) {
        if (h === endHour && m > endMinuteMax) continue;
        const period = h >= 12 ? 'PM' : 'AM';
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        const displayMinute = String(m).padStart(2, '0');
        const formatted = `${String(displayHour).padStart(2, '0')}:${displayMinute} ${period}`;

        if (appointmentDate === todayStr) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinute = now.getMinutes();
          if (h < currentHour || (h === currentHour && m <= currentMinute + 30)) {
            continue;
          }
        }
        slots.push(formatted);
      }
    }
    return slots;
  }, [appointmentDate, isSunday, todayStr]);

  const handleDirectWhatsApp = () => {
    const payload: CustomerInquiry = {
      id: generateInquiryId(),
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

    saveInquiryToStorage(payload);
    const url = buildWhatsAppUrl(payload.generatedMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] py-24 sm:py-32 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-[#272B35]/30"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-slate-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Section Heading: "READY FOR A BETTER FINISH?" */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center">
          <span className="text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-3 block">
            Studio In Padil, Mangaluru · Detailing Specialists
          </span>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 130px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            READY FOR A BETTER FINISH?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#D7E2EA] font-light uppercase tracking-wide mt-6 max-w-xl mx-auto">
            Connect directly with our team for consultations, custom treatment quotes, and studio bookings.
          </p>
        </FadeIn>

        {/* Dedicated 5-Field Customer Enquiry & Appointment Form */}
        <FadeIn delay={0.2} y={20} duration={0.7} className="w-full max-w-2xl mt-10">
          <div className="p-6 sm:p-8 rounded-[36px] bg-[#14161C] border border-[#272B35] shadow-2xl text-left">
            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-[#272B35]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#BBCCD7] font-semibold">
                    Studio Appointment Request
                  </span>
                  <h3 className="text-base sm:text-lg font-bold uppercase text-white">
                    Direct Booking Enquiry
                  </h3>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Padil Bay</span>
              </span>
            </div>

            {/* 1. Customer Name & 2. Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  1. Customer Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Shetty"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  2. Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 97456 03303"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* 3. Vehicle Name/Model & 4. Service Required */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  3. Vehicle Name / Model *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyundai Creta, Honda City"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                  4. Service Required *
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
                >
                  {CALGARY_SERVICES.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Preferred Drop-off Type */}
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                5. Preferred Drop-off Type *
              </label>
              <select
                value={preferredDropOff}
                onChange={(e) => setPreferredDropOff(e.target.value as DropOffOption)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
              >
                {DROP_OFF_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date and Time Selection */}
            <div className="pt-4 border-t border-[#272B35] mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Requested Appointment Date &amp; Time</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {isSunday ? 'Sun: 10 AM–4 PM' : 'Mon–Sat: 9 AM–7:30 PM'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border border-[#272B35] text-white text-xs sm:text-sm focus:outline-none focus:border-slate-400 transition-colors cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1">
                    Time (Exact Minutes)
                  </label>
                  <select
                    disabled={!appointmentDate}
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0C0C0C] border text-white text-xs sm:text-sm focus:outline-none transition-colors ${
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
                        : 'Choose precise time'}
                    </option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-[#0C0C0C] border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Date &amp; time requests are checked against studio bay capacity and confirmed by Calgary via WhatsApp or phone call.
                </span>
              </div>
            </div>

            {/* Submit & WhatsApp Trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#272B35]">
              <span className="text-[11px] text-slate-400 font-light text-center sm:text-left">
                Communication subject to WhatsApp LLC terms ·{' '}
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('privacy')}
                  className="text-[#BBCCD7] underline hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </button>
              </span>
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-lg active:scale-95 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>REQUEST APPOINTMENT ON WHATSAPP</span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Action Row: Primary Modal, Call Us, and Directions */}
        <FadeIn delay={0.35} y={20} duration={0.7} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ContactButton
            onClick={() => onOpenBookingModal(serviceRequired)}
            label="OPEN APPOINTMENT BOOKING WIZARD"
            className="text-xs sm:text-sm px-8 py-3.5"
          />

          <a
            href={getPhoneCallUrl()}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white text-white font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm hover:bg-white/5 transition-all duration-200 cursor-pointer active:scale-95"
            title={`Call Calgary Detailing Studio at ${BUSINESS_CONFIG.contact.displayPhone}`}
          >
            <Phone className="w-4 h-4 text-slate-400" />
            <span>CALL: {BUSINESS_CONFIG.contact.displayPhone}</span>
          </a>

          {onOpenTracker && (
            <button
              type="button"
              onClick={onOpenTracker}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white text-white font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm hover:bg-white/5 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>MY SAVED INQUIRIES</span>
            </button>
          )}

          <a
            href={BUSINESS_CONFIG.location.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 hover:border-white text-white font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm hover:bg-white/5 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Navigation className="w-4 h-4 text-slate-400" />
            <span>GET DIRECTIONS</span>
          </a>
        </FadeIn>

        {/* Verified Business Information Grid */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left">
          {/* 1. Location Card with Google Maps action */}
          <div className="p-5 rounded-2xl bg-[#14161C] border border-[#272B35] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[#BBCCD7] text-xs uppercase tracking-wider font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Padil Studio</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-normal">Verified Location</span>
              </div>
              <p className="text-white text-sm font-medium">
                {BUSINESS_CONFIG.location.neighborhood}, {BUSINESS_CONFIG.location.city}
              </p>
              <p className="text-slate-400 text-xs mt-0.5 font-light">
                {BUSINESS_CONFIG.location.state}, India ({BUSINESS_CONFIG.location.pincode})
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                Near Padil Junction, Bypass Road
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-[11px] text-[#D7E2EA] hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* 2. Working Hours */}
          <div className="p-5 rounded-2xl bg-[#14161C] border border-[#272B35] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#BBCCD7] text-xs uppercase tracking-wider font-semibold mb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Studio Hours</span>
              </div>
              <p className="text-white text-sm font-medium">Mon – Sat: 9:00 AM – 7:30 PM</p>
              <p className="text-slate-400 text-xs mt-0.5 font-light">Sunday: By Prior Appointment</p>
            </div>
            <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Complimentary surface audits</span>
            </div>
          </div>

          {/* 3. Official Instagram Profile */}
          <div className="p-5 rounded-2xl bg-[#14161C] border border-[#272B35] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[#BBCCD7] text-xs uppercase tracking-wider font-semibold mb-2">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-slate-400" />
                  <span>Instagram</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-normal">Active Profile</span>
              </div>
              <a
                href={BUSINESS_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-medium hover:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <span>{BUSINESS_CONFIG.social.instagramHandle}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
              <p className="text-slate-400 text-xs mt-0.5 font-light">Padil, Mangaluru, Karnataka</p>
            </div>
            <a
              href={BUSINESS_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-[11px] text-[#D7E2EA] hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold"
            >
              <span>Follow Studio Stories</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
