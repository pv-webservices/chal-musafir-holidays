import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Buttons';

const suggestions = [
  ['Holiday Packages', '/packages'],
  ['All Destinations', '/destinations'],
  ['Our Services', '/services'],
  ['Contact Us', '/contact'],
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
        <p className="mt-5 max-w-xl leading-8 text-blue-100/85">
          The page you were looking for may have moved. Try one of these instead — or tell us where you want to go and we will plan it.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary" size="lg" withArrow>
            Back to Home
          </ButtonLink>
          <ButtonLink href="/quote" variant="on-dark" size="lg">
            Plan My Trip
          </ButtonLink>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {suggestions.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="focus-ring inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[var(--brand-blue-dark)]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
