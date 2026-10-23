import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { FileCheck2, Plane, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { PackageCard } from '@/components/ui/PackageCard';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { internationalDestinations } from '@/data/destinations';
import { packages } from '@/data/packages';

export const metadata: Metadata = pageMetadata({
  title: 'International Holidays',
  description: 'International holiday planning for Thailand, Dubai, Singapore, Malaysia, Indonesia, Sri Lanka, Mauritius, France, Europe, the United Kingdom and Australia.',
  path: '/international', image: '/images/hero/international.webp',
});

const support = [
  { icon: FileCheck2, title: 'Visa documentation', copy: 'Country-specific checklists, form guidance and appointment support.' },
  { icon: Plane, title: 'Flights & transfers', copy: 'Routing that suits your budget, with airport transfers arranged at both ends.' },
  { icon: ShieldCheck, title: 'Travel insurance', copy: 'Including the mandatory cover several Schengen and long-haul visas require.' },
];

export default function InternationalPage() {
  const internationalPackages = packages.filter((item) => item.region === 'International');

  return (
    <>
      <PageHero
        eyebrow="International travel"
        title="See More of the World"
        copy="City breaks, island holidays and multi-country circuits — with ticketing, stays, visas and insurance coordinated from one desk."
        image="/images/hero/international.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'International Holidays' }]}
      >
        <ButtonLink href="/quote/?trip=International" variant="primary" size="lg" withArrow>
          Plan an International Trip
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Regions"
            title="International destinations worth building around"
            copy="Southeast Asia, the Middle East, the Indian Ocean, Europe and Oceania — the destinations listed on our brochure, each with a full planning guide."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {internationalDestinations.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 4) * 70}>
                <DestinationCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {support.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} delay={index * 90}>
              <article className="card-motion card-rim group relative h-full overflow-hidden rounded-[24px] border border-[var(--line)] bg-white p-7 soft-shadow">
                <span className="icon-tile flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-black">{title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-500">{copy}</p>
                <Link href="/services/" className="link-arrow mt-4">
                  See all services
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Package ideas"
            title="Start with a practical itinerary concept"
            copy="Each one is a real route we run — use it as written or reshape it around your dates and interests."
            action={{ label: 'All packages', href: '/packages/' }}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {internationalPackages.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 3) * 90}>
                <PackageCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
