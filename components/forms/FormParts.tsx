'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { AlertCircle, Mail, Phone, WifiOff } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { site } from '@/data/site';
import { FORMSUBMIT_ENDPOINT, HONEYPOT_FIELD, THANK_YOU_URL, type EnquiryErrors, type EnquiryField, type SendResult } from '@/lib/enquiry';

export const inputClass =
  'focus-ring w-full rounded-xl border bg-white px-4 py-3 outline-none transition-colors duration-300 focus:border-[var(--brand-blue)] aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50/40';

export const fieldId = (formId: string, field: string) => `${formId}-${field}`;
export const errorId = (formId: string, field: string) => `${formId}-${field}-error`;

interface FieldShellProps {
  formId: string;
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + inline error, wired with aria-describedby / aria-invalid by the caller. */
export function FieldShell({ formId, name, label, required, error, hint, className = '', children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={fieldId(formId, name)} className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
        {label}
        {required && (
          <span className="text-[var(--brand-red-dark)]" aria-hidden>
            {' '}
            *
          </span>
        )}
        {!required && <span className="font-bold normal-case tracking-normal text-slate-500"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${fieldId(formId, name)}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      )}
      <p id={errorId(formId, name)} className={`mt-1.5 flex items-start gap-1.5 text-sm font-bold text-red-700 ${error ? '' : 'hidden'}`}>
        {error && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
        {error}
      </p>
    </div>
  );
}

/** aria props for a control, pointing at its error (and hint) text. */
export function describedBy(formId: string, name: string, error?: string, hasHint = false) {
  const ids = [hasHint && !error ? `${fieldId(formId, name)}-hint` : '', error ? errorId(formId, name) : ''].filter(Boolean).join(' ');
  return { id: fieldId(formId, name), 'aria-invalid': error ? true : undefined, 'aria-describedby': ids || undefined } as const;
}

/** Error summary listing every problem, each linking to its field. */
export function ErrorSummary({ formId, errors, labels }: { formId: string; errors: EnquiryErrors; labels: Partial<Record<EnquiryField, string>> }) {
  const entries = Object.entries(errors).filter(([, message]) => message) as [EnquiryField, string][];
  if (entries.length === 0) return null;
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="font-black">
        Please fix {entries.length === 1 ? 'this problem' : `these ${entries.length} problems`} before sending:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {entries.map(([field, message]) => (
          <li key={field}>
            <a href={`#${fieldId(formId, field)}`} className="font-bold underline">
              {labels[field] ?? field}
            </a>
            : {message}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Failure banner. Delivery failures offer phone / WhatsApp / email instead. */
export function SendFailure({ reason, message, whatsappHref }: { reason: Exclude<SendResult, { ok: true }>['reason']; message: string; whatsappHref: string }) {
  const Icon = reason === 'offline' ? WifiOff : AlertCircle;
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="flex items-start gap-2 font-bold">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        {message}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-bold">
        <a href={`tel:${site.primaryPhone}`} className="inline-flex min-h-6 items-center gap-1.5 underline">
          <Phone className="h-4 w-4" aria-hidden /> Call +91 {site.phones[0]}
        </a>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center gap-1.5 underline">
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
        </a>
        <a href={`mailto:${site.email}`} className="inline-flex min-h-6 items-center gap-1.5 break-all underline">
          <Mail className="h-4 w-4" aria-hidden /> {site.email}
        </a>
      </div>
    </div>
  );
}

/** Required consent checkbox linked to the privacy policy. */
export function ConsentField({ formId, checked, error, onChange }: { formId: string; checked: boolean; error?: string; onChange: (checked: boolean) => void }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          value="Yes — agreed to the privacy policy"
          required
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="h-6 w-6 shrink-0 cursor-pointer accent-[var(--brand-blue)]"
          {...describedBy(formId, 'consent', error)}
        />
        <label htmlFor={fieldId(formId, 'consent')} className="cursor-pointer text-sm leading-6 text-slate-700">
          I agree that {site.name} may use these details to reply to my enquiry, as described in the{' '}
          <Link href="/privacy/" className="font-bold text-[var(--brand-blue)] underline">
            privacy policy
          </Link>
          .<span className="text-[var(--brand-red-dark)]" aria-hidden> *</span>
        </label>
      </div>
      <p id={errorId(formId, 'consent')} className={`mt-1.5 flex items-start gap-1.5 text-sm font-bold text-red-700 ${error ? '' : 'hidden'}`}>
        {error && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
        {error}
      </p>
    </div>
  );
}

/**
 * Hidden FormSubmit settings used when the form posts without JavaScript.
 * With JavaScript the same settings travel in the AJAX payload instead.
 */
export function FormSubmitHiddenFields({ subject, formType, sourceUrl }: { subject: string; formType: string; sourceUrl: string }) {
  return (
    <>
      <input type="hidden" name="_subject" value={subject} />
      <input type="hidden" name="_next" value={THANK_YOU_URL} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="Form type" value={formType} />
      <input type="hidden" name="Source page" value={sourceUrl} />
    </>
  );
}

/** Honeypot: off-screen, out of the tab order and hidden from assistive tech. Bots fill it; people never see it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={value} onChange={(event) => onChange(event.target.value)} />
      </label>
    </div>
  );
}

export const FORM_ACTION = FORMSUBMIT_ENDPOINT;

/** Re-enables the form when the visitor returns with the Back button (bfcache restore). */
export function usePageShowReset(reset: () => void) {
  const resetRef = useRef(reset);
  resetRef.current = reset;
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) resetRef.current();
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);
}

/**
 * Keeps an in-progress form in sessionStorage so nothing typed is lost on a
 * failed send, an accidental reload or a trip to the privacy policy and back.
 */
export function useDraft<T extends object>(key: string, value: T, restore: (draft: Partial<T>) => void) {
  const restored = useRef(false);
  const restoreRef = useRef(restore);
  restoreRef.current = restore;

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(key);
      if (saved) restoreRef.current(JSON.parse(saved) as Partial<T>);
    } catch {
      // Storage unavailable (private mode, blocked) — the form still works.
    }
    restored.current = true;
  }, [key]);

  useEffect(() => {
    if (!restored.current) return;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota / privacy-mode errors.
    }
  }, [key, value]);

  return () => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Ignore.
    }
  };
}
