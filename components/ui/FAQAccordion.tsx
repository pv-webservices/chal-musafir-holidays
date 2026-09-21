'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="divide-y divide-[var(--line)] overflow-hidden rounded-[26px] border border-[var(--line)] bg-white px-5 soft-shadow md:px-8">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left text-[15px] font-extrabold transition-colors duration-300 hover:text-[var(--brand-blue)] md:text-base"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : idx)}
              >
                {item.q}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    isOpen ? 'rotate-180 bg-[var(--brand-blue)] text-white' : 'bg-[var(--surface-alt)] text-[var(--brand-blue)]'
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="section-copy pb-6 pr-10 text-[15px]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
