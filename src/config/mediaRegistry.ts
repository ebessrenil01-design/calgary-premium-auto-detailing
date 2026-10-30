/**
 * Calgary Premium Auto Detailing - Media Registry
 *
 * Curated automotive visual assets representing Calgary's detailing
 * craft, surface correction, and paint protection services.
 */

import { ASSETS } from '../assets/images';

export interface MediaAsset {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  fallbackUrl?: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  orientationClass: string;
  badge: string;
  description: string;
}

export const CALGARY_MEDIA_REGISTRY: MediaAsset[] = [
  {
    id: 'craft-50-50-correction',
    title: '50/50 Paint Correction Test',
    category: 'Paint Correction & Polish',
    imageUrl: ASSETS.paintCorrectionSplit,
    fallbackUrl: '/images/paint_correction_split_1792861029584.jpg',
    aspectRatio: 'landscape',
    orientationClass: 'md:col-span-2 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'BEFORE / AFTER',
    description:
      'Direct comparison under high-CRI handheld inspection spotlight demonstrating complete elimination of swirl marks, spiderweb scratches, and oxidation versus mirror-finish paint leveling.',
  },
  {
    id: 'craft-coating-kit',
    title: 'Ceramic Coating & PPF System',
    category: 'Surface Protection Products',
    imageUrl: ASSETS.coatingBottlesKit,
    fallbackUrl: '/images/coating_bottles_kit_1792861000118.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'CERAMIC & PPF',
    description:
      'Professional nano-ceramic coating vials, suede microfiber applicator blocks, and clear paint protection film engineered for intense UV and chemical resilience.',
  },
  {
    id: 'craft-interior-mats',
    title: '7D Precision Mat Fitment',
    category: 'Interior Accessories & Care',
    imageUrl: ASSETS.interiorFloorMats,
    fallbackUrl: '/images/interior_floor_mats_1792861014644.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'INTERIOR ACCESSORIES',
    description:
      'Custom tailored 7D diamond-stitch all-weather floor mats, brushed metal pedal detailing, and console sanitization providing cabin protection tailored for Indian road conditions.',
  },
  {
    id: 'craft-compact-suv',
    title: 'Compact SUV Ceramic Shield',
    category: 'Ceramic Coating',
    imageUrl: ASSETS.seltosCompactSuv,
    fallbackUrl: '/images/seltos_compact_suv_1792860532668.jpg',
    aspectRatio: 'landscape',
    orientationClass: 'md:col-span-2 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'SUV CERAMIC',
    description:
      'Multi-stage machine refinement, clearcoat leveling, and hydrophobic ceramic shielding on modern compact and midsize SUV bodywork.',
  },
  {
    id: 'craft-wheel-restoration',
    title: 'Diamond Cut Rim Detailing',
    category: 'Wheel & Brake Care',
    imageUrl: ASSETS.wheelAlloyRim,
    fallbackUrl: '/images/wheel_alloy_rim_1792178355937.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[300px]',
    badge: 'ALLOY CARE',
    description:
      'Intensive brake dust iron decontamination, barrel polishing, and hydrophobic ceramic shielding for wheel faces and brake calipers.',
  },
  {
    id: 'craft-headlight-optics',
    title: 'Crystal Headlight Optics',
    category: 'Lens Clarity & Restoration',
    imageUrl: ASSETS.headlightLens,
    fallbackUrl: '/images/headlight_lens_1792178356267.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[300px]',
    badge: 'OPTICAL CLARITY',
    description:
      'Precision lens compounding, oxidation removal, and UV-cured protective coating restoring luminous transparency and crisp beam focus.',
  },
  {
    id: 'craft-ceramic-water-beads',
    title: 'Hydrophobic Surface Tension',
    category: 'Ceramic Coating',
    imageUrl: ASSETS.paintWaterBeads,
    fallbackUrl: '/images/paint_water_beads_1792178356657.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[300px]',
    badge: 'HYDROPHOBIC SHIELD',
    description:
      'Extreme water contact angle demonstration proving hydrophobic seal against monsoon rain, road grime, and atmospheric fallout in coastal Mangaluru.',
  },
  {
    id: 'craft-detailing-cart',
    title: 'Pro Detailing Products & Cart',
    category: 'Care Products & Equipment',
    imageUrl: ASSETS.detailingSuppliesCart,
    fallbackUrl: '/images/detailing_supplies_cart_1792861044366.jpg',
    aspectRatio: 'landscape',
    orientationClass: 'md:col-span-2 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'PRO CARE SUPPLIES',
    description:
      'Workshop-grade supplies including pH-neutral vehicle shampoos, iron fallout removers, plush edgeless microfiber buffing towels, and soft horsehair detailing brushes.',
  },
  {
    id: 'craft-detailing-polisher',
    title: 'Dual-Action Machine Polisher',
    category: 'Workshop Equipment',
    imageUrl: ASSETS.detailingPolisher,
    fallbackUrl: '/images/detailing_polisher_1792178356004.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'PRECISION TOOLS',
    description:
      'Dual-action random orbital machinery calibrated with graduated foam cutting and finishing pads for safe clearcoat refinement without paint burn.',
  },
  {
    id: 'craft-leather-interior',
    title: 'Cabin Leather Treatment',
    category: 'Interior Detailing',
    imageUrl: ASSETS.luxuryInteriorDetail,
    fallbackUrl: '/images/luxury_interior_detail_1792178377594.jpg',
    aspectRatio: 'portrait',
    orientationClass: 'md:col-span-1 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'CABIN HYGIENE',
    description:
      'pH-balanced leather conditioning, extraction of high-contact steering and armrest areas, dashboard UV nourishment, and germ-free hygienic steam treatment.',
  },
  {
    id: 'craft-executive-sedan',
    title: 'Executive Sedan Surface Finish',
    category: 'Inspection & Finish',
    imageUrl: ASSETS.luxuryGermanSedan,
    fallbackUrl: '/images/luxury_german_sedan_1792860517810.jpg',
    aspectRatio: 'landscape',
    orientationClass: 'md:col-span-2 md:row-span-1 h-[260px] md:h-[340px]',
    badge: 'FINISH INSPECTION',
    description:
      'Dual-spectrum studio inspection verifying zero holograms, deep mirror reflection, and paint leveling across contoured body panels.',
  },
];
