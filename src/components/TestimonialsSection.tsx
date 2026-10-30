import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { FadeIn } from './FadeIn';

export interface TestimonialItem {
  id: string;
  name: string;
  vehicle: string;
  service: string;
  location: string;
  rating: number;
  quote: string;
  date: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Praveen Shenoy',
    vehicle: 'BMW 3 Series Gran Limousine',
    service: '5-Year Ceramic Shield',
    location: 'Mangaluru',
    rating: 5,
    quote:
      'Living near the coastal belt means salt air and industrial fallout degrade clear coats fast. The Calgary team executed an extraordinary paint correction before applying the ceramic layer. Six months in, water still beads instantly and the optical depth looks like delivery day.',
    date: 'Verified Client',
  },
  {
    id: 't2',
    name: 'Dr. Rohan Alva',
    vehicle: 'Mercedes-Benz GLC 300',
    service: 'Multi-Stage Paint Correction',
    location: 'Kadri, Mangaluru',
    rating: 5,
    quote:
      'My GLC had heavy micro-swirls and wash marring from apartment washing. Calgary removed over 90% of paint defects without compromising clear coat thickness. The specular reflection under direct sunlight is flawless. True precision craft.',
    date: 'Verified Client',
  },
  {
    id: 't3',
    name: 'Naveen D’Souza',
    vehicle: 'Toyota Fortuner 4x4',
    service: 'Deep Interior Detailing',
    location: 'Padil, Mangaluru',
    rating: 5,
    quote:
      'After heavy coastal monsoon driving, the interior needed intensive sanitization. Their steam extraction and leather treatment restored the matte, non-greasy factory feel without artificial perfumes. The cleanest cabin I have experienced.',
    date: 'Verified Client',
  },
  {
    id: 't4',
    name: 'Vikram Hegde',
    vehicle: 'Audi A6 45 TFSI',
    service: 'Hydrophobic Glass & Body Shield',
    location: 'Bejai, Mangaluru',
    rating: 5,
    quote:
      'The water dispersion on the windshield during coastal downpours is remarkable. You rarely need wipers at highway speeds. Calgary’s methodical approach to wheel barrels, calipers, and door jambs sets a very high benchmark in Mangaluru.',
    date: 'Verified Client',
  },
  {
    id: 't5',
    name: 'Karthik Rao',
    vehicle: 'Hyundai Ioniq 5',
    service: 'New Car Protection Protocol',
    location: 'Mangaluru',
    rating: 5,
    quote:
      'Brought my new EV straight from the showroom to Calgary in Padil. The difference between factory finish and their post-prep gloss was night and day. Clear communication throughout and a solid post-care schedule provided upon delivery.',
    date: 'Verified Client',
  },
  {
    id: 't6',
    name: 'Ashwin Pai',
    vehicle: 'Skoda Octavia vRS',
    service: 'Paint Polish & Wheel Detail',
    location: 'Mangaluru',
    rating: 5,
    quote:
      'Finding detailers who truly understand dual-action polishers, paint hardness variations, and high-CRI inspection lamps is rare. Calgary takes zero shortcuts. If you care about your vehicle’s finish, this is the only studio in town.',
    date: 'Verified Client',
  },
];

interface TestimonialsSectionProps {
  onOpenBooking?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="testimonials"
      className="bg-[#0C0C0C] py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-10 relative overflow-hidden border-t border-[#272B35]/30"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-slate-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn delay={0} y={30} duration={0.8} className="w-full text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] font-semibold mb-3">
            <span>Client Experiences</span>
            <span aria-hidden="true">·</span>
            <span>Padil Studio</span>
          </div>

          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 120px)' }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-center text-white"
          >
            WHAT OUR CLIENTS SAY
          </h2>

          <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            Authentic reflections from vehicle owners across Mangaluru who trust Calgary for precision automotive care
          </p>
        </FadeIn>

        {/* Sleek Minimalist Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {TESTIMONIALS.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.08}
              y={25}
              duration={0.65}
              className="flex"
            >
              <div className="group relative flex flex-col justify-between w-full rounded-[28px] sm:rounded-[32px] bg-[#121418] border border-white/10 hover:border-[#D7E2EA]/30 p-6 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-[#15181F]">
                <div>
                  {/* Top Header: Star rating & Quote icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 text-amber-400 fill-amber-400 stroke-amber-400"
                        />
                      ))}
                    </div>

                    <Quote className="w-6 h-6 text-slate-600 group-hover:text-slate-400 transition-colors stroke-[1.5]" />
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer: Client Info & Metadata */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-400 font-normal mt-0.5">
                        {item.vehicle}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase tracking-wider shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Clean unboxed service tag & location */}
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#BBCCD7] font-medium mt-2 pt-2 border-t border-white/5">
                    <span>{item.service}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Minimalist Trust & Verification Bar */}
        <FadeIn delay={0.3} y={20} duration={0.7} className="mt-14 sm:mt-16">
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0F1116] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                  The Calgary Commitment
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#BBCCD7] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-medium">
                  Padil · Mangaluru
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
                Every vehicle undergoes rigorous multi-angle light bar audits before release. We stand behind every machine pass and coating application.
              </p>
            </div>

            {onOpenBooking && (
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-[#D7E2EA] hover:bg-white text-[#0C0C0C] font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md shrink-0 active:scale-95"
              >
                Schedule Vehicle Assessment
              </button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
