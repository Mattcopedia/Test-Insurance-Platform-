'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { formatMoney } from '@wrapa/ui'
import MarketplaceApi from '@/services/marketplace'
import type { MarketplaceOfferingDetail, MarketplaceProduct } from '@/services/marketplace/types'
import { MarketplaceEmpty } from '../components/marketplace-empty'

function CompareBody() {
  const params = useSearchParams()
  const offerings = params.getAll('offerings')
  const productIds = params.getAll('productIds')
  const [offeringRows, setOfferingRows] = useState<MarketplaceOfferingDetail[]>([])
  const [productRows, setProductRows] = useState<MarketplaceProduct[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const nextOfferings =
          offerings.length > 0
            ? await MarketplaceApi.compareOfferings(offerings).catch(async () =>
                MarketplaceApi.postCompareOfferings({ offerings })
              )
            : []
        const nextProducts =
          productIds.length > 0
            ? await MarketplaceApi.compareProducts(productIds).catch(async () =>
                MarketplaceApi.postCompareProducts({ productIds })
              )
            : []
        if (cancelled) return
        setOfferingRows(nextOfferings)
        setProductRows(nextProducts)
        setStatus('ready')
      } catch (cause) {
        if (cancelled) return
        setStatus('error')
        setError(cause instanceof Error ? cause.message : 'Compare is not available.')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [offerings.join('|'), productIds.join('|')])

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10 py-10">
        <Link href="/marketplace" className="text-[13px] text-black/45 hover:text-black">
          ← Marketplace
        </Link>
        <h1 className="font-serif text-[28px] lg:text-[36px] font-bold text-black/85 mt-4 mb-8">
          Compare
        </h1>

        {status === 'loading' ? (
          <div className="h-40 rounded-[16px] bg-black/5 animate-pulse" />
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        ) : null}
        {status === 'ready' && offeringRows.length === 0 && productRows.length === 0 ? (
          <MarketplaceEmpty message="No offering available" />
        ) : null}

        {offeringRows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offeringRows.map((row) => {
              const offering = row.offering
              const currency = offering.currency
              const price = offering.headlinePrice
              return (
                <article
                  key={`${offering.offeringType}-${offering.id}`}
                  className="rounded-[16px] bg-white border border-black/8 p-5"
                >
                  <h2 className="font-sans text-[16px] font-bold text-black/85">{offering.name}</h2>
                  <p className="text-[13px] text-black/45">{offering.providerName}</p>
                  <p className="text-[15px] font-bold mt-3">
                    {currency && currency.length === 3 && price != null
                      ? formatMoney(price, currency)
                      : 'Price on request'}
                  </p>
                  <p className="text-[14px] text-black/60 mt-2">{offering.description}</p>
                </article>
              )
            })}
          </div>
        ) : null}

        {productRows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {productRows.map((product) => {
              const currency = product.currencyCode ?? product.headline?.currency
              const price = product.headline?.premium
              return (
                <article
                  key={product.id}
                  className="rounded-[16px] bg-white border border-black/8 p-5"
                >
                  <h2 className="font-sans text-[16px] font-bold text-black/85">{product.name}</h2>
                  <p className="text-[13px] text-black/45">{product.insurerName}</p>
                  <p className="text-[15px] font-bold mt-3">
                    {currency && currency.length === 3 && price != null
                      ? formatMoney(price, currency)
                      : 'Price on request'}
                  </p>
                </article>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fb]" />}>
      <CompareBody />
    </Suspense>
  )
}
