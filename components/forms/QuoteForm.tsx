'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { whatsappUrl } from '@/data/site';
import {
  LIMITS,
  MIN_FILL_MS,
  THANK_YOU_PATH,
  buildFormSubmitPayload,
  failureMessage,
  firstInvalidField,
  sanitizeText,
  sendToFormSubmit,
  todayIso,
  validateEnquiry,
  whatsappMessage,
  type EnquiryErrors,
  type EnquiryField,
  type SendResult,
} from '@/lib/enquiry';
import { ConsentField, ErrorSummary, FieldShell, Honeypot, SendFailure, describedBy, fieldId, inputClass, useDraft, usePageShowReset } from './FormParts';

const tripTypes = ['Domestic', 'International', 'Honeymoon', 'Family', 'Group', 'Pilgrimage', 'Custom'] as const;
const budgets = ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000 – ₹4,00,000', 'Above ₹4,00,000'] as const;

const TOTAL_STEPS = 7;
const FORM_TYPE = 'Trip planner';

type Status = 'idle' | 'sending' | 'failed';
type QuoteErrors = EnquiryErrors & { adults?: string; children?: string; infants?: string };

interface QuoteState {
  tripType: string;
  destination: string;
  from: string;
  to: string;
  adults: string;
  children: string;
  infants: string;
  budget: string;
  message: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
}

/** Which validation fields belong to each step. */
const STEP_FIELDS: Record<number, EnquiryField[]> = {
  2: ['destination'],
  3: ['date', 'endDate'],
  6: ['message'],
  7: ['name', 'email', 'phone', 'consent'],
};

const LABELS: Partial<Record<EnquiryField, string>> = {
  destination: 'Destination',
  date: 'Start date',
  endDate: 'End date',
  message: 'Trip details',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  consent: 'Consent',
};

/** Seven-step trip planner. Needs JavaScript; the /quote/ page has a plain-form fallback in <noscript>. */
export function QuoteForm() {
  const search = useSearchParams();
  const router = useRouter();
  const formId = useId().replace(/:/g, '');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shownAt = useRef(0);
  const movedStep = useRef(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [failure, setFailure] = useState<Exclude<SendResult, { ok: true }> | null>(null);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [tooFast, setTooFast] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [minDate, setMinDate] = useState('');
  const [form, setForm] = useState<QuoteState>({
    tripType: sanitizeText(search.get('trip') || search.get('service') || '', 60),
    destination: sanitizeText(search.get('destination') || '', LIMITS.destination.max),
    from: '',
    to: '',
    adults: '2',
    children: '0',
    infants: '0',
    budget: '',
    message: '',
    name: '',
    phone: '',
    email: '',
    consent: false,
  });

  useEffect(() => {
    shownAt.current = Date.now();
    setMinDate(todayIso());
  }, []);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (movedStep.current) headingRef.current?.focus();
  }, [step]);

  const clearDraft = useDraft('quote-draft', form, (draft) => setForm((prev) => ({ ...prev, ...draft, consent: false })));
  usePageShowReset(() => setStatus('idle'));

  const update = <K extends keyof QuoteState>(key: K, value: QuoteState[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const asEnquiry = () => ({
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: form.message,
    consent: form.consent,
    destination: form.destination,
    date: form.from,
    endDate: form.to,
  });

  const validateStep = (target: number): QuoteErrors => {
    const found: QuoteErrors = STEP_FIELDS[target] ? validateEnquiry(asEnquiry(), STEP_FIELDS[target]) : {};
    if (target === 2 && !form.destination.trim()) found.destination = 'Please tell us where you would like to go.';
    if (target === 4) {
      const count = (value: string) => (value === '' ? 0 : Number(value));
      (['adults', 'children', 'infants'] as const).forEach((key) => {
        const value = count(form[key]);
        if (!Number.isInteger(value) || value < 0 || value > LIMITS.travellers.max) found[key] = `Enter a number from 0 to ${LIMITS.travellers.max}.`;
      });
      if (!found.adults && count(form.adults) < 1) found.adults = 'At least one adult must be travelling.';
    }
    return found;
  };

  const focusFirst = (found: QuoteErrors) => {
    const travellerKey = (['adults', 'children', 'infants'] as const).find((key) => found[key]);
    const first = travellerKey ?? firstInvalidField(found);
    if (first) document.getElementById(fieldId(formId, first))?.focus();
  };

  const fields = (): Record<string, string> => ({
    tripType: form.tripType,
    destination: form.destination,
    date: form.from,
    endDate: form.to,
    travellers: `${form.adults || 0} adults, ${form.children || 0} children, ${form.infants || 0} infants`,
    budget: form.budget,
    message: form.message,
    name: form.name,
    phone: form.phone,
    email: form.email,
  });

  const submit = async () => {
    if (honeypot) {
      router.push(THANK_YOU_PATH);
      return;
    }
    if (Date.now() - shownAt.current < MIN_FILL_MS) {
      setTooFast(true);
      return;
    }
    setStatus('sending');
    const f = fields();
    const result = await sendToFormSubmit(
      buildFormSubmitPayload(
        {
          name: f.name,
          email: f.email,
          phone: f.phone,
          'Trip type': f.tripType,
          destination: f.destination,
          'Start date': f.date,
          'End date': f.endDate,
          travellers: f.travellers,
          budget: f.budget,
          message: f.message,
          consent: 'Yes — agreed to the privacy policy',
        },
        { formType: FORM_TYPE, topic: `${form.tripType ? `${form.tripType} trip` : 'Trip'} to ${form.destination}`, sourceUrl: window.location.href, honeypot },
      ),
    );
    if (result.ok) {
      clearDraft();
      router.push(THANK_YOU_PATH);
      return;
    }
    setFailure(result);
    setStatus('failed');
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    setTooFast(false);
    setFailure(null);
    const found = validateStep(step);
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      focusFirst(found);
      return;
    }
    if (step < TOTAL_STEPS) {
      movedStep.current = true;
      setStep(step + 1);
    } else await submit();
  };

  const goBack = () => {
    movedStep.current = true;
    setErrors({});
    setStep(step - 1);
  };

  const waHref = whatsappUrl(whatsappMessage(fields(), FORM_TYPE));
  const stepTitles = [
    'What kind of trip are you planning?',
    'Where do you want to go?',
    'When are you travelling?',
    'Who is travelling?',
    'What budget should we plan around?',
    'Tell us about the trip',
    'How should we reach you?',
  ];

  return (
    <div className="rounded-[30px] border border-[var(--line)] bg-white p-5 card-shadow md:p-9">
      <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-wide">
        <span className="text-[var(--brand-blue)]">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="text-slate-500">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
      </div>
      <div
        className="mb-9 flex gap-1.5"
        role="progressbar"
        aria-label="Trip planner progress"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuetext={`Step ${step} of ${TOTAL_STEPS}`}
      >
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <span key={index} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${index < step ? 'bg-[var(--brand-blue)]' : 'bg-slate-100'}`} />
        ))}
      </div>

      <form onSubmit={onSubmit} noValidate aria-busy={status === 'sending'} className="relative">
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <div className="animate-fade-up">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-black leading-tight tracking-tight outline-none md:text-3xl">
            {stepTitles[step - 1]}
          </h2>

          {Object.values(errors).filter(Boolean).length > 1 && (
            <div className="mt-5">
              <ErrorSummary formId={formId} errors={errors} labels={LABELS} />
            </div>
          )}

          <div className="mt-7">
            {step === 1 && (
              <fieldset>
                <legend className="sr-only">Trip type</legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {tripTypes.map((type) => (
                    <Choice key={type} active={form.tripType === type} onClick={() => update('tripType', type)}>
                      {type}
                    </Choice>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <FieldShell formId={formId} name="destination" label="Destination" required error={errors.destination} hint="A city, a country or just a mood — anything works.">
                <input
                  type="text"
                  autoFocus
                  maxLength={LIMITS.destination.max}
                  value={form.destination}
                  onChange={(event) => update('destination', event.target.value)}
                  className={`${inputClass} border-[var(--line)] py-4 text-lg`}
                  placeholder="e.g. Kerala, Dubai, Bali, Char Dham"
                  {...describedBy(formId, 'destination', errors.destination, true)}
                />
              </FieldShell>
            )}

            {step === 3 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldShell formId={formId} name="date" label="Start date" error={errors.date} hint="Approximate dates are fine.">
                  <input
                    type="date"
                    min={minDate || undefined}
                    value={form.from}
                    onChange={(event) => update('from', event.target.value)}
                    className={`${inputClass} border-[var(--line)]`}
                    {...describedBy(formId, 'date', errors.date, true)}
                  />
                </FieldShell>
                <FieldShell formId={formId} name="endDate" label="End date" error={errors.endDate}>
                  <input
                    type="date"
                    min={form.from || minDate || undefined}
                    value={form.to}
                    onChange={(event) => update('to', event.target.value)}
                    className={`${inputClass} border-[var(--line)]`}
                    {...describedBy(formId, 'endDate', errors.endDate)}
                  />
                </FieldShell>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-4 sm:grid-cols-3">
                {(
                  [
                    ['adults', 'Adults'],
                    ['children', 'Children (2–11)'],
                    ['infants', 'Infants (under 2)'],
                  ] as const
                ).map(([key, label]) => (
                  <FieldShell key={key} formId={formId} name={key} label={label} required={key === 'adults'} error={errors[key]}>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={key === 'adults' ? 1 : 0}
                      max={LIMITS.travellers.max}
                      value={form[key]}
                      onChange={(event) => update(key, event.target.value)}
                      className={`${inputClass} border-[var(--line)]`}
                      {...describedBy(formId, key, errors[key])}
                    />
                  </FieldShell>
                ))}
              </div>
            )}

            {step === 5 && (
              <fieldset>
                <legend className="mb-4 text-sm text-slate-600">Total for the whole group, excluding flights unless you say otherwise. Optional.</legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {budgets.map((budget) => (
                    <Choice key={budget} active={form.budget === budget} onClick={() => update('budget', budget)}>
                      {budget}
                    </Choice>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 6 && (
              <FieldShell
                formId={formId}
                name="message"
                label="Trip details"
                required
                error={errors.message}
                hint="Hotel category, food preferences, accessibility needs, an anniversary, activities you definitely want…"
              >
                <textarea
                  value={form.message}
                  onChange={(event) => update('message', event.target.value)}
                  rows={6}
                  maxLength={LIMITS.message.max}
                  className={`${inputClass} border-[var(--line)]`}
                  {...describedBy(formId, 'message', errors.message, true)}
                />
              </FieldShell>
            )}

            {step === 7 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldShell formId={formId} name="name" label="Name" required error={errors.name}>
                  <input
                    type="text"
                    autoComplete="name"
                    maxLength={LIMITS.name.max}
                    value={form.name}
                    onChange={(event) => update('name', event.target.value)}
                    className={`${inputClass} border-[var(--line)]`}
                    {...describedBy(formId, 'name', errors.name)}
                  />
                </FieldShell>
                <FieldShell formId={formId} name="phone" label="Phone" required error={errors.phone} hint="10–15 digits">
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={form.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    className={`${inputClass} border-[var(--line)]`}
                    {...describedBy(formId, 'phone', errors.phone, true)}
                  />
                </FieldShell>
                <FieldShell formId={formId} name="email" label="Email" required error={errors.email} className="sm:col-span-2">
                  <input
                    type="email"
                    autoComplete="email"
                    maxLength={LIMITS.email.max}
                    value={form.email}
                    onChange={(event) => update('email', event.target.value)}
                    className={`${inputClass} border-[var(--line)]`}
                    {...describedBy(formId, 'email', errors.email)}
                  />
                </FieldShell>
                <div className="sm:col-span-2">
                  <ConsentField formId={formId} checked={form.consent} error={errors.consent} onChange={(checked) => update('consent', checked)} />
                </div>
              </div>
            )}
          </div>
        </div>

        {tooFast && (
          <p role="alert" className="mt-6 rounded-xl bg-amber-50 p-3.5 text-sm font-bold text-amber-900">
            That was very quick — please check your details, then press Submit again.
          </p>
        )}

        {failure && (
          <div className="mt-6">
            <SendFailure reason={failure.reason} message={failureMessage(failure.reason)} whatsappHref={waHref} />
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={step === 1 || status === 'sending'}
            onClick={goBack}
            className="btn btn-ghost btn-sm focus-ring disabled:pointer-events-none disabled:opacity-40"
          >
            <span className="inline-flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" aria-hidden /> Back
            </span>
          </button>

          <div className="flex flex-wrap gap-3">
            {step === TOTAL_STEPS && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost focus-ring">
                <span className="inline-flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4" /> Send via WhatsApp
                </span>
              </a>
            )}
            <button type="submit" disabled={status === 'sending'} className="btn btn-primary focus-ring disabled:cursor-wait disabled:opacity-70">
              <span className="inline-flex items-center gap-2">
                {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {status === 'sending' ? 'Sending…' : step === TOTAL_STEPS ? 'Submit Request' : 'Continue'}
                {step < TOTAL_STEPS && status !== 'sending' && <ChevronRight className="h-4 w-4" aria-hidden />}
              </span>
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {status === 'sending' ? 'Sending your trip request…' : ''}
        </p>
      </form>
    </div>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring rounded-2xl border-2 p-4 text-left text-sm font-extrabold transition-all duration-300 hover:-translate-y-0.5 ${
        active
          ? 'border-[var(--brand-blue)] bg-[var(--surface-alt)] text-[var(--brand-blue)] shadow-lg shadow-blue-500/15'
          : 'border-[var(--line)] bg-white text-slate-700 hover:border-blue-200'
      }`}
    >
      {children}
    </button>
  );
}
