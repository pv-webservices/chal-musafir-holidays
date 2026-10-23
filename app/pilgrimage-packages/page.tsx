import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { CalendarRange, Clock3, Info, MapPin } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { PackageCard } from '@/components/ui/PackageCard';
import { yatras } from '@/data/pilgrimage';
import { packages } from '@/data/packages';

export const metadata: Metadata = pageMetadata({
  title: 'Pilgrimage Packages',
  description: 'Pilgrimage yatra planning for Mata Vaishno Devi, Shirdi, Chardham, the Amarnath helicopter yatra and Kailash Mansarovar — permits, stays and transport arranged.',
  path: '/pilgrimage-packages', image: '/images/hero/pilgrimage.webp',
});

export default function PilgrimagePage() {
  const pilgrimagePackages = packages.filter((item) => item.type === 'Pilgrimage');

  return (
    <>
      <PageHero
        eyebrow="Pilgrimage travel"
        title="Plan Sacred Journeys with Practical Support"
        copy="Registration, permits, hill-safe vehicles and stays close to the temple — the parts of a yatra that are genuinely difficult to arrange from home."
        image="/images/hero/pilgrimage.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Pilgrimage Packages' }]}
      >
        <ButtonLink href="/quote/?trip=Pilgrimage" variant="primary" size="lg" withArrow>
          Request a Yatra Itinerary
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Yatra routes"
            title="The five yatras we plan"
            copy="Schedules, permits, seasonal access and fitness requirements vary considerably by route — so each one is quoted individually rather than sold off a shelf."
          />

          <div className="grid gap-8">
            {yatras.map((yatra, index) => (
              <Reveal key={yatra.slug} delay={index * 70}>
                <article
                  id={yatra.slug}
                  className="card-motion group grid scroll-mt-28 overflow-hidden rounded-[28px] border border-[var(--line)] bg-white soft-shadow lg:grid-cols-[minmax(0,380px)_1fr]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                    <Image
                      src={yatra.image}
                      alt={yatra.name}
                      fill
                      className="card-zoom object-cover"
                      sizes="(max-width: 1024px) 100vw, 380px"
                    />
                  </div>

                  <div className="p-7 md:p-9">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-alt)] px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-[var(--brand-blue)]">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {yatra.location}
                    </span>
                    <h3 className="mt-4 text-2xl font-black md:text-3xl">{yatra.name}</h3>
                    <p className="section-copy mt-3 text-[15px]">{yatra.summary}</p>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <CalendarRange className="h-4 w-4 text-[var(--brand-orange)]" aria-hidden />
                        {yatra.season}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-[var(--brand-orange)]" aria-hidden />
                        {yatra.duration}
                      </span>
                    </div>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {yatra.highlights.map((highlight) => (
                        <li key={highlight} className="rounded-full bg-[var(--surface)] px-3.5 py-1.5 text-xs font-bold text-slate-600">
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 flex gap-2.5 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-900">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden />
                      {yatra.notes}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <ButtonLink href={`/quote/?trip=Pilgrimage&destination=${encodeURIComponent(yatra.name)}`} variant="primary" withArrow>
                        Request Itinerary
                      </ButtonLink>
                      <ButtonLink href="/contact/" variant="ghost">
                        Ask a Question
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {pilgrimagePackages.length > 0 && (
        <section className="section-pad bg-[var(--surface)]">
          <div className="container-shell">
            <SectionHeading eyebrow="Detailed itinerary" title="Yatra packages" action={{ label: 'All packages', href: '/packages/' }} />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pilgrimagePackages.map((item) => (
                <PackageCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
