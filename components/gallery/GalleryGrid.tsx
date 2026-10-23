'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { yatras } from '@/data/pilgrimage';

type GalleryItem = {
  /** One image can belong to several filters, so tags — not a single category. */
  tags: string[];
  title: string;
  caption: string;
  image: string;
  href: string;
};

const honeymoonSlugs = new Set(['indonesia', 'mauritius', 'goa', 'france', 'kerala', 'himachal-pradesh']);
const familySlugs = new Set(['singapore', 'dubai', 'malaysia', 'thailand', 'uttarakhand']);

const items: GalleryItem[] = [
  ...destinations.map((item) => {
    const tags = [item.region === 'domestic' ? 'Domestic' : 'International'];
    if (honeymoonSlugs.has(item.slug)) tags.push('Honeymoon');
    if (familySlugs.has(item.slug)) tags.push('Family');
    return { tags, title: item.name, caption: item.subtitle, image: item.image, href: `/destinations/${item.slug}/` };
  }),
  ...yatras.map((item) => ({
    tags: ['Pilgrimage'],
    title: item.name,
    caption: item.location,
    image: item.image,
    href: `/pilgrimage-packages/#${item.slug}`,
  })),
];

const filters = ['All', 'Domestic', 'International', 'Honeymoon', 'Family', 'Pilgrimage'] as const;

export function GalleryGrid() {
  const [filter, setFilter] = useState<string>('All');
  const [active, setActive] = useState<GalleryItem | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Lightbox keyboard support: focus the close button, Escape closes, focus returns to the opener.
  useEffect(() => {
    if (!active) return;
    openerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'Tab') {
        const focusable = closeRef.current?.closest('[role="dialog"]')?.querySelectorAll<HTMLElement>('a[href], button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus();
    };
  }, [active]);

  const visible = useMemo(() => (filter === 'All' ? items : items.filter((item) => item.tags.includes(filter))), [filter]);

  return (
    <>
      <div className="mb-9 flex flex-wrap gap-2">
        {filters.map((option) => {
          const count = option === 'All' ? items.length : items.filter((item) => item.tags.includes(option)).length;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={filter === option}
              className={`focus-ring rounded-full px-5 py-2.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 ${
                filter === option
                  ? 'bg-[var(--brand-blue)] text-white shadow-lg shadow-blue-500/25'
                  : 'bg-[var(--surface)] text-slate-600 hover:bg-[var(--surface-alt)] hover:text-[var(--brand-blue)]'
              }`}
            >
              {option}
              <span className={`ml-1.5 text-xs ${filter === option ? 'text-white' : 'text-slate-600'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visible.map((item, index) => (
          <figure key={item.href} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(item)}
              className="card-motion group focus-ring relative block w-full overflow-hidden rounded-2xl text-left"
            >
              <div className={`relative ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="card-zoom object-cover"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 32vw"
                />
                <div className="image-scrim absolute inset-0" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-200">{item.tags.join(' · ')}</span>
                  <h3 className="mt-1 text-xl font-black leading-tight">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.caption}</p>
                  <span className="sr-only">(view larger)</span>
                </figcaption>
              </div>
            </button>
          </figure>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="animate-fade-up fixed inset-0 z-[80] flex items-center justify-center bg-black/88 p-4 md:p-8"
          onClick={() => setActive(null)}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close image"
            onClick={() => setActive(null)}
            className="focus-ring absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 transition-transform duration-300 hover:rotate-90"
          >
            <X aria-hidden />
          </button>

          <div className="relative flex max-h-full w-full max-w-4xl flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image src={active.image} alt={active.title} fill className="object-contain" sizes="90vw" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-white">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-orange-300">{active.tags.join(' · ')}</span>
                <h3 className="text-2xl font-black">{active.title}</h3>
                <p className="text-sm text-white/70">{active.caption}</p>
              </div>
              <Link href={active.href} className="btn btn-primary btn-sm focus-ring">
                <span className="inline-flex items-center gap-2">
                  Explore <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
