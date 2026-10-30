import React from 'react';
import { Clock } from 'lucide-react';
import { getStoredInquiries } from '../services/inquiryAutomation';

interface HeroSectionProps {
  onOpenBooking: (serviceName?: string) => void;
  onOpenTracker?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenTracker }) => {
  const [savedCount, setSavedCount] = React.useState(0);

  React.useEffect(() => {
    const checkCount = () => {
      const items = getStoredInquiries();
      setSavedCount(items.length);
    };
    checkCount();
    window.addEventListener('storage', checkCount);
    return () => window.removeEventListener('storage', checkCount);
  }, []);

  const scrollTo = (id: string) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Calgary Premium Auto Detailing Hero Studio"
      className="relative w-full bg-[#07080A] text-white overflow-hidden select-none"
    >
      {/* =========================================================================
          HERO STUDIO: PIXEL-PERFECT REPLICA MATCHING REFERENCE IMAGE
          Rendered cleanly across all screen sizes without any artificial text layer on top.
          Includes fully functional interactive hotspots, hover feedback, accessibility,
          and direct integrations with booking flows.
         ========================================================================= */}
      <div className="relative w-full max-w-[1656px] mx-auto aspect-[1656/950] overflow-hidden">
        {/* Reference Visual Design */}
        <img
          src="/assets/aistudio/image_e892d2b0.png"
          alt="Calgary Premium Auto Detailing Studio Bay in Padil, Mangaluru - Detailing Done Right"
          className="w-full h-full object-cover pointer-events-none select-none"
          loading="eager"
          decoding="sync"
        />

        {/* Semantic SEO & Screen-Reader Accessibility Structure */}
        <div className="sr-only">
          <h1>Calgary Premium Auto Detailing — Car Detailing in Mangaluru</h1>
          <h2>Detailing Done Right · Premium Car Care. Impeccable Results.</h2>
          <p>
            Professional automotive detailing, 9H nano-ceramic coating, self-healing paint protection film (PPF), multi-stage machine paint correction, and interior sanitization in Padil, Mangaluru, Karnataka.
          </p>
          <h3>Exterior Detail</h3>
          <p>Deep clean, decontamination &amp; paint protection.</p>
          <h3>Interior Detail</h3>
          <p>Thorough cleaning for a fresh, like-new feel.</p>
          <h3>Ceramic Coating</h3>
          <p>Long-lasting protection with unmatched shine.</p>
          <h3>Wheel &amp; Tyre Care</h3>
          <p>Restore, protect and keep them looking sharp.</p>
          <p>Trusted by car enthusiasts in Mangaluru.</p>
        </div>

        {/* =========================================================================
            INTERACTIVE HOTSPOTS & HOVER FEEDBACK
           ========================================================================= */}

        {/* 1. Header Logo (Top-Left) */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Calgary Premium Auto Detailing Home"
          className="absolute left-[6.04%] top-[1.8%] w-[14.5%] h-[5.6%] cursor-pointer rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[#C59B4E]"
          title="Calgary Premium Auto Detailing"
        />

        {/* 2. Desktop Navigation Links */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Navigate to Home"
          className="absolute left-[29.59%] top-[3.2%] w-[3.5%] h-[3.8%] cursor-pointer rounded hover:bg-white/10 transition-colors focus:outline-none"
          title="Home"
        />
        <button
          type="button"
          onClick={() => scrollTo('services')}
          aria-label="Navigate to Services"
          className="absolute left-[35.0%] top-[3.2%] w-[5.0%] h-[3.8%] cursor-pointer rounded hover:bg-white/10 transition-colors focus:outline-none"
          title="Services"
        />
        <button
          type="button"
          onClick={() => scrollTo('services')}
          aria-label="Navigate to Packages"
          className="absolute left-[42.5%] top-[3.2%] w-[5.5%] h-[3.8%] cursor-pointer rounded hover:bg-white/10 transition-colors focus:outline-none"
          title="Packages"
        />
        <button
          type="button"
          onClick={() => scrollTo('gallery')}
          aria-label="Navigate to Gallery"
          className="absolute left-[50.8%] top-[3.2%] w-[4.8%] h-[3.8%] cursor-pointer rounded hover:bg-white/10 transition-colors focus:outline-none"
          title="Gallery"
        />
        <button
          type="button"
          onClick={() => scrollTo('about')}
          aria-label="Navigate to About"
          className="absolute left-[58.0%] top-[3.2%] w-[4.0%] h-[3.8%] cursor-pointer rounded hover:bg-white/10 transition-colors focus:outline-none"
          title="About"
        />
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          aria-label="Navigate to Contact"
          className="absolute left-[64.0%] top-[3.2%] w-[5.0%] h-[3.8%] cursor-pointer rounded hover:bg-white/10 transition-colors focus:outline-none"
          title="Contact"
        />

        {/* 3. Top-Right "BOOK NOW →" Button */}
        <button
          type="button"
          onClick={() => onOpenBooking()}
          aria-label="Book Detailing Appointment"
          className="absolute left-[82.6%] top-[3.2%] w-[11.6%] h-[5.2%] cursor-pointer rounded-full border border-transparent hover:border-[#C59B4E] hover:bg-[#C59B4E]/15 hover:shadow-[0_0_20px_rgba(197,155,78,0.4)] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C59B4E]"
          title="Book Your Detail"
        />

        {/* Saved Inquiries Chip (Float in Top Bar if inquiries exist) */}
        {savedCount > 0 && onOpenTracker && (
          <div className="absolute left-[72.0%] top-[3.4%] z-30">
            <button
              type="button"
              onClick={onOpenTracker}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-[#0A0C10]/90 backdrop-blur-md text-emerald-400 text-[11px] font-semibold uppercase tracking-wider hover:bg-emerald-500/20 transition-all cursor-pointer shadow-lg"
              title="View your saved inquiries"
            >
              <Clock className="w-3 h-3" />
              <span>Inquiries ({savedCount})</span>
            </button>
          </div>
        )}

        {/* 4. Center Gold Button: "VIEW PACKAGES →" */}
        <button
          type="button"
          onClick={() => scrollTo('services')}
          aria-label="View Detailing Packages"
          className="absolute left-[37.4%] top-[43.1%] w-[13.2%] h-[5.2%] cursor-pointer rounded-full hover:shadow-[0_0_25px_rgba(215,154,59,0.65)] hover:brightness-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          title="View Packages"
        />

        {/* 5. Center Dark Button: "BOOK NOW [calendar]" */}
        <button
          type="button"
          onClick={() => onOpenBooking()}
          aria-label="Book Now Appointment"
          className="absolute left-[51.4%] top-[43.1%] w-[11.5%] h-[5.2%] cursor-pointer rounded-full border border-transparent hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          title="Book Now"
        />

        {/* 6. Right Column Feature 1: "DETAILING & PROTECTION" */}
        <button
          type="button"
          onClick={() => onOpenBooking('Detailing & Protection')}
          aria-label="Explore Detailing & Protection"
          className="absolute left-[84.8%] top-[29.8%] w-[12.0%] h-[7.8%] cursor-pointer rounded-xl hover:bg-white/5 hover:border hover:border-[#C59B4E]/30 transition-all duration-200 text-left p-2 focus:outline-none"
          title="Detailing & Protection"
        />

        {/* 7. Right Column Feature 2: "INTERIOR + EXTERIOR CARE" */}
        <button
          type="button"
          onClick={() => onOpenBooking('Interior & Exterior Care')}
          aria-label="Explore Interior and Exterior Care"
          className="absolute left-[84.8%] top-[40.8%] w-[12.0%] h-[7.8%] cursor-pointer rounded-xl hover:bg-white/5 hover:border hover:border-[#C59B4E]/30 transition-all duration-200 text-left p-2 focus:outline-none"
          title="Interior + Exterior Care"
        />

        {/* 8. Right Column Feature 3: "BUILT AROUND YOUR VEHICLE" */}
        <button
          type="button"
          onClick={() => onOpenBooking('Bespoke Care')}
          aria-label="Explore Bespoke Vehicle Detailing"
          className="absolute left-[84.8%] top-[51.8%] w-[12.0%] h-[7.8%] cursor-pointer rounded-xl hover:bg-white/5 hover:border hover:border-[#C59B4E]/30 transition-all duration-200 text-left p-2 focus:outline-none"
          title="Built Around Your Vehicle"
        />

        {/* 9. Bottom 4-Column Service Strip Cards */}
        {/* Card 1: EXTERIOR DETAIL */}
        <button
          type="button"
          onClick={() => onOpenBooking('Exterior Detailing')}
          aria-label="Book Exterior Detail"
          className="absolute left-[7.0%] top-[84.8%] w-[21.5%] h-[10.8%] cursor-pointer rounded-2xl hover:bg-white/5 hover:shadow-[0_0_20px_rgba(197,155,78,0.25)] transition-all duration-200 focus:outline-none"
          title="Exterior Detail: Deep clean, decontamination & paint protection"
        />

        {/* Card 2: INTERIOR DETAIL */}
        <button
          type="button"
          onClick={() => onOpenBooking('Interior Detailing')}
          aria-label="Book Interior Detail"
          className="absolute left-[28.7%] top-[84.8%] w-[21.5%] h-[10.8%] cursor-pointer rounded-2xl hover:bg-white/5 hover:shadow-[0_0_20px_rgba(197,155,78,0.25)] transition-all duration-200 focus:outline-none"
          title="Interior Detail: Thorough cleaning for a fresh, like-new feel"
        />

        {/* Card 3: CERAMIC COATING */}
        <button
          type="button"
          onClick={() => onOpenBooking('Ceramic Coating')}
          aria-label="Book Ceramic Coating"
          className="absolute left-[50.2%] top-[84.8%] w-[21.5%] h-[10.8%] cursor-pointer rounded-2xl hover:bg-white/5 hover:shadow-[0_0_20px_rgba(197,155,78,0.25)] transition-all duration-200 focus:outline-none"
          title="Ceramic Coating: Long-lasting protection with unmatched shine"
        />

        {/* Card 4: WHEEL & TYRE CARE */}
        <button
          type="button"
          onClick={() => onOpenBooking('Wheel & Tyre Care')}
          aria-label="Book Wheel and Tyre Care"
          className="absolute left-[71.6%] top-[84.8%] w-[21.5%] h-[10.8%] cursor-pointer rounded-2xl hover:bg-white/5 hover:shadow-[0_0_20px_rgba(197,155,78,0.25)] transition-all duration-200 focus:outline-none"
          title="Wheel & Tyre Care: Restore, protect and keep them looking sharp"
        />
      </div>
    </section>
  );
};
