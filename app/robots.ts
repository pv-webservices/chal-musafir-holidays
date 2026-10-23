import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

// Allow everything: noindex pages are kept out of search with a robots meta
// tag, which crawlers can only read if the page is NOT blocked here. CSS, JS
// and images must stay crawlable for rendering.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.origin}/sitemap-index.xml`,
  };
}
