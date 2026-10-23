import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { whatsappUrl } from '@/data/site';

/**
 * Floating WhatsApp button, bottom-right, tablet and desktop only — on phones
 * the sticky action bar already carries a highlighted WhatsApp button.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      className="group focus-ring fixed bottom-6 right-6 z-40 hidden items-center gap-3 md:flex lg:bottom-8 lg:right-8"
    >
      <span className="pointer-events-none translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#0b141a] opacity-0 shadow-[0_10px_30px_rgba(10,40,70,0.18)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        Chat with us
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
