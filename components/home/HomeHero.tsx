import Image from 'next/image';
import Link from 'next/link';
import { Award, BadgeIndianRupee, Headphones, Plane, ShieldCheck, Ship, Train, UsersRound } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Buttons';
import { site, yearsOfExperience } from '@/data/site';

const trustChips = [
  { icon: Award, title: `${yearsOfExperience}+ Years`, sub: 'Experience' },
  { icon: BadgeIndianRupee, title: 'Best Price', sub: 'Guarantee' },
  { icon: UsersRound, title: 'Custom', sub: 'Itineraries' },
  { icon: Headphones, title: 'Full Trip', sub: 'Support' },
];

/** Quick links that replace the reference mock-up's live-inventory search bar. */
const serviceShortcuts = [
  { label: 'Air Tickets', href: '/services/air-tickets/', icon: Plane },
  { label: 'Hotels & Resorts', href: '/services/hotel-booking/', icon: BadgeIndianRupee },
  { label: 'Holiday Packages', href: '/packages/', icon: UsersRound },
  { label: 'Rail Tickets', href: '/services/rail-tickets/', icon: Train },
  { label: 'Cruise Holidays', href: '/services/cruise-holidays/', icon: Ship },
  { label: 'Visa Assistance', href: '/services/visa-assistance/', icon: ShieldCheck },
];

export function HomeHero() {
  return (
    <>
      <section className="relative min-h-[600px] overflow-hidden bg-sky-100 lg:min-h-[680px]">
        <Image
          src="/images/hero/home.webp"
          alt="Traveller looking out over a turquoise tropical bay"
          fill
          loading="eager"
          fetchPriority="high"
          className="object-cover object-[70%_center] lg:object-center"
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="container-shell relative z-10 grid min-h-[600px] items-center py-14 lg:min-h-[680px] lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]">
          <div className="max-w-xl">
            <span className="eyebrow animate-rise">Travel better, plan smarter</span>

            <h1 className="animate-rise mt-5 text-[clamp(52px,7.2vw,92px)] font-black leading-[0.86] tracking-[-0.06em] text-[#082d4e]" style={{ animationDelay: '80ms' }}>
              <span className="block">Explore</span>
              <span className="font-display block italic text-[var(--brand-orange)]">Dream</span>
              <span className="block">Discover</span>
            </h1>

            <p className="animate-rise mt-7 max-w-md text-base font-medium leading-7 text-slate-700 md:text-lg" style={{ animationDelay: '160ms' }}>
              Your perfect holiday is just a journey away. Let {site.name} take you there — planned around your dates, your people and your budget.
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
              <ButtonLink href="/quote/" variant="primary" size="lg" withArrow>
                Plan Your Trip
              </ButtonLink>
              <ButtonLink href="/packages/" variant="ghost" size="lg">
                Explore Packages
              </ButtonLink>
            </div>

            <ul className="animate-fade-up mt-10 grid max-w-xl grid-cols-2 gap-2.5 sm:grid-cols-4" style={{ animationDelay: '320ms' }}>
              {trustChips.map(({ icon: Icon, title, sub }) => (
                <li key={sub} className="flex items-center gap-2.5 rounded-2xl bg-white/78 p-2.5 glass transition-transform duration-500 hover:-translate-y-1">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--brand-blue)]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <strong className="block text-[13px] font-black text-slate-800">{title}</strong>
                    <span className="block text-[10.5px] font-bold uppercase tracking-wide text-slate-500">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-script pointer-events-none hidden rotate-[-8deg] justify-self-end text-right text-4xl leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] lg:block xl:text-5xl">
            Collect
            <br />
            Moments,
            <br />
            <span className="text-orange-200">Not Things</span>
          </p>
        </div>
      </section>

      {/* Service shortcut rail — sits where the reference mock-up had its search widget */}
      <section className="relative z-20 -mt-10 md:-mt-12">
        <div className="container-shell">
          <div className="card-shadow rounded-[26px] border border-[var(--line)] bg-white p-3 md:p-4">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
              {serviceShortcuts.map(({ label, href, icon: Icon }) => (
                <li key={href} className="shrink-0 md:shrink">
                  <Link
                    href={href}
                    className="group focus-ring flex h-full items-center gap-2.5 rounded-2xl px-4 py-3.5 transition-all duration-500 hover:bg-[var(--surface-alt)]"
                  >
                    <span className="icon-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-alt)] text-[var(--brand-blue)] group-hover:bg-[var(--brand-blue)] group-hover:text-white">
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="whitespace-nowrap text-[13px] font-black text-slate-700 group-hover:text-[var(--brand-blue-dark)]">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
