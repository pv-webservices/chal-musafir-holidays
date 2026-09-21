import type { Metadata, Viewport } from 'next';
import { Caveat, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';
import { addressLine, site } from '@/data/site';
import { services } from '@/data/services';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['italic', 'normal'],
  variable: '--font-display',
  display: 'swap',
});

const script = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} | Travel & Holiday Planning`,
    template: `%s | ${site.name}`,
  },
  description:
    'Domestic and international travel planning, holiday packages, air and rail tickets, hotels, resorts, cruises, visa assistance and customised trips from Chal Musafir Holidays, Moradabad.',
  keywords: [
    'travel agency Moradabad',
    'Chal Musafir Holidays',
    'holiday packages India',
    'international tour packages',
    'honeymoon packages',
    'pilgrimage yatra packages',
    'air tickets Moradabad',
    'visa assistance',
  ],
  openGraph: {
    title: site.name,
    description: site.tagline,
    url: site.origin,
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.tagline },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#062846',
  width: 'device-width',
  initialScale: 1,
};

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': ['TravelAgency', 'LocalBusiness'],
  '@id': `${site.origin}/#organisation`,
  name: site.name,
  alternateName: site.legalNote,
  url: site.origin,
  telephone: site.phones.map((phone) => `+91-${phone}`),
  email: site.email,
  slogan: site.tagline,
  foundingDate: String(site.established),
  founders: site.proprietors.map((name) => ({ '@type': 'Person', name })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: 'IN',
  },
  areaServed: ['India', 'Asia', 'Europe', 'Middle East', 'Oceania'],
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: service.title, description: service.short },
    url: `${site.origin}/services/${service.slug}`,
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${display.variable} ${script.variable}`}>
      <body className="pb-[68px] md:pb-0">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }} />
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:font-black focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileStickyCTA />
        <span className="sr-only">{addressLine}</span>
      </body>
    </html>
  );
}
