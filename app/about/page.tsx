import type { Metadata } from 'next';
import Image from 'next/image';
import { Building2, HeartHandshake, Route, Target } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Buttons';
import { CountUp } from '@/components/ui/CountUp';
import { destinations } from '@/data/destinations';
import { services } from '@/data/services';
import { addressLine, site, yearsOfExperience } from '@/data/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Chal Musafir Holidays — a unit of Shirdi Sai Travelease.com, planning domestic and international travel from Moradabad since 2011.',
  alternates: { canonical: '/about' },
};

const values = [
  { icon: Target, title: 'Mission', copy: 'Make travel planning clearer and less stressful through honest guidance, coordinated services and support you can actually reach.' },
  { icon: Route, title: 'Vision', copy: 'To stay the travel partner people in Moradabad and beyond call first — for a weekend in Nainital or a fortnight in Europe.' },
  { icon: HeartHandshake, title: 'How we work', copy: 'Understand the requirement first. Build a realistic route. Confirm the scope in writing. Stay reachable through the trip.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${site.name}`}
        title={`Making Journeys Memorable Since ${site.established}`}
        copy={`${site.legalNote} — a travel partner built on practical planning, customised itineraries and real human support for Indian and international travellers.`}
        image="/images/hero/about.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Story */}
      <section className="section-pad">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Travel planning built around the traveller"
            />
            <p className="section-copy">
              {site.name} has been operating from Lajpat Nagar in Moradabad since {site.established}, as a unit of Shirdi Sai Travelease.com. Over
              those {yearsOfExperience} years the work has stayed the same: holiday planning, ticketing, accommodation, tour packages and the
              paperwork that goes with them — done properly, for people who then send their families to us.
            </p>
            <p className="section-copy mt-4">
              The operating philosophy is straightforward. Understand the destination, the dates, who is travelling, the budget and what actually
              matters to you. Then shape a practical itinerary and coordinate every service the trip needs, from the first ticket to the insurance
              certificate.
            </p>
            <p className="section-copy mt-4">
              The business is run by {site.proprietors.join(' and ')}, and the office door is open — plenty of our travellers still prefer to plan
              across a desk rather than over email.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary" withArrow>
                Visit Our Office
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                What We Offer
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-motion group relative aspect-[4/3] overflow-hidden rounded-[30px]">
              <Image
                src="/images/banners/about-story.webp"
                alt="Traveller at a mountain viewpoint above the clouds"
                fill
                className="card-zoom object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/92 p-5 glass">
                <p className="font-script text-2xl text-[var(--brand-blue-dark)]">{site.tagline}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-wider text-slate-500">{site.promise}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Numbers */}
      <section className="section-pad-sm">
        <div className="container-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: yearsOfExperience, suffix: '+', label: 'Years in business' },
            { value: destinations.length, suffix: '+', label: 'Destinations planned' },
            { value: services.length, suffix: '', label: 'Travel services' },
            { value: site.phones.length, suffix: '', label: 'Direct contact lines' },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <div className="card-motion rounded-[24px] border border-[var(--line)] bg-white p-7 text-center soft-shadow">
                <div className="text-4xl font-black text-[var(--brand-blue)]">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm font-black uppercase tracking-wide text-slate-500">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-[var(--surface)]">
        <div className="container-shell">
          <SectionHeading eyebrow="What drives us" title="Mission, vision and method" align="center" />
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 90}>
                <article className="card-motion card-rim group relative h-full overflow-hidden rounded-[26px] border border-[var(--line)] bg-white p-8 soft-shadow">
                  <span className="icon-tile flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-6 text-2xl font-black">{title}</h2>
                  <p className="section-copy mt-3 text-[15px]">{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="section-pad">
        <div className="container-shell">
          <Reveal>
            <div className="grid items-center gap-8 rounded-[30px] bg-[var(--brand-navy)] p-8 text-white md:grid-cols-[auto_1fr] md:p-12">
              <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-orange-300">
                <Building2 className="h-9 w-9" aria-hidden />
              </span>
              <div>
                <h2 className="text-3xl font-black md:text-4xl">A real office, not just a website</h2>
                <p className="mt-4 max-w-2xl leading-8 text-blue-100/85">
                  {addressLine}. Open Monday to Saturday, 10:00 am to 8:00 pm. Call {site.phones.join(', ')} or email {site.email}.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href="/contact" variant="primary" withArrow>
                    Get Directions
                  </ButtonLink>
                  <ButtonLink href="/quote" variant="on-dark">
                    Plan My Trip
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
