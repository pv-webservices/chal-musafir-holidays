import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Every image on the site is a local WebP in /public/images, so no
    // remote patterns are required. Next still generates responsive sizes.
    formats: ['image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 128, 200, 256, 320, 420],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
