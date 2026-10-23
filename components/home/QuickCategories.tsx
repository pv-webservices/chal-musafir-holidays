import Link from 'next/link';
import { Globe2, Heart, MapPinned, Sparkles, TentTree, UsersRound } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const items = [
  { title: 'Domestic Holidays', sub: 'Explore India', href: '/domestic/', icon: MapPinned, tone: 'bg-orange-50 text-orange-600' },
  { title: 'International Holidays', sub: 'Around the World', href: '/international/', icon: Globe2, tone: 'bg-blue-50 text-blue-600' },
  { title: 'Honeymoon Packages', sub: 'For Special Moments', href: '/honeymoon-packages/', icon: Heart, tone: 'bg-rose-50 text-rose-600' },
  { title: 'Family Tours', sub: 'Memories Together', href: '/family-packages/', icon: UsersRound, tone: 'bg-emerald-50 text-emerald-600' },
  { title: 'Group Packages', sub: 'Travel Together', href: '/group-tours/', icon: TentTree, tone: 'bg-cyan-50 text-cyan-700' },
  { title: 'Custom Packages', sub: 'Tailor Made for You', href: '/quote/', icon: Sparkles, tone: 'bg-amber-50 text-amber-600' },
];

export function QuickCategories() {
  return (
    <section className="section-pad-sm" aria-labelledby="quick-categories-title">
      <h2 id="quick-categories-title" className="sr-only">
        Holiday types
      </h2>
      <div className="container-shell grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ title, sub, href, icon: Icon, tone }, index) => (
          <Reveal key={href} delay={index * 70}>
            <Link
              href={href}
              className="card-motion group focus-ring flex h-full flex-col items-center rounded-2xl border border-transparent p-4 text-center transition-colors hover:border-[var(--line)] hover:bg-white"
            >
              <span className={`icon-tile flex h-16 w-16 items-center justify-center rounded-full ${tone}`}>
                <Icon className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-3.5 text-sm font-black leading-tight transition-colors duration-300 group-hover:text-[var(--brand-blue)]">{title}</h3>
              <p className="mt-1 text-xs text-slate-500">{sub}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
