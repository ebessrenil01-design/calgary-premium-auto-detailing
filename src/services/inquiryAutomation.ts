/**
 * Calgary Premium Auto Detailing - Inquiry & Automation Service
 * Studio Location: Padil, Mangaluru, Karnataka, India
 *
 * This service handles:
 * 1. Customer inquiry data structures and validation
 * 2. Adaptive service-specific WhatsApp message formatting
 * 3. Client-side persistence (localStorage) for inquiry tracking
 * 4. Architectural webhook stub for future WhatsApp Business Cloud API / CRM automation
 */

import { BUSINESS_CONFIG } from '../config/businessInfo';

export const CALGARY_SERVICES = [
  'Professional Snow Foam Wash & Decontamination',
  'Paint Protection Film (PPF)',
  'Ceramic Coating Protection (SiO2)',
  'Multi-Stage Paint Correction & Polishing',
  'Deep Interior Detailing & Sanitization',
  'Precision Wheel & Tyre Care',
] as const;

export type CalgaryService = (typeof CALGARY_SERVICES)[number];

export const DROP_OFF_OPTIONS = [
  'Customer Drop-off at Padil Studio',
  'Doorstep Pickup & Drop (Mangaluru)',
] as const;

export type DropOffOption = (typeof DROP_OFF_OPTIONS)[number];

export interface CustomerInquiry {
  id: string;
  createdAt: string;
  customerName: string;
  phoneNumber: string;
  vehicle: string;
  serviceRequired: string;
  preferredDropOff: string;
  appointmentDate?: string;
  appointmentTime?: string;
  status: 'PENDING_WHATSAPP' | 'WHATSAPP_LAUNCHED' | 'DISPATCHED_TO_CRM';
  generatedMessage: string;
}

const STORAGE_KEY = 'calgary_customer_inquiries_v1';

/**
 * Generate a unique tracking reference (e.g. CLG-2026-8492)
 */
export function generateInquiryId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CLG-${year}-${random}`;
}

/**
 * Format concise WhatsApp payload containing ONLY the requested fields
 */
export function generateWhatsAppMessage(inquiry: {
  customerName: string;
  phoneNumber: string;
  vehicle: string;
  serviceRequired: string;
  preferredDropOff: string;
  appointmentDate?: string;
  appointmentTime?: string;
}): string {
  const lines: string[] = [];

  lines.push(`*CALGARY PREMIUM AUTO DETAILING — APPOINTMENT REQUEST*`);
  lines.push(``);
  lines.push(`Customer Name: ${inquiry.customerName.trim() || 'Not specified'}`);
  lines.push(`Phone Number: ${inquiry.phoneNumber.trim() || 'Not specified'}`);
  lines.push(`Vehicle: ${inquiry.vehicle.trim() || 'Not specified'}`);
  lines.push(`Service Required: ${inquiry.serviceRequired || 'Professional Snow Foam Wash & Decontamination'}`);
  lines.push(`Preferred Drop-off Type: ${inquiry.preferredDropOff || 'Customer Drop-off at Padil Studio'}`);

  if (inquiry.appointmentDate && inquiry.appointmentTime) {
    lines.push(`Requested Appointment Date and Time: ${inquiry.appointmentDate} at ${inquiry.appointmentTime} (Pending Studio Confirmation)`);
  } else if (inquiry.appointmentDate) {
    lines.push(`Requested Appointment Date: ${inquiry.appointmentDate} (Pending Studio Confirmation)`);
  }

  return lines.join('\n');
}

/**
 * Generate the direct WhatsApp launch URL
 */
export function buildWhatsAppUrl(message: string): string {
  const number = BUSINESS_CONFIG.contact.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Save an inquiry to local client storage
 */
export function saveInquiryToStorage(inquiry: CustomerInquiry): void {
  try {
    const existing = getStoredInquiries();
    // Prepend new inquiry, keeping latest 25
    const updated = [inquiry, ...existing.filter((item) => item.id !== inquiry.id)].slice(0, 25);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Graceful fallback for private browsing or quota limits
  }
}

/**
 * Safely normalizes any legacy or malformed inquiry object from localStorage
 */
function normalizeInquiry(item: any): CustomerInquiry {
  let vehicleStr = '';
  if (typeof item?.vehicle === 'string') {
    vehicleStr = item.vehicle.trim();
  } else if (item?.vehicle && typeof item.vehicle === 'object') {
    const parts = [
      item.vehicle.makeModel,
      item.vehicle.segment,
      item.vehicle.condition,
    ].filter((p) => typeof p === 'string' && p.trim().length > 0);
    vehicleStr = parts.join(' - ') || 'Vehicle Not Specified';
  } else {
    vehicleStr = 'Vehicle Not Specified';
  }

  const customerName =
    typeof item?.customerName === 'string' && item.customerName.trim()
      ? item.customerName.trim()
      : typeof item?.customer?.name === 'string' && item.customer.name.trim()
      ? item.customer.name.trim()
      : 'Customer';

  const phoneNumber =
    typeof item?.phoneNumber === 'string' && item.phoneNumber.trim()
      ? item.phoneNumber.trim()
      : typeof item?.customer?.phone === 'string' && item.customer.phone.trim()
      ? item.customer.phone.trim()
      : '';

  const serviceRequired =
    typeof item?.serviceRequired === 'string' && item.serviceRequired.trim()
      ? item.serviceRequired.trim()
      : typeof item?.subService === 'string' && item.subService.trim()
      ? item.subService.trim()
      : typeof item?.serviceCategory === 'string' && item.serviceCategory.trim()
      ? item.serviceCategory.trim()
      : 'Detailing Service';

  const preferredDropOff =
    typeof item?.preferredDropOff === 'string' && item.preferredDropOff.trim()
      ? item.preferredDropOff.trim()
      : 'Customer Drop-off at Padil Studio';

  const appointmentDate =
    typeof item?.appointmentDate === 'string'
      ? item.appointmentDate
      : typeof item?.customer?.preferredDate === 'string'
      ? item.customer.preferredDate
      : undefined;

  const appointmentTime =
    typeof item?.appointmentTime === 'string'
      ? item.appointmentTime
      : typeof item?.customer?.preferredWindow === 'string'
      ? item.customer.preferredWindow
      : undefined;

  let generatedMessage = '';
  if (typeof item?.generatedMessage === 'string' && item.generatedMessage.trim()) {
    generatedMessage = item.generatedMessage;
  } else {
    generatedMessage = generateWhatsAppMessage({
      customerName,
      phoneNumber,
      vehicle: vehicleStr,
      serviceRequired,
      preferredDropOff,
      appointmentDate,
      appointmentTime,
    });
  }

  return {
    id: typeof item?.id === 'string' ? item.id : generateInquiryId(),
    createdAt: typeof item?.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
    customerName,
    phoneNumber,
    vehicle: vehicleStr,
    serviceRequired,
    preferredDropOff,
    appointmentDate,
    appointmentTime,
    status: item?.status || 'PENDING_WHATSAPP',
    generatedMessage,
  };
}

/**
 * Retrieve saved inquiries from local client storage
 */
export function getStoredInquiries(): CustomerInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const normalized = parsed.map(normalizeInquiry);
    // Write back normalized data to heal browser storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // Ignore quota/private browsing issues
    }
    return normalized;
  } catch {
    return [];
  }
}

/**
 * Update the status of an existing inquiry
 */
export function updateStoredInquiryStatus(id: string, status: CustomerInquiry['status']): void {
  try {
    const existing = getStoredInquiries();
    const updated = existing.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

/**
 * Clear all stored inquiries
 */
export function clearStoredInquiries(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

/**
 * ARCHITECTURAL WEBHOOK / CRM STUB
 *
 * Prepared for future WhatsApp Business Cloud API (Meta Graph API)
 * or CRM ingestion (e.g., Zapier, Make, custom Express webhook).
 */
export interface WebhookDispatchResult {
  success: boolean;
  message: string;
  endpointConfigured: boolean;
  payload?: CustomerInquiry;
}

export async function dispatchInquiryToBackend(inquiry: CustomerInquiry): Promise<WebhookDispatchResult> {
  const webhookUrl = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_WHATSAPP_CRM_WEBHOOK_URL;

  if (!webhookUrl) {
    // Documented honest posture: no external CRM key or backend endpoint configured yet
    return {
      success: true,
      endpointConfigured: false,
      message: 'Local persistence active. Ready for WhatsApp Business API webhook integration.',
      payload: inquiry,
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiry),
    });

    if (response.ok) {
      updateStoredInquiryStatus(inquiry.id, 'DISPATCHED_TO_CRM');
      return {
        success: true,
        endpointConfigured: true,
        message: 'Successfully forwarded to automated CRM webhook.',
        payload: inquiry,
      };
    } else {
      return {
        success: false,
        endpointConfigured: true,
        message: `CRM Webhook responded with status ${response.status}`,
      };
    }
  } catch (error) {
    return {
      success: false,
      endpointConfigured: true,
      message: error instanceof Error ? error.message : 'Network error communicating with CRM webhook',
    };
  }
}
