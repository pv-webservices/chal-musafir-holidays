import type { Metadata } from 'next';
import { Baby, Bed, Soup, Timer } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { PackageCard } from '@/components/ui/PackageCard';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { packages } from '@/data/packages';
import { destinations } from '@/data/destinations';

export const metadata: Metadata = {
  title: 'Family Packages',
  description: 'Family holiday planning with sensible pacing, the right room configuration and activities that work for every age in the group.',
  alternates: { canonical: '/family-packages' },
};

const familySlugs = ['singapore', 'dubai', 'kerala', 'goa', 'himachal-pradesh', 'malaysia', 'uttarakhand', 'thailand'];

const considerations = [
  { icon: Timer, title: 'Sensible pacing', copy: 'Shorter driving days and a free afternoon built in — not six monuments before lunch.' },
  { icon: Bed, title: 'Right room mix', copy: 'Connecting rooms, extra beds or a family suite, confirmed before you pay.' },
  { icon: Soup, title: 'Food that works', copy: 'Indian meal options arranged abroad, and vegetarian or Jain food flagged in advance.' },
  { icon: Baby, title: 'Every age covered', copy: 'Stroller-friendly routes for toddlers, lifts and easy walks for grandparents.' },
];

export default function FamilyPage() {
  const list = destinations.filter((item) => familySlugs.includes(item.slug));
  const familyPackages = packages.filter((item) => item.type === 'Family');
  const others = packages.filter((item) => item.type !== 'Family').slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Family holidays"
        title="More Time Together, Less Travel Friction"
        copy="Family trips fail on logistics, not destinations. We plan around the ages, the appetites and the energy levels in your group."
        image="/images/hero/family.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Family Packages' }]}
      >
        <ButtonLink href="/quote?trip=Family" variant="primary" size="lg" withArrow>
          Plan a Family Trip
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What we get right"
            title="The details that make a family trip work"
            align="center"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {considerations.map(({ icon: Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 80}>
                <article className="card-motion card-rim group relative h-full overflow-hidden rounded-[24px] border border-[var(--line)] bg-white p-7 soft-shadow">
                  <span className="icon-tile flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-black">{title}</h3>
                  <p className="mt-2.5 text-sm leading-6 text-slate-500">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Family-friendly destinations"
            title="Places that work for every age"
            action={{ label: 'All destinations', href: '/destinations' }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 4) * 70}>
                <DestinationCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Starting points"
            title="Family itinerary ideas"
            copy="Final hotels, room configuration, transfers and activities are chosen once we know the ages and what the group actually enjoys."
            action={{ label: 'All packages', href: '/packages' }}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...familyPackages, ...others].map((item, index) => (
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
