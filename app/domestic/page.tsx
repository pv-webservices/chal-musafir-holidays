import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { PackageCard } from '@/components/ui/PackageCard';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { domesticDestinations } from '@/data/destinations';
import { packages } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Domestic Holidays',
  description:
    'Domestic holiday planning across Kerala, Rajasthan, Goa, Himachal, Uttarakhand, Madhya Pradesh, Uttar Pradesh, South India, Eastern India and Maharashtra.',
  alternates: { canonical: '/domestic' },
};

const moods = [
  { label: 'Beach & islands', slugs: 'Goa, Kerala coast, Konkan' },
  { label: 'Hills & snow', slugs: 'Himachal, Uttarakhand, Darjeeling' },
  { label: 'Heritage & forts', slugs: 'Rajasthan, Agra, Khajuraho, Hampi' },
  { label: 'Pilgrimage', slugs: 'Char Dham, Vaishno Devi, Shirdi, Tirupati' },
  { label: 'Wildlife', slugs: 'Bandhavgarh, Kanha, Jim Corbett' },
  { label: 'Weekend breaks', slugs: 'Lonavala, Nainital, Mussoorie' },
];

export default function DomesticPage() {
  const domesticPackages = packages.filter((item) => item.region === 'Domestic');

  return (
    <>
      <PageHero
        eyebrow="India holidays"
        title="Discover Incredible India"
        copy="From backwaters and desert forts to Himalayan valleys and pilgrimage routes — build an India itinerary that matches your pace, not a fixed brochure."
        image="/images/hero/domestic.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Domestic Holidays' }]}
      >
        <ButtonLink href="/quote?trip=Domestic" variant="primary" size="lg" withArrow>
          Plan an India Trip
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Destinations"
            title="Explore India by mood, region and pace"
            copy="Family, honeymoon, adventure, pilgrimage, weekend and group trips all draw from the same destination network — we just weight the route differently."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {domesticDestinations.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 5) * 70}>
                <DestinationCard item={item} priority={index < 5} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm">
        <div className="container-shell">
          <Reveal>
            <div className="rounded-[28px] bg-[var(--surface-alt)] p-7 md:p-10">
              <h2 className="text-2xl font-black md:text-3xl">Not sure where to start? Pick a mood.</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {moods.map((mood) => (
                  <div key={mood.label} className="card-motion rounded-2xl border border-white bg-white p-5 soft-shadow">
                    <h3 className="font-black text-[var(--brand-blue-dark)]">{mood.label}</h3>
                    <p className="mt-1.5 text-sm text-slate-500">{mood.slugs}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <ButtonLink href="/quote?trip=Domestic" variant="ocean" withArrow>
                  Tell us your mood
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Featured itineraries"
            title="Domestic package ideas"
            copy="Itinerary concepts, not fixed offers. Final stays, transport and pricing are confirmed in your written quotation."
            action={{ label: 'All packages', href: '/packages' }}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {domesticPackages.map((item, index) => (
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
