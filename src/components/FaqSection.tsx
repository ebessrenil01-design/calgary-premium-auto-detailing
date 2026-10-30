import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FaqItem[] = [
  {
    tag: 'Ceramic Coating',
    question: "How does ceramic coating protect cars against Mangaluru's coastal climate?",
    answer:
      "Mangaluru's coastal environment exposes vehicles to high humidity, marine salt spray, intense UV radiation, and heavy monsoonal rain that cause clearcoat oxidation, water spot etching, and accelerated surface degradation. Our semi-permanent 9H nano-ceramic coating creates a hydrophobic SiO2 barrier with high water contact angles (>110°). Road grime, salty moisture, and mineral stains bead and roll off, protecting factory clearcoat and maintaining deep optical gloss.",
  },
  {
    tag: 'Paint Protection Film',
    question: 'What is the difference between Paint Protection Film (PPF) and Ceramic Coating?',
    answer:
      'Paint Protection Film (PPF) is an optical-grade thermoplastic polyurethane (TPU) film installed directly onto painted panels to provide a physical armor against highway gravel, stone chips, bug splatter, and minor abrasive scrapes. It features heat-activated self-healing properties where fine micro-marring disappears under sunlight. Ceramic coating, by contrast, is a liquid nano-ceramic polymer that bonds with clearcoat to provide extreme gloss, UV defense, and chemical ease of cleaning, but does not provide thick physical stone-chip barrier protection. Many owners combine both: PPF on high-impact zones (bumper, hood, mirrors) with Ceramic Coating across the entire vehicle.',
  },
  {
    tag: 'Paint Correction',
    question: "Can machine polishing remove all scratches from my vehicle's paintwork?",
    answer:
      'Dual-action and rotary machine polishing safely eliminates 85% to 95% of clearcoat defects, including wash swirl marks, spiderweb scratches, buffer trails, towel marring, bird drop etching, and surface oxidation. However, deep scratches that have breached through the clear coat into the grey primer or bare metal (scratches catching your fingernail) cannot be polished out and require touch-up or panel refinishing. We measure clearcoat thickness with digital paint gauges before every pass to ensure clearcoat integrity is never compromised.',
  },
  {
    tag: 'Safe Washing',
    question: "What is the difference between a neighborhood car wash and Calgary's professional wash?",
    answer:
      'Conventional roadside washes frequently use harsh borewell water, recycled water, high-alkaline detergents, and contaminated washcloths that grind dirt particles into your clear coat, causing permanent swirl marks. Calgary uses a contactless pH-neutral snow foam soak, grit-guarded two-bucket hand washing, soft ultra-plush microfiber mitts, and dedicated acid-free wheel cleaners to lift contaminants safely without marring.',
  },
  {
    tag: 'Pricing Enquiries',
    question: 'How are detailing prices determined, and why do you offer bespoke assessments?',
    answer:
      "Professional detailing is directly tied to vehicle surface area, clear coat thickness, paint hardness, and current defect severity (swirl marks, bird dropping etching, contamination). Rather than imposing arbitrary flat fees that disadvantage well-kept cars, we provide transparent, bespoke quotes tailored to your vehicle segment and actual surface health. Walk-in paint depth evaluations at our Padil studio are always complimentary.",
  },
  {
    tag: 'Monthly Wash Perk',
    question: 'How does the free wash once every month work for PPF and Ceramic Coating packages?',
    answer:
      'Every customer who chooses a Ceramic Coating or Paint Protection Film (PPF) package receives 1 complimentary studio maintenance wash once every month. Performed in our dedicated Padil bay, our technicians use pH-neutral snow foam, two-bucket grit-guarded mitts, and ceramic-safe hydrophobic boosters to remove coastal salt spray and traffic film. This monthly touchpoint keeps your surface immaculate and preserves your warranty.',
  },
  {
    tag: 'Scheduling & Duration',
    question: 'How long does a detailing or ceramic coating appointment take?',
    answer:
      "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling. Because every car's clearcoat condition, contamination level, and interior requirements are unique, our technicians allocate dedicated time to ensure swirl-free correction, proper chemical dwell, and complete cleanroom curing without rushing.",
  },
  {
    tag: 'Interior Care',
    question: 'What is included in Deep Interior Detailing and does it eliminate cabin odors?',
    answer:
      'Our deep interior detailing treats all cabin surfaces: high-power vacuuming, hot-water / steam upholstery extraction for fabric seats and floor carpets, gentle pH-balanced cleaning and UV conditioning for genuine leather and leatherette, AC evaporator vent steam sanitization, and germ-free deodorization. It effectively removes embedded dirt, coffee stains, coastal moisture dampness, and food odors.',
  },
  {
    tag: 'Location & Booking',
    question: 'Where is your studio located in Mangaluru and do I need to book in advance?',
    answer:
      'Our dedicated detailing studio is situated in Padil, Mangaluru, Karnataka 575007 (near Padil Junction, Bypass Road). To ensure uncompromised craftsmanship, we limit the number of vehicles admitted each day. We strongly recommend scheduling via our WhatsApp inquiry system or phone (+91 97456 03303) prior to dropping off your vehicle. Walk-in paint inspection consultations are always complimentary.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#0C0C0C] py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-10 border-t border-[#272B35]/30 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-slate-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Clarity & Standards</span>
          </div>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          >
            FREQUENTLY ASKED
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 mt-4 max-w-xl mx-auto font-light">
            Answers to common questions about auto detailing, custom quotes, ceramic coatings, PPF, and monthly maintenance in Mangaluru
          </p>
        </FadeIn>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <FadeIn
                key={index}
                delay={index * 0.08}
                y={20}
                duration={0.6}
                className="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#272B35] bg-[#14161C] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 font-medium">
                      {faq.tag}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold uppercase text-white tracking-wide pt-1">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white/15 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-[#272B35]/40 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            );
          })}
        </div>

        {/* Quality assurance guarantee note */}
        <div className="mt-12 p-5 rounded-2xl bg-[#0C0C0C] border border-[#272B35]/60 flex items-center gap-3.5 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            Have a specific concern about swirl marks, water stains, or leather repair? Bring your car to our Padil bay for an honest, complimentary assessment.
          </span>
        </div>
      </div>
    </section>
  );
};
