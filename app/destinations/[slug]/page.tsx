import type { Metadata } from 'next';
import { clampDescription, pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock3, Compass, MapPinned, Sparkles } from 'lucide-react';
import { destinations, getDestination } from '@/data/destinations';
import { packages } from '@/data/packages';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PackageCard } from '@/components/ui/PackageCard';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ButtonLink } from '@/components/ui/Buttons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CTASection } from '@/components/ui/CTASection';
import { site } from '@/data/site';

export function generateStaticParams() {
  return destinations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getDestination(slug);
  if (!item) return {};
  return pageMetadata({
    title: `${item.name} Holidays`,
    description: clampDescription(item.overview),
    path: `/destinations/${item.slug}`,
    image: item.image,
    imageAlt: `${item.name} — ${item.subtitle}`,
  });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getDestination(slug);
  if (!item) notFound();

  const related = packages.filter((pkg) => pkg.destinationSlug === item.slug);
  const siblings = destinations.filter((other) => other.region === item.region && other.slug !== item.slug).slice(0, 5);

  return (
    <>
      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
        <Image src={item.image} alt="" fill loading="eager" className="object-cover opacity-25 blur-sm" sizes="480px" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041c33]/92 via-[#052a49]/88 to-[#041c33]" />

        <div className="container-shell relative z-10 py-12 md:py-16">
          <Breadcrumb
            tone="dark"
            items={[
              { label: 'Home', href: '/' },
              { label: item.region === 'domestic' ? 'Domestic' : 'International', href: item.region === 'domestic' ? '/domestic/' : '/international/' },
              { label: item.name },
            ]}
          />

          <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-300 md:text-sm">{item.subtitle}</p>
              <h1 className="mt-3 text-5xl font-black leading-[0.92] tracking-[-0.055em] md:text-7xl">{item.name}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-blue-50/90 md:text-lg">{item.overview}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {item.tripStyles.map((style) => (
                  <span key={style} className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-wide">
                    {style}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={`/quote/?destination=${encodeURIComponent(item.name)}`} variant="primary" size="lg" withArrow>
                  Request Itinerary
                </ButtonLink>
                <ButtonLink href={`tel:${site.primaryPhone}`} variant="on-dark" size="lg">
                  Call {site.phones[0]}
                </ButtonLink>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:max-w-none">
              <Image src={item.image} alt={`${item.name} — ${item.subtitle}`} fill loading="eager" fetchPriority="high" className="object-cover" sizes="(max-width: 1024px) 90vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="section-pad-sm">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          <Fact icon={CalendarDays} label="Best time to visit" value={item.bestTime} />
          <Fact icon={Clock3} label="Suggested duration" value={item.duration} />
          <Fact icon={MapPinned} label="Trip type" value={item.region === 'domestic' ? 'Domestic holiday' : 'International holiday'} />
        </div>
      </section>

      {/* Attractions + things to do */}
      <section className="section-pad pt-4">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="section-title text-3xl md:text-4xl">
              <span className="title-rule">Top attractions</span>
            </h2>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {item.attractions.map((attraction) => (
                <li
                  key={attraction}
                  className="card-motion flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-5 font-black soft-shadow"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--brand-red)]" aria-hidden />
                  {attraction}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="section-title text-3xl md:text-4xl">
              <span className="title-rule">Things to do</span>
            </h2>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {item.thingsToDo.map((thing) => (
                <li
                  key={thing}
                  className="card-motion flex items-center gap-3 rounded-2xl bg-[var(--surface-alt)] p-5 font-black text-[var(--brand-blue-dark)]"
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-[var(--brand-orange)]" aria-hidden />
                  {thing}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-[var(--surface)]">
          <div className="container-shell">
            <SectionHeading eyebrow="Ready to go" title={`${item.name} packages`} action={{ label: 'All packages', href: '/packages/' }} />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((pkg) => (
                <PackageCard key={pkg.slug} item={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ + custom CTA */}
      <section className="section-pad">
        <div className="container-shell grid gap-9 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <h2 className="section-title text-3xl md:text-4xl">
              <span className="title-rule">Travel tips &amp; FAQ</span>
            </h2>
            <div className="mt-12">
              <FAQAccordion
                items={[
                  {
                    q: `How many days should I plan for ${item.name}?`,
                    a: `${item.duration} is a practical starting point. The exact length depends on your arrival city, the traveller mix and which experiences you want to include.`,
                  },
                  {
                    q: `When is the best time to visit ${item.name}?`,
                    a: `${item.bestTime} is the usual planning window. We still check conditions for your exact dates before confirming anything.`,
                  },
                  {
                    q: 'Can the itinerary be customised?',
                    a: 'Yes. The trip planner collects your dates, budget, hotel preference and interests so the route is built for you rather than adapted from a template.',
                  },
                  {
                    q: 'What does the quotation include?',
                    a: 'Stay, transfers, listed sightseeing and coordinator support as standard. Flights, entry tickets and optional activities are quoted separately so you can see exactly what you are paying for.',
                  },
                ]}
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="sticky top-28 overflow-hidden rounded-[28px] bg-[var(--brand-navy)] p-8 text-white">
              <Compass className="h-10 w-10 text-orange-300" aria-hidden />
              <h2 className="mt-5 text-3xl font-black leading-tight">Want a custom {item.name} itinerary?</h2>
              <p className="mt-4 leading-7 text-blue-100/85">
                Share your dates and who is travelling — we will build the route around them and come back with a written quotation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/quote/?destination=${encodeURIComponent(item.name)}`} variant="primary" withArrow>
                  Request Itinerary
                </ButtonLink>
                <ButtonLink href="/contact/" variant="on-dark">
                  Contact Us
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="section-pad bg-[var(--surface)]">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Keep exploring"
              title={item.region === 'domestic' ? 'More of India' : 'More of the world'}
              action={{ label: 'All destinations', href: '/destinations/' }}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {siblings.map((sibling) => (
                <DestinationCard key={sibling.slug} item={sibling} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof CalendarDays; label: string; value: string }) {
  return (
    <div className="card-motion rounded-[24px] border border-[var(--line)] bg-white p-6 soft-shadow">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--brand-blue)]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="mt-4 text-xs font-black uppercase tracking-wide text-slate-600">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
