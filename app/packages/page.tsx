import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { PackageFilters } from '@/components/packages/PackageFilters';
import { CTASection } from '@/components/ui/CTASection';
import { packages } from '@/data/packages';

export const metadata: Metadata = {
  title: 'Holiday Packages',
  description:
    'Browse domestic and international holiday package ideas — family, honeymoon, group, heritage and pilgrimage itineraries — and request a customised quotation.',
  alternates: { canonical: '/packages' },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Holiday packages"
        title="Find a Starting Point for Your Next Trip"
        copy={`${packages.length} itinerary concepts across India and the world. Filter by region, trip type and length, then ask us to shape one around your dates.`}
        image="/images/hero/packages.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Holiday Packages' }]}
      />

      <section className="section-pad">
        <div className="container-shell">
          <PackageFilters />
        </div>
      </section>

      <CTASection />
    </>
  );
}
