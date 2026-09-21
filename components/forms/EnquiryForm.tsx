'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { site, whatsappUrl } from '@/data/site';

interface EnquiryFormProps {
  compact?: boolean;
  /** Pre-fills the "interested in" field, e.g. a service name. */
  defaultSubject?: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export function EnquiryForm({ compact = false, defaultSubject = '' }: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    setMessage('');

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, enquiryType: defaultSubject || 'General enquiry' }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || 'Unable to send your enquiry.');

      setStatus('success');
      setMessage(
        result?.developmentMode
          ? 'Enquiry validated in development mode. Configure the delivery webhook before launch.'
          : `Thank you — your enquiry has reached us. We usually reply the same working day. For anything urgent, call ${site.phones[0]}.`,
      );
      form.reset();
    } catch (error: unknown) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to send your enquiry.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-[22px] border border-green-200 bg-green-50 p-7 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-black text-green-900">Enquiry sent</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-green-800">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm focus-ring">
            <span>WhatsApp Us</span>
          </a>
          <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost btn-sm focus-ring">
            <span>Send another</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`grid gap-4 ${compact ? '' : 'md:grid-cols-2'}`} noValidate={false}>
      <Field label="Name" name="name" placeholder="Your full name" required />
      <Field label="Phone" name="phone" type="tel" inputMode="tel" placeholder="10-digit mobile number" required pattern="[0-9+\-\s]{10,15}" />
      <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      <Field label="Destination" name="destination" placeholder="Where do you want to go?" defaultValue={defaultSubject && !compact ? '' : undefined} />
      <Field label="Travel date" name="date" type="date" />
      <Field label="Travellers" name="travellers" type="number" min="1" placeholder="How many people?" />

      <label className={compact ? '' : 'md:col-span-2'}>
        <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">Message</span>
        <textarea
          name="message"
          rows={4}
          className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors duration-300 focus:border-[var(--brand-blue)]"
          placeholder="Tell us about your travel plans, budget or anything specific"
        />
      </label>

      {/* Simple honeypot — real people never fill this in. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === 'error' && (
        <p role="alert" className={`rounded-xl bg-red-50 p-3.5 text-sm font-bold text-red-700 ${compact ? '' : 'md:col-span-2'}`}>
          {message}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className={`btn btn-primary focus-ring ${compact ? '' : 'md:col-span-2'}`}>
        <span className="inline-flex items-center gap-2">
          {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </span>
      </button>

      <p className={`text-xs leading-5 text-slate-400 ${compact ? '' : 'md:col-span-2'}`}>
        By sending this form you agree we may contact you about your travel enquiry. See our{' '}
        <a href="/privacy" className="font-bold text-[var(--brand-blue)] underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  ...rest
}: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-500">
        {label}
        {rest.required && <span className="text-[var(--brand-red)]"> *</span>}
      </span>
      <input
        name={name}
        className="focus-ring w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none transition-colors duration-300 focus:border-[var(--brand-blue)]"
        {...rest}
      />
    </label>
  );
}
