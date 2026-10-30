/**
 * Calgary Premium Auto Detailing - Business Configuration
 * Studio Location: Padil, Mangaluru, Karnataka, India (575007)
 *
 * This file serves as the single source of truth for business information,
 * verified contact details, service structures, pricing guidelines, and local geographic data.
 */

export interface DetailingCategory {
  id: string;
  categoryName: string;
  shortDescription: string;
  iconName: string;
  services: DetailingServiceItem[];
}

export interface DetailingServiceItem {
  id: string;
  name: string;
  shortTag: string;
  category: string;
  turnaroundTime: string;
  durationNotice?: string;
  quoteBasis: string;
  monthlyWashPerk?: boolean;
  monthlyWashPerkDescription?: string;
  summary: string;
  inclusions: string[];
  whoItsFor: string;
  realisticExpectations: string;
  popularAddons?: string[];
}

export const BUSINESS_CONFIG = {
  name: 'Calgary Premium Auto Detailing',
  shortName: 'Calgary Detailing',
  tagline: 'PREMIUM AUTOMOTIVE CARE. PRECISION IN EVERY DETAIL.',

  // VERIFIED: Physical studio location & maps
  location: {
    city: 'Mangaluru',
    neighborhood: 'Padil',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    country: 'India',
    pincode: '575007',
    landmark: 'Near Padil Junction, Bypass Road',
    displayAddress: 'Padil, Mangaluru, Karnataka 575007, India',
    geo: {
      latitude: 12.8688,
      longitude: 74.877,
    },
    googleMapsSearchUrl:
      'https://www.google.com/maps/search/?api=1&query=Calgary+Premium+Auto+Detailing+Padil+Mangaluru',
    googleMapsDirectionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Calgary+Premium+Auto+Detailing+Padil+Mangaluru',
  },

  // VERIFIED: Verified public profiles
  social: {
    instagram: 'https://www.instagram.com/calgary_mangalore/',
    instagramHandle: '@calgary_mangalore',
    justdial:
      'https://www.justdial.com/Mangalore/Calgary-Premium-Auto-Detailing/0824PX824-X824-181212174544-M8W7_BZDET',
  },

  /**
   * CONTACT DETAILS:
   * Confirmed business phone & WhatsApp number: +91 97456 03303
   */
  contact: {
    isVerifiedPhone: true,
    phoneRaw: '+919745603303',
    displayPhone: '+91 97456 03303',
    whatsappNumber: '919745603303', // Format: country code without '+' followed by digits
    email: 'calgary.mangalore@gmail.com',
    isVerifiedEmail: false,
  },

  hours: {
    weekdays: 'Monday – Saturday: 9:00 AM – 7:30 PM',
    sunday: 'Sunday: By Prior Appointment Only',
    displayHours: 'Monday – Saturday: 9:00 AM – 7:30 PM · Sunday by Appointment',
  },

  // Key neighborhoods and localities across Mangaluru for geographic routing
  mangaluruAreas: [
    'Padil (Studio Location)',
    'Kadri',
    'Bejai',
    'Kankanady',
    'Pumpwell',
    'Falnir',
    'Attavar',
    'Bunder / Car Street',
    'Mannagudda / Urwa',
    'Kodialbail / Lalbagh',
    'Surathkal / NITK',
    'Derlakatte / Medical Corridor',
    'Ullal / Someshwar',
    'Bantwal / BC Road',
    'Other Mangaluru / Dakshina Kannada',
  ],

  // Common popular vehicles in Mangaluru & Karnataka for quick 1-tap selection
  popularVehicles: [
    { label: 'Hyundai Creta', segment: 'Compact SUV / Crossover' },
    { label: 'Kia Seltos', segment: 'Compact SUV / Crossover' },
    { label: 'Mahindra XUV700', segment: 'Full-Size SUV / MPV' },
    { label: 'Toyota Innova Crysta / Hycross', segment: 'Full-Size SUV / MPV' },
    { label: 'Toyota Fortuner', segment: 'Full-Size SUV / MPV' },
    { label: 'Mahindra Thar / Scorpio-N', segment: 'Full-Size SUV / MPV' },
    { label: 'Tata Harrier / Safari', segment: 'Full-Size SUV / MPV' },
    { label: 'Honda City', segment: 'Sedan' },
    { label: 'Hyundai Verna', segment: 'Sedan' },
    { label: 'Skoda Slavia / Kushaq', segment: 'Sedan' },
    { label: 'Volkswagen Virtus / Taigun', segment: 'Sedan' },
    { label: 'BMW 3 Series / 5 Series', segment: 'Luxury / Exotic' },
    { label: 'Mercedes-Benz C-Class / GLC', segment: 'Luxury / Exotic' },
    { label: 'Audi A4 / A6 / Q5', segment: 'Luxury / Exotic' },
    { label: 'Swift / Baleno / i20', segment: 'Hatchback' },
  ],

  // Standard studio service duration notice
  serviceDurationNotice:
    "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",

  // 5 Core Automotive Detailing Services (Wash, PPF, Ceramic, Paint, Interior)
  serviceCategories: [
    {
      id: 'wash',
      categoryName: 'Exterior Foam Wash',
      shortDescription: 'Precision foam decontamination, wheel barrel care, and clearcoat-safe washing.',
      iconName: 'Sparkles',
      services: [
        {
          id: 'pro-foam-wash',
          name: 'Professional Snow Foam Wash & Decontamination',
          shortTag: 'Snow Foam Wash',
          category: 'Exterior Foam Wash',
          turnaroundTime: 'Condition & Scope Dependent',
          durationNotice:
            "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",
          quoteBasis: 'Custom quote based on vehicle size & surface condition',
          summary: 'Contactless pH-neutral snow foam soak, grit-guarded two-bucket hand wash, wheel barrel iron fallout removal, door jamb brush cleaning, and synthetic spray sealant.',
          inclusions: [
            'pH-neutral snow foam dwell to safely loosen road grime',
            'Two-bucket scratch-free wash with ultra-plush microfiber mitts',
            'Deep wheel barrel, face, and brake caliper iron decontamination',
            'Door jambs, boot shut, and fuel flap precision brush cleaning',
            'Streak-free exterior glass wipe and tire satin dressing',
          ],
          whoItsFor: 'Vehicle owners looking for regular safe maintenance washing without swirl-inducing abrasive cloths.',
          realisticExpectations: 'Safely removes accumulated dust, coastal salt film, and road grime without causing swirl marks.',
        },
      ],
    },
    {
      id: 'ppf',
      categoryName: 'Paint Protection Film (PPF)',
      shortDescription: 'Optical-grade TPU self-healing armor guarding against rock chips and road debris.',
      iconName: 'Shield',
      services: [
        {
          id: 'paint-protection-film',
          name: 'Self-Healing Paint Protection Film (PPF - TPU Armor)',
          shortTag: 'PPF TPU Armor',
          category: 'Paint Protection Film (PPF)',
          turnaroundTime: 'Condition & Scope Dependent',
          durationNotice:
            "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",
          monthlyWashPerk: true,
          monthlyWashPerkDescription: 'Includes 1 Complimentary Maintenance Wash Once Every Month',
          quoteBasis: 'Custom quote based on package (Front Clip, High-Impact, or Full Vehicle)',
          summary: 'Optical-grade thermoplastic polyurethane (TPU) self-healing film delivering impenetrable defense against highway stone chips, road debris, parking scratches, and UV damage.',
          inclusions: [
            '1 Free maintenance wash once every month to keep film pores clean and hydrophobic',
            'Pre-installation paint decontamination and single-stage finish leveling',
            'Precision computer-cut or custom wrapped-edge panel fitment for seamless invisible protection',
            'Heat-activated self-healing topcoat (light scratches vanish under sunlight or warm water)',
            'Ultra-hydrophobic stain-resistant top barrier with multi-year studio warranty',
          ],
          whoItsFor: 'Owners of new cars, high-mileage highway drivers, and premium SUVs & sedans wanting total physical defense against stone chips and scratch damage.',
          realisticExpectations: 'Provides the highest level of physical impact resistance against stone chips and road debris. Edges are wrapped cleanly for an invisible finish.',
        },
      ],
    },
    {
      id: 'ceramic',
      categoryName: 'Ceramic Coating',
      shortDescription: 'Semi-permanent 9H nano-ceramic SiO2 shielding against coastal salt air and monsoonal acid rain.',
      iconName: 'ShieldCheck',
      services: [
        {
          id: 'ceramic-coating',
          name: 'Nano-Ceramic Coating Protection (3-Year & 5-Year)',
          shortTag: 'Ceramic Coating',
          category: 'Ceramic Coating',
          turnaroundTime: 'Condition & Scope Dependent',
          durationNotice:
            "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",
          monthlyWashPerk: true,
          monthlyWashPerkDescription: 'Includes 1 Complimentary Maintenance Wash Once Every Month',
          quoteBasis: 'Custom quote based on vehicle size, warranty duration & surface condition',
          summary: 'Semi-permanent 9H nano-ceramic SiO2 protective layer delivering extreme hydrophobicity, UV resistance, and chemical defense against coastal Mangaluru rain & salt air.',
          inclusions: [
            '1 Free maintenance wash once every month to preserve hydrophobic shine and warranty',
            'Complete multi-stage machine paint correction included prior to coating',
            'Application of 9H high-solids nano-ceramic coating on all painted panels',
            'Hydrophobic windshield & window glass rain-repellent treatment',
            'Wheel face and headlight UV protective seal',
            'Studio infrared / cleanroom cure and warranty documentation',
          ],
          whoItsFor: 'New car owners wanting to preserve showroom gloss, or corrected vehicles wanting multi-year ease of cleaning and UV protection.',
          realisticExpectations: 'Repels dirt, prevents clearcoat oxidation, and makes washing effortless. Does not make the car impervious to stone chips or key scratches (consider PPF for impact resistance).',
        },
      ],
    },
    {
      id: 'paint',
      categoryName: 'Paint Correction & Polishing',
      shortDescription: 'Multi-stage machine swirl removal restoring optical mirror clarity without fillers.',
      iconName: 'Sparkles',
      services: [
        {
          id: 'multi-stage-correction',
          name: 'Multi-Stage Paint Correction & Polishing',
          shortTag: 'Paint Correction',
          category: 'Paint Correction & Polishing',
          turnaroundTime: 'Condition & Scope Dependent',
          durationNotice:
            "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",
          quoteBasis: 'Tailored quote following digital paint depth measurement and defect audit',
          summary: 'Precision dual-action and rotary machine leveling to eliminate 85% to 95% of swirl marks, buffer trails, towel scratches, and oxidation.',
          inclusions: [
            'Digital paint depth measurement across all metal panels',
            'Stage 1: Heavy cutting compound pass removing clearcoat defects',
            'Stage 2: Medium polish refining finish and eliminating compounding haze',
            'Stage 3: Ultra-fine jewel finishing pass for deep optical mirror clarity',
            'Isopropanol (IPA) alcohol panel wipe ensuring true, filler-free results',
          ],
          whoItsFor: 'Vehicles with visible spiderwebs, swirl marks under direct sun, wash marring, or dull lifeless paintwork.',
          realisticExpectations: 'Permanently removes clear coat imperfections. Deep scratches that catch a fingernail or expose grey primer cannot be buffed out.',
        },
      ],
    },
    {
      id: 'interior',
      categoryName: 'Interior Detailing',
      shortDescription: 'Deep cabin extraction, leather care, steam sanitization, and odor elimination.',
      iconName: 'Car',
      services: [
        {
          id: 'deep-interior-clean',
          name: 'Deep Interior Detailing & Sanitization',
          shortTag: 'Interior Deep Clean',
          category: 'Interior Detailing',
          turnaroundTime: 'Condition & Scope Dependent',
          durationNotice:
            "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",
          quoteBasis: 'Custom quote based on cabin size, seat rows & stain severity',
          summary: 'Intensive upholstery steam extraction, pH-balanced leather cleansing & conditioning, roof-liner gentle care, AC vent sanitization, and germ-free deodorization.',
          inclusions: [
            'High-power vacuuming of carpets, seats, trunk, and crevices',
            'Hot-water / steam extraction of fabric upholstery & floor carpets',
            'Gentle scrub & UV conditioning of leatherette or genuine leather',
            'AC evaporator vent steam disinfection and odor neutralization',
            'Dashboard, center console, and door card UV satin protection',
          ],
          whoItsFor: 'Cars needing thorough hygiene after monsoons, road trips, food spills, pet hair, or second-hand car sanitization.',
          realisticExpectations: 'Extracts deep-seated dirt, food stains, and odors. Heavily stained or bleached fabric might have slight residual marks if fiber dye is permanently damaged.',
        },
      ],
    },
    {
      id: 'wheel-tyre',
      categoryName: 'Wheel & Tyre Care',
      shortDescription: 'Deep rim iron fallout decontamination, wheel barrel detailing, caliper cleaning, and protective dressing.',
      iconName: 'Disc',
      services: [
        {
          id: 'wheel-tyre-care',
          name: 'Precision Wheel & Tyre Detailing & Protection',
          shortTag: 'Wheel & Tyre Care',
          category: 'Wheel & Tyre Care',
          turnaroundTime: 'Condition & Scope Dependent',
          durationNotice:
            "Service duration and vehicle collection depend on the selected service and the vehicle's condition. Contact Calgary Premium Auto Detailing for a personalised quotation and scheduling.",
          quoteBasis: 'Custom quote based on wheel size, rim finish & brake dust accumulation',
          summary: 'Acid-free pH-balanced iron fallout removal from wheel faces and inner barrels, brake caliper surface cleaning, tire rubber scrub, and UV-resistant satin tire dressing.',
          inclusions: [
            'pH-neutral iron-dissolving fallout decontamination on all 4 wheel faces & inner barrels',
            'Soft microfiber barrel brush agitation safely lifting stubborn brake dust without micro-scratching',
            'Brake caliper surface cleaning and road grime removal',
            'Tire tread and sidewall deep scrub removing blooming and brown rubber oxidation',
            'Ultra-durable matte/satin hydrophobic tire dressing that guards against UV dry rot and cracking',
          ],
          whoItsFor: 'Vehicles with heavy brake dust accumulation, diamond-cut or painted alloy rims, or owners wanting immaculate wheels.',
          realisticExpectations: 'Restores wheel faces and barrels to immaculate clean condition. Severe curb rash, deep metal gouging, or peeling clearcoat requires specialized wheel refurbishment.',
        },
      ],
    },
  ] as DetailingCategory[],
};

/**
 * Generate a pre-filled WhatsApp enquiry link for Calgary Detailing
 */
export function getWhatsAppUrl(service?: string, vehicle?: string, notes?: string): string {
  const base = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappNumber}`;
  const greeting = 'Hello Calgary Premium Auto Detailing,';
  let message = `${greeting}\nI would like to enquire about`;

  if (service) {
    message += ` the *${service}*`;
  } else {
    message += ` your automotive detailing services`;
  }

  if (vehicle && vehicle.trim()) {
    message += ` for my vehicle: *${vehicle.trim()}*`;
  } else {
    message += ` for my car`;
  }

  message += ` at your Padil, Mangaluru studio.`;

  if (notes && notes.trim()) {
    message += `\n\nNotes: ${notes.trim()}`;
  }

  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Click-to-call link generator
 */
export function getPhoneCallUrl(): string {
  return `tel:${BUSINESS_CONFIG.contact.phoneRaw}`;
}
