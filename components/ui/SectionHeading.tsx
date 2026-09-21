import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  copy,
  action,
  align = 'left',
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  action?: { label: string; href: string };
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
}) {
  const centered = align === 'center';

  return (
    <Reveal
      className={`mb-10 flex flex-col gap-5 md:mb-14 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-3xl' : 'max-w-3xl'}>
        {eyebrow && <div className={`eyebrow mb-4 ${centered ? 'justify-center' : ''} ${tone === 'dark' ? 'text-orange-300' : ''}`}>{eyebrow}</div>}
        <h2 className={`section-title ${tone === 'dark' ? 'text-white' : ''}`}>
          <span className="title-rule">{title}</span>
        </h2>
        {copy && <p className={`section-copy mt-8 max-w-2xl ${centered ? 'mx-auto' : ''} ${tone === 'dark' ? 'text-blue-100' : ''}`}>{copy}</p>}
      </div>

      {action && (
        <Link className={`link-arrow focus-ring shrink-0 ${tone === 'dark' ? 'text-orange-300 hover:text-white' : ''}`} href={action.href}>
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </Reveal>
  );
}
