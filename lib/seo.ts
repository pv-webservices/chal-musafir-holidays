import type { Metadata } from 'next';
import { site } from '@/data/site';

/** Robots directive for every indexable page. */
export const INDEXABLE_ROBOTS: Metadata['robots'] = { index: true, follow: true, 'max-image-preview': 'large' };
/** Robots directive for utility pages (thank-you etc.). The 404 gets `noindex` from Next itself. */
export const NOINDEX_ROBOTS: Metadata['robots'] = { index: false, follow: true };

export const DEFAULT_OG_IMAGE = '/images/og/default.jpg';

/** Normalises a route to the site's URL style: leading and trailing slash. */
export function canonicalPath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

export function absoluteUrl(path: string): string {
  return `${site.origin}${canonicalPath(path)}`;
}

/**
 * Maps a page image (`/images/destinations/kerala.webp`) to its pre-generated
 * 1200×630 share card (`/images/og/destinations-kerala.jpg`).
 * See scripts/generate-og-images.mjs.
 */
export function ogImageFor(image?: string): string {
  const match = image?.match(/^\/images\/([a-z-]+)\/([a-z0-9-]+)\.webp$/);
  return match ? `/images/og/${match[1]}-${match[2]}.jpg` : DEFAULT_OG_IMAGE;
}

interface PageMetaInput {
  /** Page title without the brand suffix — the layout template appends it. */
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  /** Use the title verbatim (no " | Chal Musafir Holidays" suffix). */
  absoluteTitle?: boolean;
}

/** Full metadata for an indexable page: self canonical, robots, Open Graph and Twitter. */
export function pageMetadata({ title, description, path, image, imageAlt, type = 'website', absoluteTitle = false }: PageMetaInput): Metadata {
  const url = canonicalPath(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const ogImage = { url: ogImageFor(image), width: 1200, height: 630, alt: imageAlt ?? fullTitle };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: INDEXABLE_ROBOTS,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: 'en_IN',
      type,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [ogImage] },
  };
}

/** Metadata for utility pages that must stay out of the index: noindex and no canonical. */
export function noindexMetadata(title: string, description: string): Metadata {
  return { title, description, robots: NOINDEX_ROBOTS };
}

/** Serialises JSON-LD safely for a <script> tag (escapes `<` so `</script>` can never break out). */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Trims copy to a search-friendly description (≤ max chars), preferring a whole sentence, else a word boundary. */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sentenceEnd = cut.lastIndexOf('. ');
  if (sentenceEnd >= 80) return cut.slice(0, sentenceEnd + 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—–-]+$/, '')}…`;
}
