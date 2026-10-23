import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Destination } from '@/data/destinations';

/** `sizes` defaults to a grid card; rails pass their fixed card width. */
export function DestinationCard({ item, sizes = '(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 20vw' }: { item: Destination; sizes?: string }) {
  return (
    <Link
      href={`/destinations/${item.slug}/`}
      className="card-motion card-rim group focus-ring relative block overflow-hidden rounded-[26px] bg-slate-900"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
        <Image
          src={item.image}
          alt=""
          fill
          className="card-zoom object-cover"
          sizes={sizes}
        />
        <div className="image-scrim absolute inset-0" />

        {/* region chip */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-[var(--brand-blue-dark)] glass">
          <MapPin className="h-3 w-3" aria-hidden />
          {item.region === 'domestic' ? 'India' : 'International'}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
          <div className="min-w-0">
            <h3 className="text-lg font-black leading-tight tracking-tight sm:text-xl">{item.name}</h3>
            <p className="mt-1 text-sm leading-snug text-white/85">{item.subtitle}</p>
            <p className="mt-3 max-h-0 overflow-hidden text-xs font-bold text-orange-200 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100">
              {item.duration} · {item.bestTime.split('·')[0].trim()}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition duration-500 glass group-hover:rotate-45 group-hover:bg-white group-hover:text-[var(--brand-blue)]">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
