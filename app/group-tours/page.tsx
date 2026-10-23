import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Bus, ClipboardCheck, Users, Wallet } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { packages } from '@/data/packages';
import { site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Group Packages',
  description: 'Special group packages for families, friends, corporate teams, societies and pilgrimage groups — coordinated end to end.',
  path: '/group-tours', image: '/images/hero/group.webp',
});

const benefits = [
  { icon: Wallet, title: 'Group rates', copy: 'Negotiated air, hotel and coach rates that a single booking cannot get.' },
  { icon: Bus, title: 'Coach coordination', copy: 'The right vehicle size for the group, with luggage capacity planned in.' },
  { icon: ClipboardCheck, title: 'One point of contact', copy: 'The organiser deals with one person, not twelve suppliers.' },
  { icon: Users, title: 'Sub-group flexibility', copy: 'Different rooms, meal plans or optional tours within the same departure.' },
];

const groupTypes = [
  'Extended families travelling together',
  'Friends and college reunions',
  'Corporate offsites and incentive trips',
  'Society, club and association tours',
  'School and college educational trips',
  'Pilgrimage groups and jathas',
];

export default function GroupToursPage() {
  const groupPackages = packages.filter((item) => item.type === 'Group');
  const others = packages.filter((item) => item.type !== 'Group').slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Group travel"
        title="Travel Together Without Losing the Details"
        copy="Route, stays, transfers, meals and sightseeing coordinated around one shared plan — with room for people to do their own thing."
        image="/images/hero/group.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Group Packages' }]}
      >
        <ButtonLink href="/quote/?trip=Group" variant="primary" size="lg" withArrow>
          Get a Group Quote
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Why book as a group" title="What changes when you travel together" align="center" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, copy }, index) => (
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

      <section className="section-pad-sm">
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-8 rounded-[30px] bg-[var(--brand-navy)] p-8 text-white md:grid-cols-2 md:p-12">
              <div>
                <h2 className="text-3xl font-black md:text-4xl">Groups we plan for</h2>
                <p className="mt-4 leading-8 text-blue-100/85">
                  From eight friends to a coach of eighty. Send the group size and travel window and we will come back with a route and a costing.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/quote/?trip=Group" variant="primary" withArrow>
                    Request Group Costing
                  </ButtonLink>
                  <ButtonLink href={`tel:${site.primaryPhone}`} variant="on-dark">
                    Call {site.phones[0]}
                  </ButtonLink>
                </div>
              </div>
              <ul className="grid gap-2.5 self-center">
                {groupTypes.map((type) => (
                  <li key={type} className="rounded-xl bg-white/10 px-5 py-3.5 text-sm font-bold transition-transform duration-300 hover:translate-x-1.5">
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading eyebrow="Starting points" title="Group itinerary concepts" action={{ label: 'All packages', href: '/packages/' }} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...groupPackages, ...others].map((item, index) => (
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
