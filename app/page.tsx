import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Chal Musafir Holidays | Travel & Holiday Planning in Moradabad',
  description:
    'Domestic and international holiday planning since 2011 — air and rail tickets, hotels and resorts, honeymoon, family, group and pilgrimage packages, cruises, visa assistance and travel insurance.',
  alternates: { canonical: '/' },
};

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
