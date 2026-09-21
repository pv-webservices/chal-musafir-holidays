import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Clock, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Reveal } from '@/components/ui/Reveal';
import { site, whatsappUrl } from '@/data/site';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: 'Plan a domestic, international, honeymoon, family, group or pilgrimage trip with Chal Musafir Holidays in seven short steps.',
  alternates: { canonical: '/quote' },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Trip planner"
        title="Plan My Trip"
        copy="Seven short questions so we can build a relevant itinerary instead of guessing what you need. It takes about two minutes."
        image="/images/hero/contact.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Get a Quote' }]}
      />

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_300px]">
          <Suspense
            fallback={
              <div className="rounded-[30px] border border-[var(--line)] bg-white p-9 text-slate-500 card-shadow">Loading trip planner…</div>
            }
          >
            <QuoteForm />
          </Suspense>

          <Reveal delay={120}>
            <aside className="sticky top-28 grid gap-4">
              <div className="rounded-[24px] border border-[var(--line)] bg-white p-6 soft-shadow">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--brand-blue)]">
                  <Clock className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-4 text-lg font-black">What happens next</h2>
                <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
                  <li>1. We read your request and check practical options.</li>
                  <li>2. You get a call or email — usually the same working day.</li>
                  <li>3. We send a written itinerary and quotation to refine together.</li>
                </ol>
              </div>

              <div className="rounded-[24px] bg-[var(--brand-navy)] p-6 text-white">
                <h2 className="text-lg font-black">Prefer to talk?</h2>
                <p className="mt-2 text-sm leading-6 text-blue-100/85">Our office is open through the week. Call or message any time.</p>
                <div className="mt-5 grid gap-2.5">
                  <a href={`tel:${site.primaryPhone}`} className="btn btn-on-dark btn-sm focus-ring w-full">
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" aria-hidden /> {site.phones[0]}
                    </span>
                  </a>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-on-dark btn-sm focus-ring w-full">
                    <span className="inline-flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                    </span>
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
