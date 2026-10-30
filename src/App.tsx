import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection, type DetailingShowcase } from './components/ProjectsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { ContactModal } from './components/ContactModal';
import { ProjectModal } from './components/ProjectModal';
import { InquiryTrackerModal } from './components/InquiryTrackerModal';
import { LegalCenterModal } from './components/legal/LegalCenterModal';
import { StoragePreferencesModal } from './components/legal/StoragePreferencesModal';
import { BUSINESS_CONFIG, getPhoneCallUrl } from './config/businessInfo';
import { ArrowUp, Instagram, MapPin, Phone, Clock, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedShowcase, setSelectedShowcase] = useState<DetailingShowcase | null>(null);
  const [preselectedService, setPreselectedService] = useState('Ceramic Coating');
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState('privacy');
  const [isStorageSettingsOpen, setIsStorageSettingsOpen] = useState(false);

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedService(serviceName);
    }
    setIsBookingOpen(true);
  };

  const handleOpenTracker = () => {
    setIsTrackerOpen(true);
  };

  const handleOpenLegal = (tab: string = 'privacy') => {
    setActiveLegalTab(tab);
    setIsLegalOpen(true);
  };

  const handleOpenStorageSettings = () => {
    setIsStorageSettingsOpen(true);
  };

  useEffect(() => {
    const checkHash = () => {
      const raw = window.location.hash.replace('#', '');
      const valid = ['privacy', 'cookies', 'terms', 'serviceBooking', 'disclaimer', 'grievance', 'refunds'];
      if (valid.includes(raw)) {
        const target = raw === 'refunds' ? 'serviceBooking' : raw;
        setActiveLegalTab(target);
        setIsLegalOpen(true);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{ overflowX: 'clip' }}
      className="bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] min-h-screen selection:bg-slate-500/30 selection:text-white relative"
    >
      {/* PERSISTENT SLEEK NAVBAR */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={handleOpenTracker}
        onOpenLegal={handleOpenLegal}
      />

      <main className="w-full">
        {/* 1. HERO SECTION */}
        <HeroSection
          onOpenBooking={(service) => handleOpenBooking(service)}
          onOpenTracker={handleOpenTracker}
        />

        {/* 2. MARQUEE STRIP */}
        <MarqueeSection />

        {/* 3. ABOUT SECTION - THE CALGARY STANDARD */}
        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        {/* 4. OUR PROCESS SECTION - THREE-STAGE METHODOLOGY */}
        <ProcessSection />

        {/* 5. SERVICES SECTION - CONTRASTING WHITE ARCHITECTURAL BLOCK */}
        <ServicesSection onSelectService={(service) => handleOpenBooking(service)} />

        {/* 6. PROJECTS SECTION - THE DETAILING EXPERIENCE CARDS */}
        <ProjectsSection onExploreShowcase={(showcase) => setSelectedShowcase(showcase)} />

        {/* 7. GALLERY SECTION - THE ART OF DETAILING */}
        <GallerySection />

        {/* 8. TESTIMONIALS SECTION - CLIENT FEEDBACK GRID */}
        <TestimonialsSection onOpenBooking={() => handleOpenBooking()} />

        {/* 9. FAQ SECTION - COMMON QUESTIONS & LOCAL CLIMATE ADVICE */}
        <FaqSection />

        {/* 10. CONTACT & DIRECT ENQUIRY SECTION */}
        <ContactSection
          onOpenBookingModal={(service) => handleOpenBooking(service)}
          onOpenTracker={handleOpenTracker}
          onOpenLegal={handleOpenLegal}
        />
      </main>

      {/* COMPREHENSIVE PRODUCTION FOOTER */}
      <footer className="w-full bg-[#08080A] border-t border-[#272B35]/50 pt-16 pb-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top Footer Row: 4-Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#272B35]/40 text-xs">
            {/* Column 1: Studio Identity & Transparency */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black uppercase tracking-wider text-white">
                  CALGARY
                </span>
                <span className="text-[10px] tracking-widest font-semibold px-2 py-0.5 rounded-full bg-white/10 text-[#BBCCD7] uppercase">
                  Padil · Mangaluru
                </span>
              </div>
              <p className="text-slate-400 font-light leading-relaxed">
                Calgary Premium Auto Detailing provides precision automotive care in Padil, Mangaluru. Specializing in contactless foam washing, multi-stage machine paint correction, deep cabin hygiene, and hydrophobic ceramic coatings tailored to coastal Karnataka conditions.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleOpenTracker}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#BBCCD7] hover:text-white hover:bg-white/10 text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer w-fit"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Track My Inquiries</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenStorageSettings}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer w-fit"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Storage &amp; Cookie Settings</span>
                </button>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider block">
                Studio Navigation
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Studio
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Detailing Services
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-white transition-colors">
                    3-Stage Methodology
                  </a>
                </li>
                <li>
                  <a href="#work" className="hover:text-white transition-colors">
                    Experience Showcases
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white transition-colors">
                    Studio Gallery
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white transition-colors">
                    Customer Reviews
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact &amp; Location
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal, Privacy & Policies */}
            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider block">
                Legal &amp; Transparency
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('privacy')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy (DPDP Act 2023)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('terms')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('serviceBooking')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Booking, Cancellation &amp; Refunds
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('cookies')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Cookie &amp; Data Storage Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('disclaimer')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Service Estimate Disclaimer
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('grievance')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Privacy Requests &amp; Grievance
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleOpenStorageSettings}
                    className="hover:text-white transition-colors cursor-pointer text-left text-emerald-400/90 font-medium"
                  >
                    Manage Storage Preferences
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Studio Location & Hours */}
            <div className="space-y-2">
              <span className="font-semibold text-white uppercase tracking-wider block">
                Studio Location &amp; Hours
              </span>
              <div className="space-y-1 text-slate-400">
                <p className="text-slate-200">{BUSINESS_CONFIG.location.displayAddress}</p>
                <p className="text-[11px] text-slate-500">Near Padil Junction, Bypass Road</p>
                <p className="pt-1">Mon – Sat: 9:00 AM – 7:30 PM</p>
                <p>Sunday: By Appointment</p>
                <div className="pt-2 space-y-1.5">
                  <a
                    href={BUSINESS_CONFIG.location.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#BBCCD7] hover:text-white transition-colors uppercase font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <p className="text-[10px] text-slate-500 pt-1">
                    Direct Studio Line: {BUSINESS_CONFIG.contact.displayPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Row: Copyright & Legal Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs uppercase tracking-wider text-slate-500">
            <div className="text-center sm:text-left">
              <span className="font-semibold text-slate-300">
                {BUSINESS_CONFIG.name}
              </span>
              <span className="mx-2">·</span>
              <span>Padil, Mangaluru, Karnataka 575007</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => handleOpenLegal('privacy')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy
              </button>

              <button
                type="button"
                onClick={() => handleOpenLegal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms
              </button>

              <button
                type="button"
                onClick={() => handleOpenLegal('serviceBooking')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Refunds
              </button>

              <button
                type="button"
                onClick={handleOpenStorageSettings}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Storage
              </button>

              <a
                href={BUSINESS_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>

              <a
                href={BUSINESS_CONFIG.social.justdial}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Justdial</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                aria-label="Scroll to top of page"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ADAPTIVE MULTI-STEP INQUIRY MODAL */}
      <ContactModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={preselectedService}
        onOpenLegal={handleOpenLegal}
      />

      {/* SHOWCASE PROJECT MODAL */}
      <ProjectModal
        showcase={selectedShowcase}
        isOpen={!!selectedShowcase}
        onClose={() => setSelectedShowcase(null)}
        onOpenBooking={(serviceName) => {
          setSelectedShowcase(null);
          handleOpenBooking(serviceName);
        }}
      />

      {/* INQUIRY TRACKER & HISTORY MODAL */}
      <InquiryTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        onOpenNewBooking={() => handleOpenBooking()}
      />

      {/* COMPREHENSIVE LEGAL & PRIVACY CENTER MODAL */}
      <LegalCenterModal
        isOpen={isLegalOpen}
        onClose={() => {
          setIsLegalOpen(false);
          // Clear hash on close if it was a legal anchor
          if (['privacy', 'cookies', 'terms', 'serviceBooking', 'disclaimer', 'grievance', 'refunds'].includes(window.location.hash.replace('#', ''))) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        initialTab={activeLegalTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenStorageSettings={handleOpenStorageSettings}
      />

      {/* STORAGE & COOKIE PREFERENCES MODAL */}
      <StoragePreferencesModal
        isOpen={isStorageSettingsOpen}
        onClose={() => setIsStorageSettingsOpen(false)}
        onOpenTracker={handleOpenTracker}
        onOpenLegal={handleOpenLegal}
      />
    </div>
  );
}
