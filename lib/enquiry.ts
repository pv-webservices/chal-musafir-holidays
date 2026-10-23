/**
 * Enquiry form logic shared by the contact form and the trip planner:
 * validation, FormSubmit payloads and the background (AJAX) send.
 *
 * Delivery is FormSubmit only (https://formsubmit.co) — no SMTP, no server
 * code, no credentials. Submissions go to the client's Gmail address.
 */
import { site } from '@/data/site';

/**
 * FormSubmit form ID. Until activation this is the inbox address itself.
 * After clicking "Activate Form" in FormSubmit's email, FormSubmit shows a
 * random alias (e.g. "a1b2c3d4e5…"); paste it here so the address is no
 * longer visible in the page source. The recipient does not change.
 */
export const FORMSUBMIT_ID: string = site.email;
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/${FORMSUBMIT_ID}`;
export const FORMSUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_ID}`;
export const THANK_YOU_PATH = '/thank-you/';
export const THANK_YOU_URL = `${site.origin}${THANK_YOU_PATH}`;

export const REQUEST_TIMEOUT_MS = 20_000;
/** Submissions faster than this after the form appears are treated as bots. */
export const MIN_FILL_MS = 3_000;
/** FormSubmit's honeypot field name — any value makes FormSubmit discard the submission. */
export const HONEYPOT_FIELD = '_honey';

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  phoneDigits: { min: 10, max: 15 },
  message: { min: 10, max: 2000 },
  destination: { max: 100 },
  travellers: { min: 1, max: 99 },
} as const;

export interface EnquiryValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  destination?: string;
  date?: string;
  endDate?: string;
  travellers?: string;
}

export type EnquiryField = keyof EnquiryValues;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Today as YYYY-MM-DD in the visitor's local time (what <input type="date"> uses). */
export function todayIso(now: Date = new Date()): string {
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** Strips control characters and angle brackets, collapses runs of spaces, trims. */
export function sanitizeText(value: unknown, maxLength = 2000): string {
  return String(value ?? '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function phoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Validates every field. Lengths are checked by hand because the browser's
 * `validity.tooShort` does not fire for autofilled or scripted values.
 * Only the fields listed in `fields` are checked (used for step validation).
 */
export function validateEnquiry(values: EnquiryValues, fields?: EnquiryField[], today: string = todayIso()): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const check = (field: EnquiryField) => !fields || fields.includes(field);

  const name = values.name.trim();
  if (check('name')) {
    if (!name) errors.name = 'Please enter your name.';
    else if (name.length < LIMITS.name.min) errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
    else if (name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;
  }

  const email = values.email.trim();
  if (check('email')) {
    if (!email) errors.email = 'Please enter your email address.';
    else if (email.length > LIMITS.email.max) errors.email = `Email must be ${LIMITS.email.max} characters or fewer.`;
    else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address, like name@example.com.';
  }

  if (check('phone')) {
    const digits = phoneDigits(values.phone);
    if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
    else if (/[^\d\s+()-]/.test(values.phone)) errors.phone = 'Phone numbers can only contain digits, spaces, +, - and brackets.';
    else if (digits.length < LIMITS.phoneDigits.min || digits.length > LIMITS.phoneDigits.max)
      errors.phone = `Please enter a phone number with ${LIMITS.phoneDigits.min}–${LIMITS.phoneDigits.max} digits.`;
  }

  const message = values.message.trim();
  if (check('message')) {
    if (!message) errors.message = 'Please tell us a little about your trip.';
    else if (message.length < LIMITS.message.min) errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
    else if (message.length > LIMITS.message.max) errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;
  }

  if (check('destination') && (values.destination ?? '').trim().length > LIMITS.destination.max) {
    errors.destination = `Destination must be ${LIMITS.destination.max} characters or fewer.`;
  }

  if (check('date') && values.date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) errors.date = 'Please enter a valid date.';
    else if (values.date < today) errors.date = 'Travel date cannot be in the past.';
  }

  if (check('endDate') && values.endDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.endDate)) errors.endDate = 'Please enter a valid date.';
    else if (values.endDate < today) errors.endDate = 'End date cannot be in the past.';
    else if (values.date && values.endDate < values.date) errors.endDate = 'End date must be on or after the start date.';
  }

  if (check('travellers') && values.travellers) {
    const count = Number(values.travellers);
    if (!Number.isInteger(count) || count < LIMITS.travellers.min || count > LIMITS.travellers.max)
      errors.travellers = `Please enter a number between ${LIMITS.travellers.min} and ${LIMITS.travellers.max}.`;
  }

  if (check('consent') && !values.consent) {
    errors.consent = 'Please agree to the privacy policy so we can reply to you.';
  }

  return errors;
}

/** Field order used to decide which invalid field receives focus first. */
export const FIELD_ORDER: EnquiryField[] = ['name', 'email', 'phone', 'destination', 'date', 'endDate', 'travellers', 'message', 'consent'];

export function firstInvalidField(errors: EnquiryErrors): EnquiryField | undefined {
  return FIELD_ORDER.find((field) => errors[field]);
}

export function buildSubject(name: string, topic: string): string {
  return `New enquiry from ${sanitizeText(name, 80) || 'website visitor'}: ${sanitizeText(topic, 100) || 'General enquiry'}`;
}

/** Local submission time, e.g. "23 Oct 2026, 6:42 pm (Asia/Kolkata)". */
export function submissionTime(now: Date = new Date()): string {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  const stamp = now.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: zone });
  return `${stamp} (${zone})`;
}

/**
 * Builds the JSON body for FormSubmit's AJAX endpoint. Underscore fields are
 * FormSubmit settings; everything else appears in the email as a table row.
 */
export function buildFormSubmitPayload(
  fields: Record<string, string>,
  meta: { formType: string; topic: string; sourceUrl: string; honeypot: string; now?: Date },
): Record<string, string> {
  const clean = Object.fromEntries(
    Object.entries(fields)
      .map(([key, value]) => [key, sanitizeText(value)] as const)
      .filter(([, value]) => value !== ''),
  );
  return {
    ...clean,
    'Form type': meta.formType,
    'Source page': meta.sourceUrl,
    'Submitted at': submissionTime(meta.now),
    _subject: buildSubject(fields.name ?? '', meta.topic),
    _replyto: sanitizeText(fields.email, LIMITS.email.max),
    _template: 'table',
    _captcha: 'false',
    [HONEYPOT_FIELD]: meta.honeypot,
  };
}

export type SendResult =
  | { ok: true }
  | { ok: false; reason: 'offline' | 'timeout' | 'network' | 'delivery'; detail?: string };

/**
 * Sends a submission to FormSubmit's AJAX endpoint with a hard timeout.
 * Never throws — every failure is mapped to a reason the UI can explain.
 */
export async function sendToFormSubmit(
  payload: Record<string, string>,
  options: { timeoutMs?: number; fetchImpl?: typeof fetch; isOnline?: () => boolean } = {},
): Promise<SendResult> {
  const { timeoutMs = REQUEST_TIMEOUT_MS, fetchImpl = fetch, isOnline = () => typeof navigator === 'undefined' || navigator.onLine } = options;
  if (!isOnline()) return { ok: false, reason: 'offline' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(FORMSUBMIT_AJAX_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result: unknown = await response.json().catch(() => null);
    const success = typeof result === 'object' && result !== null && String((result as { success?: unknown }).success) === 'true';
    if (!response.ok || !success) {
      const detail = typeof result === 'object' && result !== null ? String((result as { message?: unknown }).message ?? '') : '';
      return { ok: false, reason: 'delivery', detail };
    }
    return { ok: true };
  } catch (error: unknown) {
    if (controller.signal.aborted) return { ok: false, reason: 'timeout' };
    if (!isOnline()) return { ok: false, reason: 'offline' };
    return { ok: false, reason: 'network', detail: error instanceof Error ? error.message : undefined };
  } finally {
    clearTimeout(timer);
  }
}

/** Visitor-facing explanation for a failed send. Entered data is always kept. */
export function failureMessage(reason: Exclude<SendResult, { ok: true }>['reason']): string {
  switch (reason) {
    case 'offline':
      return 'You appear to be offline. Your details are still here — reconnect and press Send again.';
    case 'timeout':
      return 'The request took too long (over 20 seconds). Your details are still here — please try again.';
    case 'network':
      return 'We could not reach the enquiry service. Your details are still here — please try again in a moment.';
    case 'delivery':
    default:
      return 'Your enquiry could not be delivered just now. Your details are still here — try again, or contact us directly by phone, WhatsApp or email.';
  }
}

/** Pre-filled WhatsApp text built from whatever the visitor has typed so far. */
export function whatsappMessage(fields: Record<string, string>, formType: string): string {
  const lines = [`Hi ${site.name}, I would like to enquire (${formType}).`];
  const labels: Record<string, string> = {
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    destination: 'Destination',
    date: 'Travel date',
    endDate: 'Return date',
    travellers: 'Travellers',
    tripType: 'Trip type',
    budget: 'Budget',
    message: 'Message',
  };
  for (const [key, label] of Object.entries(labels)) {
    const value = sanitizeText(fields[key], 500);
    if (value) lines.push(`${label}: ${value}`);
  }
  return lines.join('\n');
}
