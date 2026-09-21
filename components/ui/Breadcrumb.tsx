import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${tone === 'dark' ? 'text-blue-100/80' : 'text-slate-500'}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
            {item.href ? (
              <Link
                className={`focus-ring rounded transition-colors ${tone === 'dark' ? 'hover:text-white' : 'hover:text-[var(--brand-blue)]'}`}
                href={item.href}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`font-bold ${tone === 'dark' ? 'text-white' : 'text-slate-800'}`} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
