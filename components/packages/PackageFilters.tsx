'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { packages, packageTypes } from '@/data/packages';
import { PackageCard } from '@/components/ui/PackageCard';
import { ButtonLink } from '@/components/ui/Buttons';

const regions = ['All', 'Domestic', 'International'] as const;
const durations = [
  { label: 'Any length', value: 'all' },
  { label: 'Up to 5 nights', value: 'short' },
  { label: '6–8 nights', value: 'mid' },
  { label: '9 nights or more', value: 'long' },
] as const;

export function PackageFilters() {
  const [region, setRegion] = useState<string>('All');
  const [type, setType] = useState<string>('All');
  const [duration, setDuration] = useState<string>('all');

  const list = useMemo(
    () =>
      packages.filter((item) => {
        if (region !== 'All' && item.region !== region) return false;
        if (type !== 'All' && item.type !== type) return false;
        if (duration === 'short' && item.nights > 5) return false;
        if (duration === 'mid' && (item.nights < 6 || item.nights > 8)) return false;
        if (duration === 'long' && item.nights < 9) return false;
        return true;
      }),
    [region, type, duration],
  );

  const reset = () => {
    setRegion('All');
    setType('All');
    setDuration('all');
  };

  const isFiltered = region !== 'All' || type !== 'All' || duration !== 'all';

  return (
    <div>
      <div className="mb-10 rounded-[26px] border border-[var(--line)] bg-white p-5 soft-shadow md:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-slate-700">
            <SlidersHorizontal className="h-4 w-4 text-[var(--brand-blue)]" aria-hidden />
            Filter packages
          </h2>
          {isFiltered && (
            <button type="button" onClick={reset} className="focus-ring rounded text-xs font-black text-[var(--brand-red)] hover:underline">
              Clear all
            </button>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <FilterGroup label="Region">
            {regions.map((option) => (
              <Chip key={option} active={region === option} onClick={() => setRegion(option)}>
                {option}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Trip type">
            <Chip active={type === 'All'} onClick={() => setType('All')}>
              All
            </Chip>
            {packageTypes.map((option) => (
              <Chip key={option} active={type === option} onClick={() => setType(option)}>
                {option}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Duration">
            {durations.map((option) => (
              <Chip key={option.value} active={duration === option.value} onClick={() => setDuration(option.value)}>
                {option.label}
              </Chip>
            ))}
          </FilterGroup>
        </div>
      </div>

      <p className="mb-6 text-sm font-bold text-slate-500" aria-live="polite">
        Showing {list.length} of {packages.length} packages
      </p>

      {list.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((item) => (
            <PackageCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[26px] border border-dashed border-[var(--line)] bg-[var(--surface)] p-10 text-center">
          <h3 className="text-xl font-black">No package matches those filters yet</h3>
          <p className="section-copy mx-auto mt-3 max-w-md">
            That does not mean we cannot plan it — most of our trips are built from scratch. Tell us what you had in mind.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/quote" variant="primary" withArrow>
              Request a Custom Trip
            </ButtonLink>
            <button type="button" onClick={reset} className="btn btn-ghost focus-ring">
              <span>Clear filters</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2.5 text-xs font-black uppercase tracking-wide text-slate-400">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring rounded-full px-4 py-2 text-xs font-black transition-all duration-300 ${
        active
          ? 'bg-[var(--brand-blue)] text-white shadow-lg shadow-blue-500/25'
          : 'bg-[var(--surface)] text-slate-600 hover:bg-[var(--surface-alt)] hover:text-[var(--brand-blue)]'
      }`}
    >
      {children}
    </button>
  );
}
