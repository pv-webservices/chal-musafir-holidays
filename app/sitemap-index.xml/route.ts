import { site } from '@/data/site';

// Sitemap index submitted to Google Search Console. It points at the single
// page sitemap (/sitemap.xml), so new pages are picked up without resubmitting.
export const dynamic = 'force-static';

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site.origin}/sitemap.xml</loc>
    <lastmod>${site.contentUpdated}</lastmod>
  </sitemap>
</sitemapindex>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
