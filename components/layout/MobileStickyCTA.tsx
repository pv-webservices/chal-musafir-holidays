import Link from 'next/link';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { site, whatsappUrl } from '@/data/site';

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-white/95 p-2 glass md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2 text-xs font-black">
        <a
          href={`tel:${site.primaryPhone}`}
          className="focus-ring flex items-center justify-center gap-1.5 rounded-xl bg-[var(--surface-alt)] py-3 text-[var(--brand-blue-dark)] transition-transform duration-300 active:scale-95"
        >
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring flex items-center justify-center gap-1.5 rounded-xl bg-green-50 py-3 text-green-700 transition-transform duration-300 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
        </a>
        <Link href="/quote" className="btn btn-primary focus-ring !rounded-xl !px-3 !py-3 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" aria-hidden /> Get Quote
          </span>
        </Link>
      </div>
    </div>
  );
}
