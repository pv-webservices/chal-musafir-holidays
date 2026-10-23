import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, MapPin, Users } from 'lucide-react';
import type { Package } from '@/data/packages';

interface PackageCardProps {
  item: Package;
}

export function PackageCard({ item }: PackageCardProps) {
  return (
    <article className="card-motion card-rim group relative overflow-hidden rounded-[26px] border border-[var(--line)] bg-white soft-shadow">
      <Link href={`/packages/${item.slug}/`} className="focus-ring block">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="card-zoom object-cover"
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 32vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041c33]/55 via-transparent to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-[var(--brand-blue)] glass">
            {item.region}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-[var(--brand-red)] px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-white">
            {item.type}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-4 gap-y-1 p-4 text-[12px] font-bold text-white">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {item.destination}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              {item.duration}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <h3 className="text-xl font-black leading-tight tracking-tight transition-colors duration-300 group-hover:text-[var(--brand-blue)]">
            {item.title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full bg-[var(--surface-alt)] px-3 py-1 text-xs font-bold text-[var(--brand-blue-dark)] transition-colors duration-300 group-hover:bg-blue-100"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {item.idealFor}
            </span>
            <span className="link-arrow shrink-0">
              Details
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
