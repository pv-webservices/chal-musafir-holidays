import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Buttons';
import { site } from '@/data/site';

// Title, description and the absence of a canonical come from the root
// layout defaults; Next adds <meta name="robots" content="noindex"> and the
// real 404 status itself.

const suggestions = [
  ['Holiday Packages', '/packages/'],
  ['All Destinations', '/destinations/'],
  ['Pilgrimage Yatras', '/pilgrimage-packages/'],
  ['Our Services', '/services/'],
  ['About Us', '/about/'],
  ['Contact Us', '/contact/'],
] as const;

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
      <Image src="/images/hero/gallery.webp" alt="" fill className="object-cover opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041c33]/90 via-[#052a49]/85 to-[#041c33]" />

      <div className="container-shell relative z-10 flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-script text-6xl text-orange-300">404</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-[-0.04em] md:text-6xl">
          This route isn&rsquo;t on our map
        </h1>
        <p className="mt-5 max-w-xl leading-8 text-blue-100">
          The page you were looking for may have moved. Try one of these instead — or tell us where you want to go and we will plan it.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary" size="lg" withArrow>
            Back to Home
          </ButtonLink>
          <ButtonLink href="/quote/" variant="on-dark" size="lg">
            Plan My Trip
          </ButtonLink>
        </div>

        <h2 className="sr-only">Popular sections</h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {suggestions.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className="focus-ring inline-flex min-h-11 items-center rounded-full border border-white/25 bg-white/10 px-5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--brand-blue-dark)]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a href={`tel:${site.primaryPhone}`} className="focus-ring mt-8 inline-flex items-center gap-2 rounded font-bold text-orange-200 hover:text-white">
          <Phone className="h-4 w-4" aria-hidden /> Or call us on +91 {site.phones[0]}
        </a>
      </div>
    </section>
  );
}
