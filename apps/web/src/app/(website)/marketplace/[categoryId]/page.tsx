'use client'

import { MarketplaceProductCard, cn } from '@wrapa/ui'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use, useMemo, useState } from 'react'
import {
  DEFAULT_FILTERS,
  FilterSidebar,
  MobileFilterDialog,
  applyFilters,
  countActiveFilters,
  type FilterState,
} from '../components/marketplace-filter'
import { getCategoryById, getProductsByCategory } from '../data/marketplace-data'

const PAGE_SIZE = 9

interface Props {
  params: Promise<{ categoryId: string }>
}

function FilterIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}

export default function CategoryPage({ params }: Props) {
  const { categoryId } = use(params)
  const category = getCategoryById(categoryId)
  if (!category) notFound()

  const allProducts = getProductsByCategory(categoryId)

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const activeCount = countActiveFilters(filters)

  const filtered = useMemo(() => applyFilters(allProducts, filters), [allProducts, filters])
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleFilterChange(f: FilterState) {
    setFilters(f)
    setPage(1)
  }

  function handleClear() {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-[13px] text-black/45 mb-6"
          aria-label="Breadcrumb"
        >
          <Link
            href="/marketplace"
            className="hover:text-black transition-colors flex items-center gap-1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M5 12l7 7M5 12l7-7" />
            </svg>
            Marketplace
          </Link>
          <span className="text-black/25">›</span>
          <span className="text-black/70 font-medium">{category.name}</span>
        </nav>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black/85 mb-1">
            {category.name}
          </h1>
          <p className="text-[14px] sm:text-[15px] text-black/50">{category.description}</p>
        </div>

        {/* Mobile filter button */}
        <div className="flex items-center justify-between mb-5 lg:hidden">
          <p className="text-[13px] text-black/45">
            {filtered.length} plan{filtered.length !== 1 ? 's' : ''}
          </p>
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-1.5 h-9 px-3.5 rounded-[8px] border border-black/20 text-[13px] font-medium text-black/70 hover:border-black/40 transition-colors"
          >
            <FilterIcon />
            Filter
            {activeCount > 0 && (
              <span className="ml-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-black text-white text-[10px] font-bold">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop: sidebar + grid */}
        <div className="flex gap-8">
          <FilterSidebar
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClear}
            activeCount={activeCount}
          />

          <div className="flex-1 min-w-0">
            {/* Desktop result count */}
            <p className="hidden lg:block text-[13px] text-black/40 mb-5">
              {filtered.length} plan{filtered.length !== 1 ? 's' : ''}
            </p>

            {paged.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-black/40 gap-3">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="text-[14px]">No plans match your filters.</p>
                <button type="button" onClick={handleClear} className="text-[13px] underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {paged.map((product) => (
                  <MarketplaceProductCard
                    key={product.id}
                    initials={product.initials}
                    color={product.color}
                    name={product.name}
                    provider={product.provider}
                    description={product.description}
                    startingPrice={product.startingPrice}
                    currency={product.currency}
                    billingCycle={product.billingCycle}
                    href={`/marketplace/${categoryId}/${product.id}`}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(p) => {
                  setPage(p)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter dialog */}
      <MobileFilterDialog
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        activeCount={activeCount}
      />
    </div>
  )
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-full border transition-colors',
          currentPage === 1
            ? 'border-black/15 text-black/25 cursor-not-allowed'
            : 'border-black/25 text-black/60 hover:border-black/50 hover:text-black'
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
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-label={`Page ${p}`}
          aria-current={currentPage === p ? 'page' : undefined}
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full font-sans text-[14px] font-semibold transition-colors',
            currentPage === p
              ? 'bg-black text-white'
              : 'bg-white border border-black/20 text-black/60 hover:border-black/50 hover:text-black'
          )}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-full border transition-colors',
          currentPage === totalPages
            ? 'border-black/15 text-black/25 cursor-not-allowed'
            : 'border-black/25 text-black/60 hover:border-black/50 hover:text-black'
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
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}
