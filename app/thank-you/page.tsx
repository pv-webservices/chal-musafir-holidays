import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Mail, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Buttons';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { site, whatsappUrl } from '@/data/site';
import { noindexMetadata } from '@/lib/seo';

// Utility page: noindex, no canonical, not in the sitemap.
export const metadata: Metadata = noindexMetadata(
  'Thank You',
  'Your enquiry has been sent to Chal Musafir Holidays. Here is what happens next and how to reach us directly.',
);

const nextLinks = [
  ['Holiday packages', '/packages/'],
  ['All destinations', '/destinations/'],
  ['Travel services', '/services/'],
  ['Pilgrimage yatras', '/pilgrimage-packages/'],
] as const;

export default function ThankYouPage() {
  return (
    <section className="section-pad bg-[var(--surface)]">
      <div className="container-shell max-w-3xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-white">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">Thank you — your enquiry has been sent</h1>
        <p className="section-copy mx-auto mt-5 max-w-xl">
          It is now with the {site.name} team, who will reply using the phone number or email you gave us. If your trip is
          urgent, call or WhatsApp us directly.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary" withArrow>
            Back to Home
          </ButtonLink>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost focus-ring">
            <span className="inline-flex items-center gap-2">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </span>
          </a>
        </div>

        <div className="mt-10 grid gap-3 text-sm font-bold sm:grid-cols-2">
          <a href={`tel:${site.primaryPhone}`} className="focus-ring flex items-center justify-center gap-2 rounded-2xl bg-white p-4 soft-shadow">
            <Phone className="h-4 w-4 text-[var(--brand-blue)]" aria-hidden /> +91 {site.phones[0]}
          </a>
          <a href={`mailto:${site.email}`} className="focus-ring flex items-center justify-center gap-2 break-all rounded-2xl bg-white p-4 soft-shadow">
            <Mail className="h-4 w-4 shrink-0 text-[var(--brand-blue)]" aria-hidden /> {site.email}
          </a>
        </div>

        <h2 className="mt-12 text-xl font-black">While you wait</h2>
        <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
          {nextLinks.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="focus-ring inline-flex min-h-11 items-center rounded-full border border-[var(--line)] bg-white px-5 text-sm font-bold hover:border-[var(--brand-blue)]">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
