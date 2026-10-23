import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { addressLine, mapEmbedUrl, mapLinkUrl, site, whatsappUrl } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Contact Chal Musafir Holidays at A-49 Lajpat Nagar, Behind Bank of Baroda, Moradabad — call, email or WhatsApp for travel planning.',
  path: '/contact', image: '/images/hero/contact.webp',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a Travel Expert"
        copy="Share your destination, dates and who is travelling — we will come back with a route, a scope and a written quotation."
        image="/images/hero/contact.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="section-pad">
        <div className="container-shell grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          {/* Contact details */}
          <Reveal>
            <div className="sticky top-28 overflow-hidden rounded-[28px] bg-[var(--brand-navy)] p-7 text-white md:p-9">
              <h2 className="text-3xl font-black">Contact details</h2>
              <p className="mt-3 text-sm leading-6 text-blue-100/80">
                {site.legalNote} · Serving travellers since {site.established}
              </p>

              <div className="mt-8 grid gap-5">
                <Detail icon={MapPin} label="Office">
                  <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-6 items-center rounded hover:text-white">
                    {addressLine}
                  </a>
                </Detail>

                <Detail icon={Phone} label="Call us">
                  <span className="flex flex-col gap-1">
                    {site.phones.map((phone) => (
                      <a key={phone} href={`tel:+91${phone}`} className="focus-ring inline-flex min-h-6 items-center rounded hover:text-white">
                        +91 {phone}
                      </a>
                    ))}
                  </span>
                </Detail>

                <Detail icon={Mail} label="Email">
                  <a href={`mailto:${site.email}`} className="focus-ring inline-flex min-h-6 items-center break-all rounded hover:text-white">
                    {site.email}
                  </a>
                </Detail>

                <Detail icon={MessageCircle} label="WhatsApp">
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-6 items-center rounded hover:text-white">
                    Message us on +91 {site.phones[0]}
                  </a>
                </Detail>

                <Detail icon={Clock} label="Office hours">
                  Monday to Saturday, 10:00 am – 8:00 pm. Sunday by appointment.
                </Detail>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={whatsappUrl()} variant="primary" withArrow>
                  WhatsApp Us
                </ButtonLink>
                <ButtonLink href="/quote/" variant="on-dark">
                  Plan My Trip
                </ButtonLink>
              </div>

              <p className="font-script mt-9 text-2xl text-orange-300">{site.tagline}</p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 card-shadow md:p-9">
              <h2 className="text-3xl font-black">Send an enquiry</h2>
              <p className="section-copy mt-3 mb-8 text-[15px]">
                Fill this in and we will reply with real options for your dates and budget.
              </p>
              <EnquiryForm sourcePath="/contact/" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="section-pad-sm pb-0">
        <div className="container-shell">
          <Reveal>
            <div className="overflow-hidden rounded-[28px] border border-[var(--line)] card-shadow">
              <iframe
                src={mapEmbedUrl}
                title={`${site.name} office location on Google Maps`}
                className="h-[380px] w-full border-0 md:h-[440px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-[28px] bg-[var(--surface-alt)] p-8 text-center md:p-12">
              <h2 className="text-3xl font-black md:text-4xl">Walk in and plan over a cup of chai</h2>
              <p className="section-copy max-w-2xl">
                Our office is on Lajpat Nagar, right behind Bank of Baroda in Moradabad. Drop in with your dates and we will map out the trip with you.
              </p>
              <ButtonLink href={mapLinkUrl} variant="ocean" size="lg" withArrow>
                Get Directions
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Detail({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-300">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <div className="pt-0.5">
        <p className="text-[11px] font-black uppercase tracking-wider text-blue-200/70">{label}</p>
        <div className="mt-1 text-sm font-bold leading-6 text-blue-50/90">{children}</div>
      </div>
    </div>
  );
}
