import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { destinations } from '@/data/destinations';
import { packages } from '@/data/packages';
import { services } from '@/data/services';
import { absoluteUrl } from '@/lib/seo';

type ChangeFrequency = MetadataRoute.Sitemap[number]['changeFrequency'];

/**
 * Every indexable page — and only those. Utility pages (/thank-you/, the 404)
 * are noindex and deliberately absent. `npm run audit` fails if this list and
 * the built pages ever disagree.
 */
const staticRoutes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/destinations', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/domestic', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/international', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/packages', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/honeymoon-packages', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/family-packages', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/group-tours', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pilgrimage-packages', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/quote', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = site.contentUpdated;
  const detail = (path: string) => ({ url: absoluteUrl(path), lastModified, changeFrequency: 'monthly' as const, priority: 0.7 });

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...destinations.map((item) => detail(`/destinations/${item.slug}`)),
    ...packages.map((item) => detail(`/packages/${item.slug}`)),
    ...services.map((item) => detail(`/services/${item.slug}`)),
  ];
}
