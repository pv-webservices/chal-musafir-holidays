'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RailProps {
  children: ReactNode;
  label: string;
  /** Tailwind classes applied to each slide wrapper. */
  itemClassName?: string;
}

/**
 * Horizontal scroll rail with arrow controls that disable at each end.
 * Falls back to plain touch scrolling when JavaScript arrows are unused.
 */
export function Rail({ children, label, itemClassName = '' }: RailProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setAtStart(node.scrollLeft <= 4);
    setAtEnd(node.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    sync();
    const node = trackRef.current;
    if (!node) return;
    node.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      node.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.max(node.clientWidth * 0.8, 280), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="group"
        aria-label={label}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div key={index} className={`shrink-0 snap-start ${itemClassName}`}>
                {child}
              </div>
            ))
          : children}
      </div>

      <RailButton side="left" onClick={() => scrollBy(-1)} disabled={atStart} label={`Scroll ${label} left`} />
      <RailButton side="right" onClick={() => scrollBy(1)} disabled={atEnd} label={`Scroll ${label} right`} />
    </div>
  );
}

function RailButton({
  side,
  onClick,
  disabled,
  label,
}: {
  side: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`focus-ring absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--brand-blue-dark)] shadow-lg transition-all duration-300 hover:scale-110 hover:border-transparent hover:bg-[var(--brand-blue)] hover:text-white disabled:pointer-events-none disabled:opacity-0 md:flex ${
        side === 'left' ? '-left-4 lg:-left-6' : '-right-4 lg:-right-6'
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
