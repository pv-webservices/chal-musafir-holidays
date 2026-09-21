'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { site, whatsappUrl } from '@/data/site';

const tripTypes = ['Domestic', 'International', 'Honeymoon', 'Family', 'Group', 'Pilgrimage', 'Custom'] as const;
const budgets = ['Under ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000 – ₹4,00,000', 'Above ₹4,00,000'] as const;

const TOTAL_STEPS = 7;

type Status = 'idle' | 'sending' | 'success' | 'error';

interface QuoteState {
  tripType: string;
  destination: string;
  from: string;
  to: string;
  adults: string;
  children: string;
  infants: string;
  budget: string;
  preferences: string;
  name: string;
  phone: string;
  email: string;
}

export function QuoteForm() {
  const search = useSearchParams();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState<QuoteState>({
    tripType: search.get('trip') || search.get('service') || '',
    destination: search.get('destination') || '',
    from: '',
    to: '',
    adults: '2',
    children: '0',
    infants: '0',
    budget: '',
    preferences: '',
    name: '',
    phone: '',
    email: '',
  });

  const update = (key: keyof QuoteState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, enquiryType: 'Trip Planner' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || 'Unable to submit your trip request.');
      setStatus('success');
      setMessage(
        result?.developmentMode
          ? 'Trip request validated in development mode. Configure the delivery webhook before launch.'
          : `Thank you. Your trip request is with our team — expect a call or email from ${site.phones[0]} shortly.`,
      );
    } catch (error: unknown) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to submit your trip request.');
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < TOTAL_STEPS) setStep(step + 1);
    else await submit();
  };

  if (status === 'success') {
    return (
      <div className="rounded-[30px] border border-green-200 bg-green-50 p-9 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
          <Check className="h-8 w-8" aria-hidden />
        </span>
        <h2 className="mt-6 text-3xl font-black text-green-900">Trip request received</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-green-800">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl(`Hi, I just submitted a trip request for ${form.destination || 'a holiday'}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary focus-ring">
            <span>Continue on WhatsApp</span>
          </a>
          <a href="/packages" className="btn btn-ghost focus-ring">
            <span>Browse packages meanwhile</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[30px] border border-[var(--line)] bg-white p-5 card-shadow md:p-9">
      {/* progress */}
      <div className="mb-3 flex items-center justify-between text-xs font-black uppercase tracking-wide">
        <span className="text-[var(--brand-blue)]">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="text-slate-400">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
      </div>
      <div className="mb-9 flex gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL_STEPS}>
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${index < step ? 'bg-[var(--brand-blue)]' : 'bg-slate-100'}`}
          />
        ))}
      </div>

      <form onSubmit={onSubmit}>
        {step === 1 && (
          <Step title="What kind of trip are you planning?">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tripTypes.map((type) => (
                <Choice key={type} active={form.tripType === type} onClick={() => update('tripType', type)}>
                  {type}
                </Choice>
              ))}
            </div>
          </Step>
        )}

        {step === 2 && (
          <Step title="Where do you want to go?" hint="A city, a country or just a mood — anything works.">
            <input
              autoFocus
              required
              value={form.destination}
              onChange={(event) => update('destination', event.target.value)}
              className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-4 text-lg outline-none transition-colors focus:border-[var(--brand-blue)]"
              placeholder="e.g. Kerala, Dubai, Bali, Char Dham"
            />
          </Step>
        )}

        {step === 3 && (
          <Step title="When are you travelling?" hint="Approximate dates are fine at this stage.">
            <div className="grid gap-4 sm:grid-cols-2">
              <DateField label="Start date" value={form.from} onChange={(value) => update('from', value)} />
              <DateField label="End date" value={form.to} onChange={(value) => update('to', value)} />
            </div>
          </Step>
        )}

        {step === 4 && (
          <Step title="Who is travelling?">
            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  ['adults', 'Adults'],
                  ['children', 'Children (2–11)'],
                  ['infants', 'Infants (under 2)'],
                ] as const
              ).map(([key, label]) => (
                <label key={key}>
                  <span className="mb-2 block text-sm font-bold">{label}</span>
                  <input
                    type="number"
                    min="0"
                    value={form[key]}
                    onChange={(event) => update(key, event.target.value)}
                    className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors focus:border-[var(--brand-blue)]"
                  />
                </label>
              ))}
            </div>
          </Step>
        )}

        {step === 5 && (
          <Step title="What budget should we plan around?" hint="Total for the whole group, excluding flights unless you say otherwise.">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {budgets.map((budget) => (
                <Choice key={budget} active={form.budget === budget} onClick={() => update('budget', budget)}>
                  {budget}
                </Choice>
              ))}
            </div>
          </Step>
        )}

        {step === 6 && (
          <Step title="Any preferences we should know?" hint="Optional, but the more you tell us the better the first draft will be.">
            <textarea
              value={form.preferences}
              onChange={(event) => update('preferences', event.target.value)}
              rows={6}
              className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors focus:border-[var(--brand-blue)]"
              placeholder="Hotel category, food preferences, accessibility needs, an anniversary, activities you definitely want…"
            />
          </Step>
        )}

        {step === 7 && (
          <Step title="How should we reach you?">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-bold">
                  Name <span className="text-[var(--brand-red)]">*</span>
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors focus:border-[var(--brand-blue)]"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-bold">
                  Phone <span className="text-[var(--brand-red)]">*</span>
                </span>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors focus:border-[var(--brand-blue)]"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-bold">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors focus:border-[var(--brand-blue)]"
                />
              </label>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-400">
              We use these details only to respond to your trip request. See our{' '}
              <a href="/privacy" className="font-bold text-[var(--brand-blue)] underline">
                privacy policy
              </a>
              .
            </p>
          </Step>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-6 rounded-xl bg-red-50 p-3.5 text-sm font-bold text-red-700">
            {message}
          </p>
        )}

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={step === 1 || status === 'sending'}
            onClick={() => setStep(step - 1)}
            className="btn btn-ghost btn-sm focus-ring disabled:pointer-events-none disabled:opacity-30"
          >
            <span className="inline-flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" aria-hidden /> Back
            </span>
          </button>

          <button type="submit" disabled={status === 'sending'} className="btn btn-primary focus-ring disabled:opacity-60">
            <span className="inline-flex items-center gap-2">
              {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {status === 'sending' ? 'Sending…' : step === TOTAL_STEPS ? 'Submit Request' : 'Continue'}
              {step < TOTAL_STEPS && status !== 'sending' && <ChevronRight className="h-4 w-4" aria-hidden />}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Step({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <h2 className="text-2xl font-black leading-tight tracking-tight md:text-3xl">{title}</h2>
      {hint && <p className="mt-2 text-sm text-slate-500">{hint}</p>}
      <div className="mt-7">{children}</div>
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

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors focus:border-[var(--brand-blue)]"
      />
    </label>
  );
}
