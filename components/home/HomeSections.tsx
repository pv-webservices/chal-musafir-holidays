import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  Compass,
  Globe2,
  Headphones,
  MessageSquareQuote,
  Plane,
  Route,
  Settings2,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { destinations, featuredDestinations } from '@/data/destinations';
import { services } from '@/data/services';
import { packages } from '@/data/packages';
import { yatras } from '@/data/pilgrimage';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { site, yearsOfExperience } from '@/data/site';
import { DestinationCard } from '@/components/ui/DestinationCard';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { PackageCard } from '@/components/ui/PackageCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Buttons';
import { Reveal } from '@/components/ui/Reveal';
import { Rail } from '@/components/ui/Rail';
import { CountUp } from '@/components/ui/CountUp';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

/* ------------------------------------------------------------------ */
export function PopularDestinations() {
  return (
    <section className="section-pad bg-[var(--surface)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Explore places"
          title="Popular Destinations"
          copy="A snapshot of where we send travellers most often. Every destination below has a full guide with the best season, suggested duration and what to actually do there."
          action={{ label: 'View All Destinations', href: '/destinations' }}
        />
        <Rail label="Popular destinations" itemClassName="w-[240px] sm:w-[260px]">
          {featuredDestinations.map((item) => (
            <DestinationCard key={item.slug} item={item} />
          ))}
        </Rail>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function PromoBanners() {
  const thumbs = destinations.filter((item) => ['france', 'dubai', 'thailand', 'singapore'].includes(item.slug));

  return (
    <section className="section-pad-sm">
      <div className="container-shell grid gap-5 lg:grid-cols-2">
        {/* Honeymoon */}
        <Reveal>
          <article className="card-motion group relative flex min-h-[400px] overflow-hidden rounded-[28px]">
            <Image
              src="/images/banners/honeymoon.webp"
              alt="Couple watching the sunset over a tropical bay"
              fill
              className="card-zoom object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
            <div className="relative z-10 flex max-w-sm flex-col justify-center p-8 md:p-10">
              <span className="font-display text-3xl font-black italic leading-tight tracking-tight text-[var(--brand-red)] md:text-4xl">
                Special
                <br />
                Honeymoon Packages
              </span>
              <p className="mt-4 leading-7 text-slate-700">Romantic getaways for a lifetime of memories — Bali, Mauritius, Kerala, Himachal and more.</p>
              <div className="mt-7">
                <ButtonLink href="/honeymoon-packages" variant="primary" withArrow>
                  View Packages
                </ButtonLink>
              </div>
            </div>
          </article>
        </Reveal>

        {/* International */}
        <Reveal delay={120}>
          <article className="card-motion group relative flex min-h-[400px] overflow-hidden rounded-[28px] bg-[var(--brand-blue-dark)]">
            <Image
              src="/images/banners/international.webp"
              alt="The Eiffel Tower at golden hour with a passenger jet overhead"
              fill
              className="card-zoom object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#073b67]/95 via-[#073b67]/70 to-transparent" />
            <div className="relative z-10 flex w-full flex-col justify-between gap-6 p-8 text-white md:p-10">
              <div className="max-w-sm">
                <h3 className="font-display text-3xl font-black italic leading-tight tracking-tight md:text-4xl">
                  International
                  <br />
                  Holidays
                </h3>
                <p className="mt-4 leading-7 text-blue-50/90">Explore the world with {site.name} — visa, tickets, stays and sightseeing handled together.</p>
                <div className="mt-6">
                  <ButtonLink href="/international" variant="on-dark" withArrow>
                    View Packages
                  </ButtonLink>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {thumbs.map((thumb) => (
                  <Link
                    key={thumb.slug}
                    href={`/destinations/${thumb.slug}`}
                    className="focus-ring relative aspect-square overflow-hidden rounded-xl border-2 border-white/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-white"
                    aria-label={thumb.name}
                  >
                    <Image src={thumb.image} alt={thumb.name} fill className="object-cover" sizes="100px" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1 py-1 text-center text-[9px] font-black uppercase tracking-wide">
                      {thumb.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
const benefits = [
  { label: 'Competitive Prices', icon: Tag, copy: 'Quality trips at genuinely fair rates — that is the promise printed on our card.' },
  { label: 'Personalised Itineraries', icon: Settings2, copy: 'Built around your dates, pace and budget instead of a fixed template.' },
  { label: 'Trusted Travel Partner', icon: ShieldCheck, copy: `Operating from Moradabad since ${site.established} — a real office you can walk into.` },
  { label: 'Responsive Support', icon: Headphones, copy: 'One coordinator you can call or WhatsApp before and during the trip.' },
  { label: 'Wide Range of Destinations', icon: Globe2, copy: 'From Vaishno Devi to Europe — India and international under one roof.' },
  { label: 'Hassle-Free Booking', icon: BadgeCheck, copy: 'Tickets, hotels, transfers, visa and insurance coordinated together.' },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Travel with confidence"
          title={`Why Choose ${site.name}?`}
          copy="A human-led travel planning experience built on clarity, customisation and practical support before, during and after your journey."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ label, icon: Icon, copy }, index) => (
            <Reveal key={label} delay={index * 70}>
              <article className="card-motion card-rim group relative h-full overflow-hidden rounded-[24px] border border-[var(--line)] bg-white p-7 soft-shadow">
                <span className="icon-tile flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-alt)] text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-black leading-snug">{label}</h3>
                <p className="mt-2.5 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function TrustBand() {
  const stats = [
    { value: yearsOfExperience, suffix: '+', label: 'Years of Experience', sub: `Operating since ${site.established}` },
    { value: destinations.length, suffix: '+', label: 'Destinations Covered', sub: 'India & international' },
    { value: services.length, suffix: '', label: 'Travel Services', sub: 'Tickets to insurance' },
    { value: yatras.length, suffix: '', label: 'Pilgrimage Yatras', sub: 'Fully coordinated' },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
      <Image src="/images/banners/trust-mountains.webp" alt="" fill className="object-cover opacity-30" sizes="100vw" />
      <div className="absolute inset-0 bg-[#073b67]/70" />

      <div className="container-shell relative z-10 grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 90}>
            <div className="text-center">
              <div className="text-4xl font-black tracking-tight md:text-5xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2.5 text-sm font-black uppercase tracking-wide text-orange-300">{stat.label}</div>
              <div className="mt-1 text-xs text-blue-100/75">{stat.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function ServicesSection() {
  return (
    <section className="section-pad bg-[var(--surface)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="How we help"
          title="Our Services"
          copy="Everything listed on our brochure, handled in one place — air and rail tickets, hotels and resorts, holiday and group packages, luxury train tours, cruises, visas and travel insurance."
          action={{ label: 'View All Services', href: '/services' }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.slice(0, 10).map((item, index) => (
            <Reveal key={item.slug} delay={(index % 5) * 70}>
              <ServiceCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function FeaturedPackages() {
  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Ready-made starting points"
          title="Featured Holiday Packages"
          copy="Itinerary concepts we run most often. Use one as-is or treat it as a starting point — every day can be reshaped around you."
          action={{ label: 'Browse All Packages', href: '/packages' }}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.slice(0, 6).map((item, index) => (
            <Reveal key={item.slug} delay={(index % 3) * 90}>
              <PackageCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function PilgrimageStrip() {
  return (
    <section className="section-pad bg-[var(--surface)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Yatra planning"
          title="Pilgrimage Packages"
          copy="Registration, permits, hill-safe vehicles and stays near the temple — the parts of a yatra that are hardest to arrange from home."
          action={{ label: 'All Pilgrimage Yatras', href: '/pilgrimage-packages' }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {yatras.map((yatra, index) => (
            <Reveal key={yatra.slug} delay={(index % 5) * 70}>
              <Link
                href={`/pilgrimage-packages#${yatra.slug}`}
                className="card-motion card-rim group focus-ring relative block h-full overflow-hidden rounded-[22px] bg-slate-900"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={yatra.image}
                    alt={yatra.name}
                    fill
                    className="card-zoom object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1280px) 30vw, 19vw"
                  />
                  <div className="image-scrim absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-base font-black leading-tight">{yatra.name}</h3>
                    <p className="mt-1 text-xs text-orange-200">{yatra.location}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black opacity-0 transition-all duration-500 group-hover:opacity-100">
                      View details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
const promiseSteps = [
  {
    icon: ClipboardList,
    title: 'We listen first',
    copy: 'Dates, traveller mix, pace, budget and the things you actually care about — before a single hotel is suggested.',
  },
  {
    icon: Route,
    title: 'We build the route',
    copy: 'A realistic day-by-day plan with sensible driving times, the right hotel category and room configuration.',
  },
  {
    icon: CalendarCheck,
    title: 'We confirm in writing',
    copy: 'Inclusions, exclusions, payment schedule and cancellation terms are all stated before you pay anything.',
  },
  {
    icon: Headphones,
    title: 'We stay reachable',
    copy: 'One coordinator on call through the trip — for a delayed flight, a changed plan or a question at 11 pm.',
  },
];

/**
 * Renders verified traveller reviews once `data/testimonials.ts` has entries.
 * Until then it shows our service promise rather than invented quotes.
 */
export function TravellerPromise() {
  if (testimonials.length > 0) {
    return (
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Traveller feedback" title="What Our Travellers Say" align="center" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name + index} delay={index * 90}>
                <article className="card-motion h-full rounded-[26px] border border-[var(--line)] bg-white p-7 soft-shadow">
                  <MessageSquareQuote className="h-8 w-8 text-[var(--brand-orange)]" aria-hidden />
                  <p className="mt-4 leading-7 text-slate-600">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--surface-alt)] text-sm font-black text-[var(--brand-blue)]">
                      {item.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </span>
                    <span>
                      <strong className="block text-sm font-black">{item.name}</strong>
                      <span className="text-xs text-slate-500">
                        {item.trip} · {item.location}
                      </span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Our promise"
          title="What Working With Us Looks Like"
          copy="Four things we do on every single trip, whether it is a weekend in Goa or a fortnight across Europe."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promiseSteps.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} delay={index * 90}>
              <article className="card-motion card-rim group relative h-full overflow-hidden rounded-[24px] border border-[var(--line)] bg-white p-7 soft-shadow">
                <span className="absolute right-5 top-4 text-5xl font-black text-[var(--surface-alt)] transition-colors duration-500 group-hover:text-blue-100">
                  {index + 1}
                </span>
                <span className="icon-tile relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-alt)] p-3 text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="relative mt-5 text-lg font-black leading-snug">{title}</h3>
                <p className="relative mt-2.5 text-sm leading-6 text-slate-500">{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function InspirationStrip() {
  return (
    <section className="section-pad-sm">
      <div className="container-shell overflow-hidden rounded-[30px] bg-[var(--surface-alt)] p-6 md:p-10">
        <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <span className="eyebrow">Build your own journey</span>
            <h2 className="mt-4 text-3xl font-black leading-[1.06] tracking-[-0.04em] md:text-5xl">
              Tell us the destination. We&rsquo;ll shape the route around you.
            </h2>
            <p className="section-copy mt-5 max-w-2xl">
              Seven short questions — where, when, who, budget and preferences — and you get a real itinerary back, not a generic brochure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="primary" size="lg" withArrow>
                Start Planning
              </ButtonLink>
              <ButtonLink href="/destinations" variant="ghost" size="lg">
                Browse Destinations
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-motion group relative min-h-[320px] overflow-hidden rounded-[24px]">
              <Image
                src="/images/banners/planning.webp"
                alt="Planning a travel route on a paper world map"
                fill
                className="card-zoom object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-xs font-black text-[var(--brand-blue)] glass">
                <Compass className="h-4 w-4" aria-hidden /> Custom itinerary
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function HomeFAQ() {
  return (
    <section className="section-pad">
      <div className="container-shell grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <Reveal>
          <span className="eyebrow">Good to know</span>
          <h2 className="section-title mt-4">
            <span className="title-rule">Frequently Asked Questions</span>
          </h2>
          <p className="section-copy mt-9 max-w-md">
            Still unsure about something? Call the office on {site.phones[0]} — you will speak to someone who actually plans the trips.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="ocean" withArrow>
              Talk to a Travel Expert
            </ButtonLink>
          </div>
          <div className="mt-10 hidden items-center gap-3 rounded-2xl border border-[var(--line)] bg-white p-5 soft-shadow lg:flex">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--brand-blue)]">
              <Plane className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-sm leading-6 text-slate-600">
              <strong className="block font-black text-slate-800">{site.promise}</strong>
              {site.legalNote} · Since {site.established}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <FAQAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
