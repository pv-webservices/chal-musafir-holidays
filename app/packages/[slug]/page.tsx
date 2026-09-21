import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock3, MapPin, MessageCircle, Phone, Users, XCircle } from 'lucide-react';
import { getPackage, packages } from '@/data/packages';
import { site, whatsappUrl } from '@/data/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { CTASection } from '@/components/ui/CTASection';

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getPackage(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.overview,
    alternates: { canonical: `/packages/${item.slug}` },
    openGraph: { title: item.title, description: item.overview, images: [item.image] },
  };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getPackage(slug);
  if (!item) notFound();

  const related = packages.filter((pkg) => pkg.slug !== item.slug).slice(0, 3);

  return (
    <>
      <section className="bg-white">
        <div className="container-shell pt-6">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Packages', href: '/packages' }, { label: item.title }]} />
        </div>

        <div className="container-shell pb-10 pt-6">
          <div className="relative min-h-[420px] overflow-hidden rounded-[32px] md:min-h-[520px]">
            <Image src={item.image} alt={item.title} fill preload className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041c33]/92 via-[#041c33]/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-10">
              <div className="flex flex-wrap gap-2">
                <Tag>{item.region}</Tag>
                <Tag>{item.type}</Tag>
              </div>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.045em] md:text-6xl">{item.title}</h1>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-300" aria-hidden />
                  {item.destination}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-orange-300" aria-hidden />
                  {item.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-300" aria-hidden />
                  Ideal for {item.idealFor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-2">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <Block title="Overview">
              <p className="section-copy text-[15px] md:text-base">{item.overview}</p>
            </Block>

            <Block title="Highlights">
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full bg-[var(--surface-alt)] px-4 py-2 text-sm font-black text-[var(--brand-blue)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </Block>

            <Block title="Day-by-day itinerary">
              <ol className="relative space-y-4 border-l-2 border-dashed border-[var(--line)] pl-6">
                {item.itinerary.map((day) => (
                  <li key={day.day} className="relative">
                    <span
                      className="absolute -left-[31px] top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[var(--brand-blue)]"
                      aria-hidden
                    />
                    <Reveal>
                      <article className="card-motion rounded-2xl border border-[var(--line)] bg-white p-5 soft-shadow">
                        <span className="text-xs font-black uppercase tracking-wider text-[var(--brand-red)]">{day.day}</span>
                        <h3 className="mt-1 text-lg font-black">{day.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{day.detail}</p>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </Block>

            <div className="grid gap-6 md:grid-cols-2">
              <List title="Inclusions" icon={CheckCircle2} items={item.inclusions} good />
              <List title="Exclusions" icon={XCircle} items={item.exclusions} />
            </div>

            <Block title="Important notes" className="mt-9">
              <p className="section-copy text-[15px]">
                Final hotels, transport, meals, sightseeing, cancellation terms and price are confirmed in the written quotation you receive after
                enquiring. This page shows the route and scope so you know exactly what you are asking us to price.
              </p>
            </Block>
          </div>

          {/* Sticky enquiry card */}
          <aside>
            <div className="sticky top-28 overflow-hidden rounded-[26px] border border-[var(--line)] bg-white p-6 card-shadow">
              <h2 className="text-2xl font-black">Request this trip</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Ask us to customise this itinerary for your dates, traveller mix and budget — you will get a written quotation back.
              </p>

              <dl className="mt-6 grid gap-3 rounded-2xl bg-[var(--surface)] p-4 text-sm">
                <Row label="Duration" value={item.duration} />
                <Row label="Destination" value={item.destination} />
                <Row label="Trip type" value={item.type} />
                <Row label="Best for" value={item.idealFor} />
              </dl>

              <div className="mt-6 grid gap-2.5">
                <ButtonLink href={`/quote?destination=${encodeURIComponent(item.destination)}&trip=${encodeURIComponent(item.type)}`} variant="primary" className="w-full">
                  Request Quote
                </ButtonLink>
                <a href={`tel:${site.primaryPhone}`} className="btn btn-ghost focus-ring w-full">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" aria-hidden /> Call Expert
                  </span>
                </a>
                <a
                  href={whatsappUrl(`Hi, I'm interested in the "${item.title}" package (${item.duration}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex items-center justify-center gap-2 rounded-full bg-green-50 px-5 py-3.5 text-sm font-extrabold text-green-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                </a>
              </div>

              <Link href={`/destinations/${item.destinationSlug}`} className="link-arrow mt-6">
                Read the {item.destination} guide
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading eyebrow="You might also like" title="Related Packages" action={{ label: 'All packages', href: '/packages' }} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((pkg) => (
              <PackageCard key={pkg.slug} item={pkg} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-white/20 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide glass">{children}</span>;
}

function Block({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`mb-10 ${className}`}>
      <h2 className="section-title mb-10 text-2xl md:text-3xl">
        <span className="title-rule">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-black text-slate-800">{value}</dd>
    </div>
  );
}

function List({ title, items, icon: Icon, good = false }: { title: string; items: string[]; icon: typeof CheckCircle2; good?: boolean }) {
  return (
    <section className="rounded-[24px] border border-[var(--line)] bg-white p-6 soft-shadow">
      <h2 className="text-xl font-black">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((entry) => (
          <li key={entry} className="flex gap-2.5 text-sm leading-6 text-slate-600">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${good ? 'text-green-600' : 'text-slate-400'}`} aria-hidden />
            {entry}
          </li>
        ))}
      </ul>
    </section>
  );
}
