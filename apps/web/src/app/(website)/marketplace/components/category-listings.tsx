'use client'

import { Button, cn } from '@wrapa/ui'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import MarketplaceApi from '@/services/marketplace'
import type {
  MarketplaceCategory,
  MarketplaceOffering,
  MarketplaceProduct,
} from '@/services/marketplace/types'
import { MarketplaceEmpty } from './marketplace-empty'
import { MarketplacePlanSearch } from './marketplace-plan-search'
import { OfferingCard, ProductCard } from './offering-card'

const PAGE_SIZE = 9

export function CategoryListings({ categoryKey }: { categoryKey: string }) {
  const [category, setCategory] = useState<MarketplaceCategory | null>(null)
  const [missing, setMissing] = useState(false)
  const [offerings, setOfferings] = useState<MarketplaceOffering[]>([])
  const [products, setProducts] = useState<MarketplaceProduct[]>([])
  const [offeringPages, setOfferingPages] = useState(1)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      setError(null)
      try {
        const categories = await MarketplaceApi.getCategories({ activeOnly: true })
        const match =
          categories.find((item) => item.slug === categoryKey) ??
          categories.find((item) => item.id === categoryKey)
        if (!match) {
          if (!cancelled) setMissing(true)
          return
        }
        const [offeringPage, productPage] = await Promise.all([
          MarketplaceApi.getOfferings({ categoryId: match.id, page, pageSize: PAGE_SIZE }),
          MarketplaceApi.getProducts({ categoryId: match.id, page, pageSize: PAGE_SIZE }),
        ])
        if (cancelled) return
        setCategory(match)
        setOfferings(offeringPage.items)
        setProducts(productPage.items)
        setOfferingPages(Math.max(1, offeringPage.totalPages ?? 1))
        setStatus('ready')
      } catch (cause) {
        if (cancelled) return
        setStatus('error')
        setError(cause instanceof Error ? cause.message : 'Offerings could not be loaded.')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [categoryKey, page])

  const visibleOfferings = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return offerings
    return offerings.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        (item.providerName ?? '').toLowerCase().includes(needle)
    )
  }, [offerings, query])

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return products
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(needle) ||
        (item.insurerName ?? '').toLowerCase().includes(needle)
    )
  }, [products, query])

  function toggle(key: string) {
    setSelected((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key].slice(0, 4)
    )
  }

  if (missing) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] px-4 py-16">
        <MarketplaceEmpty message="No offering available" />
        <Link href="/marketplace" className="text-[14px] text-black/50 underline">
          Back to marketplace
        </Link>
      </div>
    )
  }

  const compareHref = `/marketplace/compare?${selected
    .map((value) => `offerings=${encodeURIComponent(value)}`)
    .join('&')}`

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        <nav
          className="flex items-center gap-2 text-[13px] text-black/45 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/marketplace" className="hover:text-black transition-colors">
            Marketplace
          </Link>
          <span className="text-black/25">›</span>
          <span className="text-black/70 font-medium">{category?.name ?? 'Category'}</span>
        </nav>

        <div className="mb-7">
          <h1 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-black/85 mb-1">
            {category?.name ?? 'Category'}
          </h1>
          <p className="text-[14px] sm:text-[15px] text-black/50">{category?.description}</p>
        </div>

        <MarketplacePlanSearch
          className="mb-6 max-w-xl lg:max-w-2xl"
          query={query}
          onQueryChange={setQuery}
        />

        {selected.length > 1 ? (
          <div className="mb-6">
            <Button size="md" asChild>
              <Link href={compareHref}>Compare {selected.length} offerings</Link>
            </Button>
          </div>
        ) : null}

        {status === 'error' ? (
          <p role="alert" className="text-red-600 text-[15px]">
            {error}
          </p>
        ) : null}
        {status === 'loading' ? (
          <div className="h-40 rounded-[16px] bg-black/5 animate-pulse" />
        ) : null}

        {status === 'ready' && visibleOfferings.length === 0 && visibleProducts.length === 0 ? (
          <MarketplaceEmpty message="No offering available" />
        ) : null}

        {visibleOfferings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {visibleOfferings.map((offering) => {
              const key = `${offering.offeringType}:${offering.id}`
              return (
                <div key={key} className="relative">
                  <label className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[12px] text-black/60">
                    <input
                      type="checkbox"
                      checked={selected.includes(key)}
                      onChange={() => toggle(key)}
                    />
                    Compare
                  </label>
                  <OfferingCard offering={offering} categorySlug={category?.slug || categoryKey} />
                </div>
              )
            })}
          </div>
        ) : null}

        {visibleProducts.length > 0 ? (
          <div className="mt-10">
            <h2 className="font-serif text-[22px] font-bold text-black/80 mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={category?.slug || categoryKey}
                />
              ))}
            </div>
          </div>
        ) : null}

        {offeringPages > 1 ? (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: offeringPages }, (_, index) => index + 1).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPage(item)}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full font-sans text-[14px] font-semibold',
                  page === item
                    ? 'bg-black text-white'
                    : 'bg-white border border-black/20 text-black/60'
                )}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
