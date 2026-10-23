import type { NextConfig } from 'next';

/**
 * Security headers for every response. These live here rather than only in
 * netlify.toml because on Netlify the Next.js runtime serves pages from its
 * server handler, and netlify.toml [[headers]] only reach static files.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const nextConfig: NextConfig = {
  // Every URL ends in "/" (e.g. /about/, /thank-you/). /about → 308 → /about/.
  trailingSlash: true,
  images: {
    // Source images are local WebP in /public/images. next/image serves AVIF
    // (or WebP) at the size each <Image sizes> asks for.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 128, 200, 256, 320, 420],
    // Source names are stable, so optimised variants are cached 30 days, not forever.
    minimumCacheTTL: 2592000,
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/:path+/index.html', destination: '/:path+/', permanent: true },
    ];
  },
};

export default nextConfig;
