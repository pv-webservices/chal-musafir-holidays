import type { Metadata } from 'next';
import { clampDescription, pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { services, getService } from '@/data/services';
import { PageHero } from '@/components/ui/PageHero';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { CTASection } from '@/components/ui/CTASection';

export function generateStaticParams() {
  return services.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getService(slug);
  if (!item) return {};
  return pageMetadata({
    title: `${item.title} – Travel Service`,
    description: clampDescription(item.overview),
    path: `/services/${item.slug}`,
    image: item.image,
    imageAlt: item.title,
  });
}

const baseFaqs = [
  {
    q: 'Is availability or price shown live on this page?',
    a: 'No. We check live supplier rates when you enquire and send a written quotation, so you never act on a stale number.',
  },
  {
    q: 'Can this be combined with a holiday package?',
    a: 'Yes. Any service can be folded into a wider itinerary, and it usually works out simpler when one person coordinates all of it.',
  },
  {
    q: 'What information should I provide?',
    a: 'Destination or route, travel dates, number of travellers and any specific preference. That is enough to get a useful answer back.',
  },
];

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getService(slug);
  if (!item) notFound();

  const others = services.filter((service) => service.slug !== item.slug).slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="Travel service"
        title={item.title}
        copy={item.overview}
        image={item.image}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: item.title }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/quote/?service=${encodeURIComponent(item.title)}`} variant="primary" size="lg" withArrow>
            Enquire Now
          </ButtonLink>
          <ButtonLink href="/services/" variant="on-dark" size="lg">
            All Services
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="section-title text-2xl md:text-3xl">
              <span className="title-rule">Key benefits</span>
            </h2>
            <ul className="mt-12 grid gap-3">
              {item.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="card-motion flex gap-3 rounded-2xl border border-[var(--line)] bg-white p-5 font-bold soft-shadow"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" aria-hidden />
                  {benefit}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="section-title text-2xl md:text-3xl">
              <span className="title-rule">How the process works</span>
            </h2>
            <ol className="mt-12 space-y-5">
              {item.process.map((step, index) => (
                <li key={step} className="group flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue)] text-sm font-black text-white transition-transform duration-500 group-hover:scale-110">
                    {index + 1}
                  </span>
                  <p className="pt-2 font-bold text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <h2 className="section-title text-2xl md:text-3xl">
              <span className="title-rule">Questions about {item.title.toLowerCase()}</span>
            </h2>
            <div className="mt-12">
              <FAQAccordion items={[...(item.faqs ?? []), ...baseFaqs]} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 card-shadow md:p-8">
              <h2 className="text-2xl font-black">Enquire about {item.title}</h2>
              <p className="section-copy mt-3 mb-7 text-[15px]">
                Send the details and we will come back with real options.
              </p>
              <EnquiryForm compact defaultSubject={item.title} sourcePath={`/services/${item.slug}/`} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Also available" title="Other travel services" action={{ label: 'All services', href: '/services/' }} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {others.map((service) => (
              <ServiceCard key={service.slug} item={service} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
