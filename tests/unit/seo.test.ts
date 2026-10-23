import { describe, expect, it } from 'vitest';
import { absoluteUrl, canonicalPath, clampDescription, jsonLd, noindexMetadata, ogImageFor, pageMetadata } from '@/lib/seo';

describe('seo helpers', () => {
  it('normalises paths to a trailing slash', () => {
    expect(canonicalPath('/')).toBe('/');
    expect(canonicalPath('about')).toBe('/about/');
    expect(canonicalPath('/destinations/kerala/')).toBe('/destinations/kerala/');
    expect(absoluteUrl('/about')).toBe('https://chalmusafirholidays.com/about/');
  });

  it('maps page images to 1200×630 share cards', () => {
    expect(ogImageFor('/images/destinations/kerala.webp')).toBe('/images/og/destinations-kerala.jpg');
    expect(ogImageFor(undefined)).toBe('/images/og/default.jpg');
    expect(ogImageFor('https://example.com/x.png')).toBe('/images/og/default.jpg');
  });

  it('clamps descriptions to at most 160 characters', () => {
    const long = 'Word '.repeat(60);
    expect(clampDescription(long).length).toBeLessThanOrEqual(160);
    expect(clampDescription('Short and sweet.')).toBe('Short and sweet.');
  });

  it('escapes "<" in JSON-LD', () => {
    expect(jsonLd({ a: '</script><script>alert(1)</script>' })).not.toContain('<');
  });

  it('builds indexable metadata with canonical, robots and a 1200×630 og:image', () => {
    const meta = pageMetadata({ title: 'About Us', description: 'x'.repeat(100), path: '/about', image: '/images/hero/about.webp' });
    expect(meta.alternates?.canonical).toBe('/about/');
    expect(meta.robots).toMatchObject({ index: true, follow: true, 'max-image-preview': 'large' });
    expect(meta.openGraph).toMatchObject({ url: '/about/', images: [{ url: '/images/og/hero-about.jpg', width: 1200, height: 630 }] });
  });

  it('builds noindex metadata without a canonical', () => {
    const meta = noindexMetadata('Thank You', 'Sent.');
    expect(meta.robots).toMatchObject({ index: false, follow: true });
    expect(meta.alternates).toBeUndefined();
  });
});
