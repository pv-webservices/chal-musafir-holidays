import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { domesticDestinations, internationalDestinations, destinations } from '@/data/destinations';

export const metadata: Metadata = pageMetadata({
  title: 'All Destinations',
  description: 'Every destination Chal Musafir Holidays plans for — Kerala, Rajasthan, Goa, Himachal, Uttarakhand, South India, Thailand, Dubai, Singapore, Europe and more.',
  path: '/destinations', image: '/images/hero/packages.webp',
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where we travel"
        title="Every Destination We Plan"
        copy={`${destinations.length} destinations across India and the world — each with the best season, a realistic duration and what is genuinely worth doing.`}
        image="/images/hero/packages.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#domestic" variant="on-dark">
            Domestic ({domesticDestinations.length})
          </ButtonLink>
          <ButtonLink href="#international" variant="on-dark">
            International ({internationalDestinations.length})
          </ButtonLink>
        </div>
      </PageHero>

      <section id="domestic" className="section-pad scroll-mt-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Incredible India"
            title="Domestic Destinations"
            copy="Beaches, heritage cities, Himalayan valleys, tea country and the pilgrimage circuits — planned end to end from Moradabad."
            action={{ label: 'Domestic holiday ideas', href: '/domestic/' }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {domesticDestinations.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 5) * 70}>
                <DestinationCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="international" className="section-pad scroll-mt-24 bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Around the world"
            title="International Destinations"
            copy="From a four-day Dubai break to a two-week European circuit — with visa, ticketing and insurance handled alongside the itinerary."
            action={{ label: 'International holiday ideas', href: '/international/' }}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {internationalDestinations.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 5) * 70}>
                <DestinationCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
