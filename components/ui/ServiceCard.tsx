import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/data/services';

export function ServiceCard({ item }: { item: Service }) {
  return (
    <Link
      href={`/services/${item.slug}`}
      className="card-motion card-rim group focus-ring relative flex flex-col overflow-hidden rounded-[22px] border border-[var(--line)] bg-white soft-shadow"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="card-zoom object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041c33]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-black leading-tight text-slate-900 transition-colors duration-300 group-hover:text-[var(--brand-blue)]">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">{item.short}</p>
        <span className="link-arrow mt-4 pt-1">
          Explore service
          <ArrowRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
