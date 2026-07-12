'use client'

import { cn } from '@wrapa/ui'
import { useState } from 'react'

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

/**
 * Plan name search UI — visual only until marketplace search API is available.
 */
export function MarketplacePlanSearch({ className }: { className?: string }) {
  const [query, setQuery] = useState('')

  return (
    <div className={cn('w-full', className)}>
      <label htmlFor="marketplace-plan-search" className="sr-only">
        Search plans by name
      </label>
      <div
        className={cn(
          'relative flex h-11 sm:h-12 w-full items-center',
          'rounded-[10px] bg-white',
          'shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)]',
          'ring-1 ring-black/8 transition-shadow duration-150',
          'focus-within:ring-black/20'
        )}
      >
        <span className="pointer-events-none absolute left-3.5 flex shrink-0 items-center text-black/40">
          <SearchIcon />
        </span>

        <input
          id="marketplace-plan-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search plans by name..."
          autoComplete="off"
          className={cn(
            'h-full w-full bg-transparent rounded-[10px]',
            'pl-10 pr-10',
            'font-sans text-[14px] sm:text-[15px] font-normal text-black',
            'placeholder:text-black/40',
            'outline-none border-none',
            '[&::-webkit-search-cancel-button]:hidden'
          )}
        />

        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className={cn(
              'absolute right-3 flex size-7 items-center justify-center rounded-full',
              'text-black/40 hover:bg-black/5 hover:text-black/70 transition-colors'
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <p className="mt-2 text-[12px] sm:text-[13px] text-black/40">
        Search by plan name — filtering will be available once the marketplace API is connected.
      </p>
    </div>
  )
}
