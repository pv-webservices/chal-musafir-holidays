import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { HomeHero } from '@/components/home/HomeHero';
import { QuickCategories } from '@/components/home/QuickCategories';
import {
  FeaturedPackages,
  HomeFAQ,
  InspirationStrip,
  PilgrimageStrip,
  PopularDestinations,
  PromoBanners,
  ServicesSection,
  TravellerPromise,
  TrustBand,
  WhyChooseUs,
} from '@/components/home/HomeSections';
import { CTASection } from '@/components/ui/CTASection';

export const metadata: Metadata = pageMetadata({
  title: 'Chal Musafir Holidays | Travel & Holiday Planning in Moradabad',
  description: 'Travel agency in Moradabad since 2011: domestic and international holiday packages, air and rail tickets, hotels, cruises, visas and pilgrimage yatras.',
  path: '/', absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <QuickCategories />
      <PopularDestinations />
      <PromoBanners />
      <WhyChooseUs />
      <TrustBand />
      <ServicesSection />
      <FeaturedPackages />
      <PilgrimageStrip />
      <InspirationStrip />
      <TravellerPromise />
      <HomeFAQ />
      <CTASection />
    </>
  );
}
