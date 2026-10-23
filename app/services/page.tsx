import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { services } from '@/data/services';
import { site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Travel Services',
  description: 'Air tickets, rail tickets, hotel and resort booking, holiday and group packages, LTC / luxury train tours, cruise holidays, visa assistance and travel insurance.',
  path: '/services', image: '/images/hero/services.webp',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel support"
        title="Services for the Full Journey"
        copy={`Every service printed on our brochure, handled from one desk in Moradabad — ${services.length} of them, from the first ticket to the insurance certificate.`}
        image="/images/hero/services.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      >
        <ButtonLink href="/quote/" variant="primary" size="lg" withArrow>
          Enquire About a Service
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our services"
            title="Travel planning without unnecessary complexity"
            copy={site.promise}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 5) * 70}>
                <ServiceCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <span className="eyebrow">Common questions</span>
            <h2 className="section-title mt-4 text-3xl md:text-4xl">
              <span className="title-rule">How our services work together</span>
            </h2>
            <p className="section-copy mt-10 max-w-md">
              Most travellers need more than one of these. Book the whole trip with us and the tickets, stay, transfers, visa and insurance are
              coordinated by the same person — so nothing falls between two suppliers.
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact/" variant="ocean" withArrow>
                Talk to Our Team
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <FAQAccordion
              items={[
                {
                  q: 'Can I book just one service, like only air tickets?',
                  a: 'Yes. Plenty of our customers only need ticketing or only a hotel. There is no requirement to buy a full package.',
                },
                {
                  q: 'Is availability or price shown live on this site?',
                  a: 'No. We check real supplier rates at the time of enquiry and quote you in writing — nothing here is an automated fare feed.',
                },
                {
                  q: 'Do you handle LTC travel for government employees?',
                  a: 'Yes. We support LTC route requirements and the documentation that goes with them, including approved-route planning.',
                },
                {
                  q: 'What information should I send with an enquiry?',
                  a: 'Destination or route, travel dates, number of travellers and any specific preference — that is enough for us to come back with something useful.',
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
