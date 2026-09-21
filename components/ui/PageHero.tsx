import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumb, type Crumb } from './Breadcrumb';

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
      <Image src={image} alt="" fill preload className="scale-105 object-cover opacity-55" sizes="100vw" />
      <div className="panel-scrim absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041c33] via-transparent to-[#041c33]/45" />

      {/* soft decorative glow */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-[var(--brand-orange)]/25 blur-3xl" aria-hidden />

      <div className="container-shell relative z-10 flex min-h-[380px] flex-col justify-center py-16 md:min-h-[460px] md:py-24">
        <div className="mb-7">
          <Breadcrumb items={crumbs} tone="dark" />
        </div>
        <p className="animate-fade-up text-xs font-black uppercase tracking-[0.24em] text-orange-300 md:text-sm">{eyebrow}</p>
        <h1 className="animate-fade-up mt-4 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.04em] md:text-6xl" style={{ animationDelay: '80ms' }}>
          {title}
        </h1>
        <p className="animate-fade-up mt-5 max-w-2xl text-base leading-7 text-blue-50/90 md:text-lg md:leading-8" style={{ animationDelay: '160ms' }}>
          {copy}
        </p>
        {children && <div className="animate-fade-up mt-8" style={{ animationDelay: '240ms' }}>{children}</div>}
      </div>
    </section>
  );
}
