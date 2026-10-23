import type { Metadata, Viewport } from 'next';
import { Caveat, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileStickyCTA } from '@/components/layout/MobileStickyCTA';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { addressLine, site } from '@/data/site';
import { services } from '@/data/services';
import { absoluteUrl, jsonLd } from '@/lib/seo';

// Variable font: one file serves every weight. 900 (font-black) maps to 800, the family's heaviest.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

// Used only for the italic accent words ("Dream" in the home hero).
const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['900'],
  style: ['italic'],
  variable: '--font-display',
  display: 'swap',
});

// Decorative handwriting — never above-the-fold text on mobile, so not preloaded.
const script = Caveat({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-script',
  display: 'swap',
  preload: false,
});

/**
 * Site-wide defaults. Every real page sets its own title, description,
 * canonical, robots and Open Graph via `pageMetadata()` / `noindexMetadata()`
 * in lib/seo.ts. Nothing here may set a canonical or robots value, because the
 * 404 page inherits this metadata and must carry neither — so the default
 * title and description below are written for that page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `Page Not Found | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: 'The page you were looking for could not be found. Browse holiday packages, destinations and travel services from Chal Musafir Holidays.',
  applicationName: site.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#062846',
  width: 'device-width',
  initialScale: 1,
};

const ORG_ID = `${site.origin}/#organization`;
const personId = (name: string) => `${site.origin}/#person-${name.toLowerCase().replace(/\s+/g, '-')}`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TravelAgency', 'LocalBusiness'],
      '@id': ORG_ID,
      name: site.name,
      alternateName: site.legalNote,
      url: absoluteUrl('/'),
      logo: { '@type': 'ImageObject', url: `${site.origin}${site.logoSquare}`, width: 512, height: 512 },
      image: `${site.origin}/images/og/default.jpg`,
      telephone: site.primaryPhone,
      email: site.email,
      slogan: site.tagline,
      foundingDate: String(site.established),
      founder: site.proprietors.map((name) => ({ '@id': personId(name) })),
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${site.address.line1}, ${site.address.line2}`,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        addressCountry: 'IN',
      },
      contactPoint: site.phones.map((phone) => ({
        '@type': 'ContactPoint',
        telephone: `+91${phone}`,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      })),
      areaServed: ['India', 'Asia', 'Europe', 'Middle East', 'Oceania'],
      makesOffer: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title, description: service.short },
        url: absoluteUrl(`/services/${service.slug}`),
      })),
    },
    {
      '@type': 'WebSite',
      '@id': `${site.origin}/#website`,
      url: absoluteUrl('/'),
      name: site.name,
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
    },
    ...site.proprietors.map((name) => ({
      '@type': 'Person',
      '@id': personId(name),
      name,
      jobTitle: 'Proprietor',
      worksFor: { '@id': ORG_ID },
    })),
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${display.variable} ${script.variable}`} suppressHydrationWarning>
      <body className="pb-[76px] md:pb-0">
        {/* Marks JS as available before first paint; CSS uses it to gate reveal animations. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
        <a
          href="#main"
          className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-5 focus:py-3 focus:font-black focus:shadow-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileStickyCTA />
        <WhatsAppFloat />
        <span className="sr-only">{addressLine}</span>
      </body>
    </html>
  );
}
