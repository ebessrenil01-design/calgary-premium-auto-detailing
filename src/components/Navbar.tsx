import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, MapPin, Clock, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessInfo';
import { getStoredInquiries } from '../services/inquiryAutomation';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTracker?: () => void;
  onOpenLegal?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenTracker, onOpenLegal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check saved inquiries count
    const checkCount = () => {
      const items = getStoredInquiries();
      setSavedCount(items.length);
    };
    checkCount();
    window.addEventListener('storage', checkCount);
    return () => window.removeEventListener('storage', checkCount);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
    { label: 'Work', id: 'work' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#272B35]/60 py-3 shadow-2xl opacity-100 pointer-events-auto'
            : 'bg-transparent py-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo & Studio City */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center sm:items-start text-left cursor-pointer group bg-transparent border-none p-0 focus:outline-none"
            aria-label="Calgary Premium Auto Detailing Homepage"
          >
            {/* Elegant Gold Mountain Outline Icon matching Reference */}
            <svg
              className="w-5 sm:w-6 h-2.5 text-[#C59B4E] mb-0.5 group-hover:scale-105 transition-transform"
              viewBox="0 0 26 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 11L9 2.5L14 8.5L18 4.5L24 11" />
            </svg>
            <span className="text-xl sm:text-2xl font-black uppercase tracking-[0.14em] text-white group-hover:text-neutral-200 transition-colors leading-none font-['Kanit',sans-serif]">
              CALGARY
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#C59B4E] font-medium mt-1">
              AUTO DETAILING
            </span>
          </button>

          {/* Desktop Nav Links matching Reference Image 1 */}
          <nav aria-label="Desktop Navigation" className="hidden lg:flex items-center gap-8">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative text-xs uppercase tracking-[0.16em] font-semibold text-white transition-colors cursor-pointer bg-transparent border-none p-0 py-1"
            >
              <span>HOME</span>
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C59B4E] rounded-full" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('services')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#C8D3DC] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 py-1"
            >
              SERVICES
            </button>

            <button
              type="button"
              onClick={() => scrollTo('services')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#C8D3DC] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 py-1"
            >
              PACKAGES
            </button>

            <button
              type="button"
              onClick={() => scrollTo('gallery')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#C8D3DC] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 py-1"
            >
              GALLERY
            </button>

            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#C8D3DC] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 py-1"
            >
              ABOUT
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#C8D3DC] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 py-1"
            >
              CONTACT
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {onOpenTracker && savedCount > 0 && (
              <button
                type="button"
                onClick={onOpenTracker}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-500/20 transition-all cursor-pointer"
                title="View your saved inquiries"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>My Inquiries ({savedCount})</span>
              </button>
            )}

            <a
              href={BUSINESS_CONFIG.location.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-colors"
              title="Locate Studio in Padil, Mangaluru"
            >
              <MapPin className="w-4 h-4" />
            </a>

            {/* Reference Design: Gold Outlined "BOOK NOW →" */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full border border-[#C59B4E] hover:border-[#E2AC4B] hover:bg-[#C59B4E]/10 active:scale-95 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-md"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B4E] stroke-[2.2]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            {onOpenTracker && savedCount > 0 && (
              <button
                type="button"
                onClick={onOpenTracker}
                className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
              >
                ({savedCount}) Inquiries
              </button>
            )}

            <button
              type="button"
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-semibold text-[11px] uppercase tracking-wider cursor-pointer"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#0C0C0C]/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="text-left text-xl font-bold uppercase tracking-wider text-white/90 hover:text-white py-2 border-b border-white/10"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="space-y-4 pt-8">
            {onOpenTracker && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTracker();
                }}
                className="w-full py-3 rounded-full border border-white/20 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>My Saved Inquiries ({savedCount})</span>
              </button>
            )}

            <div className="p-4 rounded-2xl bg-[#14161C] border border-white/10 text-xs text-slate-400 space-y-1">
              <div className="text-white font-medium flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Padil, Mangaluru, Karnataka 575007</span>
              </div>
              <p>Mon – Sat: 9:00 AM – 7:30 PM</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-[#D7E2EA] text-[#0C0C0C] font-bold text-xs uppercase tracking-widest text-center shadow-lg"
            >
              Book Detailing Enquiry
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-wider text-slate-500 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLegal?.('privacy');
                }}
                className="hover:text-white transition-colors"
              >
                Privacy
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLegal?.('terms');
                }}
                className="hover:text-white transition-colors"
              >
                Terms
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLegal?.('serviceBooking');
                }}
                className="hover:text-white transition-colors"
              >
                Refunds
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
