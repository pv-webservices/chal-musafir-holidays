import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube, type LucideIcon } from 'lucide-react';
import { addressLine, mapLinkUrl, site, socials, whatsappUrl } from '@/data/site';
import { services } from '@/data/services';

const socialIcons: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

const quickLinks = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Domestic Holidays', '/domestic'],
  ['International Holidays', '/international'],
  ['Holiday Packages', '/packages'],
  ['Honeymoon Packages', '/honeymoon-packages'],
  ['Family Holidays', '/family-packages'],
  ['Group Packages', '/group-tours'],
  ['Pilgrimage Yatras', '/pilgrimage-packages'],
  ['Gallery', '/gallery'],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#041c33] text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[var(--brand-blue)]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[var(--brand-orange)]/10 blur-3xl" aria-hidden />

      <div className="container-shell relative z-10 grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3 shadow-lg">
            <Image src={site.logo} alt={site.name} width={720} height={355} className="h-auto w-[186px]" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/85">
            Travel planning for domestic and international holidays — air and rail tickets, hotels and resorts, customised packages,
            cruises, visas and insurance, all from one office in Moradabad.
          </p>
          <p className="font-script mt-4 text-xl text-orange-300">{site.tagline}</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-200/70">
            {site.legalNote} · Since {site.established}
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Quick links">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-orange-300">Quick Links</h2>
          <ul className="mt-6 grid gap-2.5 text-sm text-blue-50/85">
            {quickLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="focus-ring inline-block rounded transition-all duration-300 hover:translate-x-1 hover:text-orange-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label="Our services">
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-orange-300">Our Services</h2>
          <ul className="mt-6 grid gap-2.5 text-sm text-blue-50/85">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="focus-ring inline-block rounded transition-all duration-300 hover:translate-x-1 hover:text-orange-300"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-orange-300">Contact Us</h2>
          <div className="mt-6 grid gap-4 text-sm text-blue-50/85">
            <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="focus-ring flex gap-3 rounded transition-colors hover:text-white">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
              <span>{addressLine}</span>
            </a>

            <div className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
              <span className="flex flex-col gap-1">
                {site.phones.map((phone) => (
                  <a key={phone} href={`tel:+91${phone}`} className="focus-ring rounded font-bold transition-colors hover:text-white">
                    +91 {phone}
                  </a>
                ))}
              </span>
            </div>

            <a href={`mailto:${site.email}`} className="focus-ring flex gap-3 rounded break-all transition-colors hover:text-white">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-300" aria-hidden />
              {site.email}
            </a>

            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="focus-ring flex gap-3 rounded transition-colors hover:text-white">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden />
              WhatsApp enquiry
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-blue-100 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--brand-orange)] hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              );
            })}
            <Link href="/quote" className="btn btn-primary btn-sm focus-ring">
              <span>Plan My Trip</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-blue-200/75 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="focus-ring rounded transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="focus-ring rounded transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/contact" className="focus-ring rounded transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
