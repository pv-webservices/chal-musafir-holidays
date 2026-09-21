import Image from 'next/image';
import { Phone } from 'lucide-react';
import { ButtonLink } from './Buttons';
import { Reveal } from './Reveal';
import { site } from '@/data/site';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy)] text-white">
      <Image src="/images/banners/cta-sunset.webp" alt="" fill className="object-cover opacity-70" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041c33]/96 via-[#052a49]/75 to-transparent" />

      <div className="container-shell relative z-10 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-300 md:text-sm">Plan with a travel expert</p>
          <h2 className="mt-4 text-4xl font-black leading-[1.03] tracking-[-0.04em] md:text-6xl">Ready to Explore the World?</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-blue-50/90">
            Tell us where you want to go. We&rsquo;ll handle the route, the stays, the paperwork and everything in between.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/quote" variant="primary" size="lg" withArrow>
              Get a Free Quote
            </ButtonLink>
            <ButtonLink href={`tel:${site.primaryPhone}`} variant="on-dark" size="lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden />
                Call {site.phones[0]}
              </span>
            </ButtonLink>
          </div>
        </Reveal>

        <p className="font-script pointer-events-none absolute bottom-16 right-8 hidden rotate-[-6deg] text-4xl leading-tight text-white/80 xl:block">
          Travel more,
          <br />
          worry less
        </p>
      </div>
    </section>
  );
}
