import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { CTASection } from '@/components/ui/CTASection';
import { ButtonLink } from '@/components/ui/Buttons';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Travel inspiration gallery covering domestic, international, honeymoon, family and pilgrimage destinations planned by Chal Musafir Holidays.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Travel gallery"
        title="Places That Make You Want to Pack"
        copy="Every destination we plan, in one place. Tap any image to see it larger, then jump straight into the full destination guide."
        image="/images/hero/gallery.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      >
        <ButtonLink href="/quote" variant="primary" size="lg" withArrow>
          Plan a Trip Like This
        </ButtonLink>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell">
          <GalleryGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
