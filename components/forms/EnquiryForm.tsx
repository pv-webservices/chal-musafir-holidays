'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { whatsappUrl } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';
import {
  LIMITS,
  MIN_FILL_MS,
  THANK_YOU_PATH,
  buildFormSubmitPayload,
  buildSubject,
  failureMessage,
  firstInvalidField,
  sendToFormSubmit,
  todayIso,
  validateEnquiry,
  whatsappMessage,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
  type SendResult,
} from '@/lib/enquiry';
import {
  ConsentField,
  ErrorSummary,
  FORM_ACTION,
  FieldShell,
  FormSubmitHiddenFields,
  Honeypot,
  SendFailure,
  describedBy,
  fieldId,
  inputClass,
  useDraft,
  usePageShowReset,
} from './FormParts';

interface EnquiryFormProps {
  compact?: boolean;
  /** Topic of the enquiry, e.g. a service name. Used in the email subject. */
  defaultSubject?: string;
  /** Path of the page the form sits on — sent as "Source page" when JavaScript is off. */
  sourcePath: string;
}

type Status = 'idle' | 'sending' | 'failed';

const LABELS: Partial<Record<EnquiryField, string>> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  destination: 'Destination',
  date: 'Travel date',
  travellers: 'Travellers',
  message: 'Message',
  consent: 'Consent',
};

const EMPTY: EnquiryValues = { name: '', email: '', phone: '', message: '', consent: false, destination: '', date: '', travellers: '' };

/**
 * Contact / service enquiry form.
 * - Without JavaScript: a plain POST to FormSubmit, which redirects to /thank-you/.
 * - With JavaScript: inline validation, background send to FormSubmit's AJAX
 *   endpoint (20 s timeout), then a client-side move to /thank-you/.
 */
export function EnquiryForm({ compact = false, defaultSubject = '', sourcePath }: EnquiryFormProps) {
  const formId = useId().replace(/:/g, '');
  const router = useRouter();
  const shownAt = useRef(0);
  const [enhanced, setEnhanced] = useState(false);
  const [values, setValues] = useState<EnquiryValues>(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<Exclude<SendResult, { ok: true }> | null>(null);
  const [tooFast, setTooFast] = useState(false);
  const [minDate, setMinDate] = useState('');

  const formType = defaultSubject ? `Service enquiry — ${defaultSubject}` : 'Contact form';
  const topic = defaultSubject || 'Contact form';
  const span = compact ? '' : 'md:col-span-2';

  useEffect(() => {
    shownAt.current = Date.now();
    setEnhanced(true);
    setMinDate(todayIso());
  }, []);

  const clearDraft = useDraft(`enquiry-draft:${sourcePath}`, values, (draft) => setValues((prev) => ({ ...prev, ...draft })));
  usePageShowReset(() => setStatus('idle'));

  const update = <K extends keyof EnquiryValues>(field: K, value: EnquiryValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once a field has an error, re-check it as the visitor types so the message clears promptly.
    if (errors[field]) {
      const next = validateEnquiry({ ...values, [field]: value }, [field]);
      setErrors((prev) => ({ ...prev, [field]: next[field] }));
    }
  };

  const validateOnBlur = (field: EnquiryField) => {
    const fieldValue = values[field];
    if (fieldValue === '' || fieldValue === undefined) return; // don't nag about untouched empty fields
    const next = validateEnquiry(values, [field]);
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const textFields = (): Record<string, string> => ({
    name: values.name,
    email: values.email,
    phone: values.phone,
    destination: values.destination ?? '',
    date: values.date ?? '',
    travellers: values.travellers ?? '',
    message: values.message,
    consent: values.consent ? 'Yes — agreed to the privacy policy' : 'No',
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setFailure(null);
    setTooFast(false);

    const found = validateEnquiry(values);
    setErrors(found);
    const first = firstInvalidField(found);
    if (first) {
      setShowSummary(true);
      document.getElementById(fieldId(formId, first))?.focus();
      return;
    }
    setShowSummary(false);

    // Honeypot filled → a bot. Pretend success and send nothing.
    if (honeypot) {
      router.push(THANK_YOU_PATH);
      return;
    }
    // Submitted implausibly fast → probably a bot, but never silently drop a person.
    if (Date.now() - shownAt.current < MIN_FILL_MS) {
      setTooFast(true);
      return;
    }

    setStatus('sending');
    const result = await sendToFormSubmit(
      buildFormSubmitPayload(textFields(), { formType, topic, sourceUrl: window.location.href, honeypot }),
    );
    if (result.ok) {
      clearDraft();
      router.push(THANK_YOU_PATH);
      return;
    }
    setFailure(result);
    setStatus('failed');
  };

  const waHref = whatsappUrl(whatsappMessage(textFields(), formType));

  return (
    <form
      action={FORM_ACTION}
      method="POST"
      noValidate={enhanced}
      onSubmit={onSubmit}
      aria-busy={status === 'sending'}
      className={`relative grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`}
    >
      <FormSubmitHiddenFields subject={buildSubject('website visitor', topic)} formType={formType} sourceUrl={absoluteUrl(sourcePath)} />
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {showSummary && (
        <div className={span}>
          <ErrorSummary formId={formId} errors={errors} labels={LABELS} />
        </div>
      )}

      <FieldShell formId={formId} name="name" label="Name" required error={errors.name}>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={LIMITS.name.min}
          maxLength={LIMITS.name.max}
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          onBlur={() => validateOnBlur('name')}
          className={`${inputClass} border-[var(--line)]`}
          placeholder="Your full name"
          {...describedBy(formId, 'name', errors.name)}
        />
      </FieldShell>

      <FieldShell formId={formId} name="phone" label="Phone" required error={errors.phone} hint="10–15 digits, with country code if outside India">
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          pattern="[0-9+()\-\s]{10,20}"
          maxLength={20}
          value={values.phone}
          onChange={(event) => update('phone', event.target.value)}
          onBlur={() => validateOnBlur('phone')}
          className={`${inputClass} border-[var(--line)]`}
          placeholder="e.g. 98765 43210"
          {...describedBy(formId, 'phone', errors.phone, true)}
        />
      </FieldShell>

      <FieldShell formId={formId} name="email" label="Email" required error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={LIMITS.email.max}
          value={values.email}
          onChange={(event) => update('email', event.target.value)}
          onBlur={() => validateOnBlur('email')}
          className={`${inputClass} border-[var(--line)]`}
          placeholder="you@example.com"
          {...describedBy(formId, 'email', errors.email)}
        />
      </FieldShell>

      <FieldShell formId={formId} name="destination" label="Destination" error={errors.destination}>
        <input
          name="destination"
          type="text"
          maxLength={LIMITS.destination.max}
          value={values.destination}
          onChange={(event) => update('destination', event.target.value)}
          onBlur={() => validateOnBlur('destination')}
          className={`${inputClass} border-[var(--line)]`}
          placeholder="Where do you want to go?"
          {...describedBy(formId, 'destination', errors.destination)}
        />
      </FieldShell>

      <FieldShell formId={formId} name="date" label="Travel date" error={errors.date}>
        <input
          name="date"
          type="date"
          min={minDate || undefined}
          value={values.date}
          onChange={(event) => update('date', event.target.value)}
          onBlur={() => validateOnBlur('date')}
          className={`${inputClass} border-[var(--line)]`}
          {...describedBy(formId, 'date', errors.date)}
        />
      </FieldShell>

      <FieldShell formId={formId} name="travellers" label="Travellers" error={errors.travellers}>
        <input
          name="travellers"
          type="number"
          inputMode="numeric"
          min={LIMITS.travellers.min}
          max={LIMITS.travellers.max}
          value={values.travellers}
          onChange={(event) => update('travellers', event.target.value)}
          onBlur={() => validateOnBlur('travellers')}
          className={`${inputClass} border-[var(--line)]`}
          placeholder="How many people?"
          {...describedBy(formId, 'travellers', errors.travellers)}
        />
      </FieldShell>

      <FieldShell formId={formId} name="message" label="Message" required error={errors.message} className={span}>
        <textarea
          name="message"
          rows={4}
          required
          minLength={LIMITS.message.min}
          maxLength={LIMITS.message.max}
          value={values.message}
          onChange={(event) => update('message', event.target.value)}
          onBlur={() => validateOnBlur('message')}
          className={`${inputClass} border-[var(--line)]`}
          placeholder="Tell us about your travel plans, budget or anything specific"
          {...describedBy(formId, 'message', errors.message)}
        />
      </FieldShell>

      <div className={span}>
        <ConsentField formId={formId} checked={values.consent} error={errors.consent} onChange={(checked) => update('consent', checked)} />
      </div>

      {tooFast && (
        <p role="alert" className={`rounded-xl bg-amber-50 p-3.5 text-sm font-bold text-amber-900 ${span}`}>
          That was very quick — please check your details, then press Send again.
        </p>
      )}

      {failure && (
        <div className={span}>
          <SendFailure reason={failure.reason} message={failureMessage(failure.reason)} whatsappHref={waHref} />
        </div>
      )}

      <div className={`flex flex-col gap-3 sm:flex-row ${span}`}>
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary focus-ring flex-1 disabled:cursor-wait disabled:opacity-70">
          <span className="inline-flex items-center gap-2">
            {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
            {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          </span>
        </button>
        {/* Opens WhatsApp with the message pre-filled. Not subject to the bot timer. */}
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost focus-ring">
          <span className="inline-flex items-center gap-2">
            <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
          </span>
        </a>
      </div>
      <p className={`sr-only ${span}`} aria-live="polite">
        {status === 'sending' ? 'Sending your enquiry…' : ''}
      </p>
    </form>
  );
}
