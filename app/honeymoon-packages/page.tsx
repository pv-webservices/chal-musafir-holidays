import type { Metadata } from 'next';
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
  title: 'Honeymoon Packages',
  description: 'Romantic domestic and international honeymoon packages — Bali, Mauritius, Thailand, Kerala, Himachal and Europe, planned around the two of you.',
  alternates: { canonical: '/honeymoon-packages' },
};

const honeymoonSlugs = ['indonesia', 'mauritius', 'thailand', 'kerala', 'himachal-pradesh', 'goa', 'france', 'sri-lanka'];

const extras = [
  'Honeymoon room decoration on arrival',
  'One candlelight dinner where the property allows',
  'Private transfers instead of shared coaches',
  'Late check-out requested at every stay',
];

export default function HoneymoonPage() {
  const list = destinations.filter((item) => honeymoonSlugs.includes(item.slug));
  const honeymoonPackages = packages.filter((item) => item.type === 'Honeymoon');
  const otherIdeas = packages.filter((item) => item.type !== 'Honeymoon').slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Honeymoon travel"
        title="Trips Designed for Two"
        copy="Build a romantic holiday around the pace, privacy and destinations that suit you — beach, mountain or city, India or abroad."
        image="/images/banners/honeymoon.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Honeymoon Packages' }]}
      >
        <ButtonLink href="/quote?trip=Honeymoon" variant="primary" size="lg" withArrow>
          Plan Our Honeymoon
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Romantic destinations"
            title="Beach, mountain or city — choose the mood first"
            copy="The destination usually follows the feeling you want. Tell us which of these sounds like your first week married."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 4) * 70}>
                <DestinationCard item={item} priority={index < 4} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm">
        <div className="container-shell">
          <Reveal>
            <div className="rounded-[28px] bg-[var(--surface-alt)] p-8 md:p-10">
              <h2 className="text-2xl font-black md:text-3xl">What we add to every honeymoon booking</h2>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {extras.map((extra) => (
                  <li key={extra} className="card-motion rounded-2xl bg-white p-5 font-bold text-slate-700 soft-shadow">
                    {extra}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-slate-500">Subject to property policy — we request them in writing on your behalf, every time.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading eyebrow="Featured" title="Honeymoon itinerary ideas" action={{ label: 'All packages', href: '/packages' }} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...honeymoonPackages, ...otherIdeas].map((item, index) => (
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
