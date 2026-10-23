import { describe, expect, it, vi } from 'vitest';
import {
  FORMSUBMIT_AJAX_ENDPOINT,
  buildFormSubmitPayload,
  buildSubject,
  failureMessage,
  firstInvalidField,
  phoneDigits,
  sanitizeText,
  sendToFormSubmit,
  todayIso,
  validateEnquiry,
  whatsappMessage,
  type EnquiryValues,
} from '@/lib/enquiry';

const valid: EnquiryValues = {
  name: 'Asha Verma',
  email: 'asha@example.com',
  phone: '+91 98765 43210',
  message: 'Planning a family trip to Kerala in December.',
  consent: true,
  destination: 'Kerala',
  date: '2030-12-20',
  travellers: '4',
};
const TODAY = '2026-10-23';

describe('validateEnquiry', () => {
  it('accepts a complete, valid enquiry', () => {
    expect(validateEnquiry(valid, undefined, TODAY)).toEqual({});
  });

  it('requires name, email, phone, message and consent', () => {
    const errors = validateEnquiry({ name: '', email: '', phone: '', message: '', consent: false }, undefined, TODAY);
    expect(Object.keys(errors).sort()).toEqual(['consent', 'email', 'message', 'name', 'phone']);
  });

  it('checks minimum lengths by hand (autofill does not trigger validity.tooShort)', () => {
    const errors = validateEnquiry({ ...valid, name: 'A', message: 'Hi there' }, undefined, TODAY);
    expect(errors.name).toMatch(/at least 2/);
    expect(errors.message).toMatch(/at least 10/);
  });

  it('enforces maximum lengths', () => {
    const errors = validateEnquiry({ ...valid, name: 'x'.repeat(81), message: 'y'.repeat(2001), destination: 'z'.repeat(101) }, undefined, TODAY);
    expect(errors.name).toMatch(/80/);
    expect(errors.message).toMatch(/2000/);
    expect(errors.destination).toMatch(/100/);
  });

  it.each(['asha', 'asha@', 'asha@example', 'a b@example.com'])('rejects invalid email %s', (email) => {
    expect(validateEnquiry({ ...valid, email }, ['email'], TODAY).email).toBeDefined();
  });

  it.each([
    ['98765', false],
    ['9876543210', true],
    ['+91 (987) 654-3210', true],
    ['1234567890123456', false],
    ['98765abc10', false],
  ])('phone %s valid=%s (10–15 digits)', (phone, ok) => {
    expect(validateEnquiry({ ...valid, phone }, ['phone'], TODAY).phone === undefined).toBe(ok);
  });

  it('rejects past dates and an end date before the start date', () => {
    expect(validateEnquiry({ ...valid, date: '2026-10-22' }, ['date'], TODAY).date).toMatch(/past/);
    expect(validateEnquiry({ ...valid, date: TODAY }, ['date'], TODAY).date).toBeUndefined();
    expect(validateEnquiry({ ...valid, date: '2030-12-20', endDate: '2030-12-10' }, ['endDate'], TODAY).endDate).toMatch(/after/);
  });

  it('validates the traveller count', () => {
    expect(validateEnquiry({ ...valid, travellers: '0' }, ['travellers'], TODAY).travellers).toBeDefined();
    expect(validateEnquiry({ ...valid, travellers: '2.5' }, ['travellers'], TODAY).travellers).toBeDefined();
  });

  it('only checks the requested fields', () => {
    expect(validateEnquiry({ ...valid, email: 'bad', name: '' }, ['email'], TODAY)).toEqual({ email: expect.any(String) });
  });

  it('reports the first invalid field in visual order', () => {
    expect(firstInvalidField({ message: 'x', email: 'y' })).toBe('email');
  });
});

describe('helpers', () => {
  it('sanitizes text', () => {
    expect(sanitizeText('  <script>hi</script>\u0007 there  ')).toBe('scripthi/script there');
    expect(sanitizeText('a'.repeat(50), 10)).toHaveLength(10);
  });

  it('counts phone digits', () => {
    expect(phoneDigits('+91 (987) 654-3210')).toBe('919876543210');
  });

  it('formats today as YYYY-MM-DD', () => {
    expect(todayIso(new Date(2026, 9, 23, 23, 30))).toBe('2026-10-23');
  });

  it('builds the subject "New enquiry from {Name}: {Subject}"', () => {
    expect(buildSubject('Asha', 'Visa Assistance')).toBe('New enquiry from Asha: Visa Assistance');
  });

  it('builds a FormSubmit payload with settings, reply-to, source page and time', () => {
    const payload = buildFormSubmitPayload(
      { name: 'Asha', email: 'asha@example.com', message: '<b>Hello</b>', empty: '' },
      { formType: 'Contact form', topic: 'Contact form', sourceUrl: 'https://chalmusafirholidays.com/contact/', honeypot: '', now: new Date('2026-10-23T12:00:00Z') },
    );
    expect(payload).toMatchObject({
      name: 'Asha',
      message: 'bHello/b',
      'Form type': 'Contact form',
      'Source page': 'https://chalmusafirholidays.com/contact/',
      _subject: 'New enquiry from Asha: Contact form',
      _replyto: 'asha@example.com',
      _template: 'table',
      _captcha: 'false',
      _honey: '',
    });
    expect(payload['Submitted at']).toMatch(/2026/);
    expect(payload).not.toHaveProperty('empty');
  });

  it('pre-fills the WhatsApp message from entered fields', () => {
    const text = whatsappMessage({ name: 'Asha', destination: 'Goa', message: 'Beach trip' }, 'Contact form');
    expect(text).toContain('Name: Asha');
    expect(text).toContain('Destination: Goa');
    expect(text).not.toContain('Email:');
  });

  it('offers phone/email alternatives when delivery fails', () => {
    expect(failureMessage('delivery')).toMatch(/phone, WhatsApp or email/);
    expect(failureMessage('timeout')).toMatch(/20 seconds/);
    expect(failureMessage('offline')).toMatch(/offline/);
  });
});

describe('sendToFormSubmit', () => {
  const ok = () => new Response(JSON.stringify({ success: 'true', message: 'The form was submitted successfully.' }), { status: 200 });

  it('posts JSON to the AJAX endpoint', async () => {
    const fetchImpl = vi.fn(async () => ok());
    await expect(sendToFormSubmit({ name: 'A' }, { fetchImpl, isOnline: () => true })).resolves.toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledWith(FORMSUBMIT_AJAX_ENDPOINT, expect.objectContaining({ method: 'POST', body: '{"name":"A"}' }));
    expect(FORMSUBMIT_AJAX_ENDPOINT).toBe('https://formsubmit.co/ajax/chalmusafirholidays@gmail.com');
  });

  it('treats success:"false" (e.g. form not yet activated) as a delivery failure', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ success: 'false', message: 'This form needs Activation.' })));
    await expect(sendToFormSubmit({}, { fetchImpl, isOnline: () => true })).resolves.toEqual({ ok: false, reason: 'delivery', detail: 'This form needs Activation.' });
  });

  it('treats an HTTP error as a delivery failure', async () => {
    const fetchImpl = vi.fn(async () => new Response('oops', { status: 500 }));
    await expect(sendToFormSubmit({}, { fetchImpl, isOnline: () => true })).resolves.toMatchObject({ ok: false, reason: 'delivery' });
  });

  it('reports offline without sending', async () => {
    const fetchImpl = vi.fn();
    await expect(sendToFormSubmit({}, { fetchImpl, isOnline: () => false })).resolves.toEqual({ ok: false, reason: 'offline' });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('reports a network error', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('Failed to fetch');
    });
    await expect(sendToFormSubmit({}, { fetchImpl, isOnline: () => true })).resolves.toMatchObject({ ok: false, reason: 'network' });
  });

  it('aborts after the timeout', async () => {
    const fetchImpl = vi.fn(
      (_url: RequestInfo | URL, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))),
    );
    await expect(sendToFormSubmit({}, { fetchImpl, isOnline: () => true, timeoutMs: 20 })).resolves.toEqual({ ok: false, reason: 'timeout' });
  });
});
