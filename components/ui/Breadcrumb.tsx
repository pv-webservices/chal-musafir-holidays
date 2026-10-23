import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { absoluteUrl, canonicalPath, jsonLd } from '@/lib/seo';

export type Crumb = { label: string; href?: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumb({ items, tone = 'light' }: { items: Crumb[]; tone?: 'light' | 'dark' }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${tone === 'dark' ? 'text-blue-100/80' : 'text-slate-500'}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
            {item.href ? (
              <Link
                className={`focus-ring inline-flex min-h-6 items-center rounded transition-colors ${tone === 'dark' ? 'hover:text-white' : 'hover:text-[var(--brand-blue)]'}`}
                href={canonicalPath(item.href)}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    </nav>
  );
}
