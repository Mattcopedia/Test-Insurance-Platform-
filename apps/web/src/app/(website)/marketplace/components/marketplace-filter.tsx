'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { cn } from '@wrapa/ui'
import type { MarketplaceProduct } from '../data/marketplace-data'

export interface FilterState {
  orgType: 'all' | 'insurance' | 'hmo'
  priceMin: number
  priceMax: number
  durations: string[]
  regions: string[]
  coverage: string[]
  rating: number | null
  planTypes: string[]
  ageGroups: string[]
}

export const DEFAULT_FILTERS: FilterState = {
  orgType: 'all',
  priceMin: 0,
  priceMax: 50000,
  durations: [],
  regions: [],
  coverage: [],
  rating: null,
  planTypes: [],
  ageGroups: [],
}

const DURATIONS = ['1 year', '2 years', '5 years', 'Lifetime']
const REGIONS = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'All regions']
const COVERAGE_OPTIONS = [
  'Inpatient',
  'Outpatient',
  'Dental',
  'Optical',
  'Maternity',
  'Life cover',
  'Disability',
]
const PLAN_TYPES = ['Individual', 'Family', 'Group/Corporate']
const AGE_GROUPS = ['0-17', '18-35', '36-50', '51-65', '65+']

interface FilterPanelContentProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  onClear: () => void
  activeCount: number
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
}

function FilterPanelContent({ filters, onChange, onClear, activeCount }: FilterPanelContentProps) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val })

  return (
    <div className="flex flex-col gap-0 divide-y divide-black/8">
      {/* Clear */}
      <div className="flex items-center justify-between pb-4">
        <span className="font-sans text-[15px] font-bold text-black/80">
          Filters{activeCount > 0 && ` (${activeCount})`}
        </span>
        <button
          type="button"
          onClick={onClear}
          className="text-[13px] text-black/45 hover:text-black transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Org type */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Type
        </p>
        <div className="flex flex-col gap-2">
          {(['all', 'insurance', 'hmo'] as const).map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="orgType"
                checked={filters.orgType === t}
                onChange={() => set('orgType', t)}
                className="accent-black"
              />
              <span className="text-[14px] text-black/70 capitalize">
                {t === 'all' ? 'All types' : t === 'hmo' ? 'HMO' : 'Insurance'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-1">
          Monthly Premium
        </p>
        <p className="text-[12px] text-black/45 mb-3">
          NGN {filters.priceMin.toLocaleString()} – NGN {filters.priceMax.toLocaleString()}
        </p>
        <input
          type="range"
          min={0}
          max={50000}
          step={500}
          value={filters.priceMax}
          onChange={(e) => set('priceMax', Number(e.target.value))}
          className="w-full accent-black"
        />
      </div>

      {/* Duration */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Duration
        </p>
        <div className="flex flex-col gap-2">
          {DURATIONS.map((d) => (
            <label key={d} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.durations.includes(d)}
                onChange={() => set('durations', toggle(filters.durations, d))}
                className="accent-black rounded"
              />
              <span className="text-[14px] text-black/70">{d}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Region
        </p>
        <div className="flex flex-col gap-2">
          {REGIONS.map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.regions.includes(r)}
                onChange={() => set('regions', toggle(filters.regions, r))}
                className="accent-black rounded"
              />
              <span className="text-[14px] text-black/70">{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Coverage */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Coverage
        </p>
        <div className="flex flex-col gap-2">
          {COVERAGE_OPTIONS.map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.coverage.includes(c)}
                onChange={() => set('coverage', toggle(filters.coverage, c))}
                className="accent-black rounded"
              />
              <span className="text-[14px] text-black/70">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Rating
        </p>
        <div className="flex flex-col gap-2">
          {[5, 4, 3].map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === r}
                onChange={() => set('rating', r)}
                className="accent-black"
              />
              <span className="text-[14px] text-black/70">
                {'★'.repeat(r)}
                {r < 5 ? '+' : ''}
              </span>
            </label>
          ))}
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === null}
              onChange={() => set('rating', null)}
              className="accent-black"
            />
            <span className="text-[14px] text-black/70">Any rating</span>
          </label>
        </div>
      </div>

      {/* Plan type */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Plan Type
        </p>
        <div className="flex flex-col gap-2">
          {PLAN_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.planTypes.includes(t)}
                onChange={() => set('planTypes', toggle(filters.planTypes, t))}
                className="accent-black rounded"
              />
              <span className="text-[14px] text-black/70">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="py-4">
        <p className="font-sans text-[13px] font-semibold text-black/50 uppercase tracking-wide mb-3">
          Age Eligibility
        </p>
        <div className="flex flex-col gap-2">
          {AGE_GROUPS.map((a) => (
            <label key={a} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ageGroups.includes(a)}
                onChange={() => set('ageGroups', toggle(filters.ageGroups, a))}
                className="accent-black rounded"
              />
              <span className="text-[14px] text-black/70">{a}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export function applyFilters(
  products: MarketplaceProduct[],
  filters: FilterState
): MarketplaceProduct[] {
  // TODO: replace with real API filtering from @wrapa/api-client
  return products.filter((p) => {
    if (filters.orgType !== 'all') {
      const isHmo = p.categoryId === 'hmo-plans'
      if (filters.orgType === 'hmo' && !isHmo) return false
      if (filters.orgType === 'insurance' && isHmo) return false
    }
    if (p.startingPrice > filters.priceMax) return false
    if (filters.durations.length > 0 && !filters.durations.includes(p.duration)) return false
    if (
      filters.regions.length > 0 &&
      !filters.regions.some((r) => r === 'All regions' || r === p.region)
    )
      return false
    if (filters.coverage.length > 0 && !filters.coverage.every((c) => p.coverage.includes(c)))
      return false
    if (filters.rating !== null && p.rating < filters.rating) return false
    if (
      filters.planTypes.length > 0 &&
      !filters.planTypes.some((t) =>
        t === 'Group/Corporate' ? p.planType === 'Group' : p.planType === t
      )
    )
      return false
    return true
  })
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0
  if (filters.orgType !== 'all') count++
  if (filters.priceMax < 50000) count++
  count += filters.durations.length
  count += filters.regions.length
  count += filters.coverage.length
  if (filters.rating !== null) count++
  count += filters.planTypes.length
  count += filters.ageGroups.length
  return count
}

// Desktop sidebar
export function FilterSidebar({
  filters,
  onChange,
  onClear,
  activeCount,
}: FilterPanelContentProps) {
  return (
    <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 sticky top-[90px] self-start max-h-[calc(100vh-110px)] overflow-y-auto pr-2">
      <FilterPanelContent
        filters={filters}
        onChange={onChange}
        onClear={onClear}
        activeCount={activeCount}
      />
    </aside>
  )
}

// Mobile dialog
interface MobileFilterDialogProps extends FilterPanelContentProps {
  open: boolean
  onClose: () => void
}

export function MobileFilterDialog({ open, onClose, ...props }: MobileFilterDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] max-h-[85vh] overflow-y-auto p-5',
            'animate-in slide-in-from-bottom duration-300'
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="font-serif text-[20px] font-bold text-black/85">
              Filters
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="p-1 text-black/50 hover:text-black"
                aria-label="Close filters"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          <FilterPanelContent {...props} />
          <div className="sticky bottom-0 bg-white pt-4 mt-2 border-t border-black/8">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 rounded-[10px] bg-black text-white font-sans text-[15px] font-semibold"
            >
              Show results
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
