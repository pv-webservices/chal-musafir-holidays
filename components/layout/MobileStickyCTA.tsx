import Link from 'next/link';
import { Phone, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { site, whatsappUrl } from '@/data/site';

/**
 * Mobile action bar. WhatsApp is the highlighted action (brand green), with
 * Call and Get Quote as secondary tiles. Dark text on #25D366 keeps ~9:1
 * contrast — white text on that green fails WCAG AA.
 */
export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-white/95 p-2 glass md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2 text-xs font-black">
        <a
          href={`tel:${site.primaryPhone}`}
          className="focus-ring flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-[var(--surface-alt)] py-3 text-[var(--brand-blue-dark)] transition-transform duration-300 active:scale-95"
        >
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          className="focus-ring flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3 text-[#0b141a] shadow-[0_8px_22px_rgba(37,211,102,0.45)] ring-2 ring-[#25D366]/30 ring-offset-1 transition-transform duration-300 active:scale-95"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" /> WhatsApp
        </a>
        <Link
          href="/quote/"
          className="focus-ring flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-[var(--surface-alt)] py-3 text-[var(--brand-blue-dark)] transition-transform duration-300 active:scale-95"
        >
          <Sparkles className="h-4 w-4" aria-hidden /> Get Quote
        </Link>
      </div>
    </div>
  );
}
