'use client'

import { Button, formatMoney } from '@wrapa/ui'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import MarketplaceApi from '@/services/marketplace'
import type { MarketplaceOfferingDetail, MarketplaceReview } from '@/services/marketplace/types'
import { ReviewsBlock } from '../../../../components/reviews-block'
import { MarketplaceEmpty } from '../../../../components/marketplace-empty'
import { marketplaceLoginHref, reviewsFrom } from '../../../../lib'

interface Props {
  params: Promise<{ categoryId: string; type: string; id: string }>
}

export default function OfferingDetailPage({ params }: Props) {
  const { categoryId, type, id } = use(params)
  const [detail, setDetail] = useState<MarketplaceOfferingDetail | null>(null)
  const [reviews, setReviews] = useState<MarketplaceReview[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const [nextDetail, nextReviews] = await Promise.all([
          MarketplaceApi.getOffering(type, id),
          MarketplaceApi.getOfferingReviews(type, id),
        ])
        if (cancelled) return
        setDetail(nextDetail)
        setReviews(reviewsFrom(nextReviews) as MarketplaceReview[])
        setStatus('ready')
      } catch (cause) {
        if (cancelled) return
        setStatus('error')
        setError(cause instanceof Error ? cause.message : 'Offering could not be loaded.')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [id, type])

  const offering = detail?.offering
  const login = marketplaceLoginHref(`/marketplace/offerings/${type}/${id}`)
  const currency = offering?.currency
  const price = offering?.headlinePrice

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[680px] px-4 sm:px-6 py-10 lg:py-16">
        <nav
          className="flex items-center gap-2 text-[13px] text-black/45 mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/marketplace" className="hover:text-black">
            Marketplace
          </Link>
          <span>›</span>
          <Link href={`/marketplace/${categoryId}`} className="hover:text-black">
            {categoryId}
          </Link>
        </nav>

        {status === 'loading' ? (
          <div className="h-48 rounded-[16px] bg-black/5 animate-pulse" />
        ) : null}
        {status === 'error' ? (
          <p role="alert" className="text-red-600">
            {error}
          </p>
        ) : null}
        {status === 'ready' && !offering ? (
          <MarketplaceEmpty message="No offering available" />
        ) : null}

        {offering ? (
          <div className="bg-white rounded-[16px] border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-7 sm:p-9 mb-8">
            <h1 className="font-serif text-[22px] sm:text-[26px] font-bold text-black/85">
              {offering.name}
            </h1>
            <p className="text-[14px] text-black/45 mt-1">{offering.providerName}</p>
            <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed mt-4">
              {offering.description}
            </p>
            <p className="text-[16px] font-bold text-black/85 mt-6">
              {currency && currency.length === 3 && price != null
                ? `${formatMoney(price, currency)}${offering.headlineBillingPeriod ? ` / ${offering.headlineBillingPeriod}` : ''}`
                : 'Price on request'}
            </p>

            <div className="rounded-[10px] bg-black/4 px-4 py-3 my-6">
              <p className="text-[13px] sm:text-[14px] text-black/60 text-center">
                Sign in or create an account to purchase this plan
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="md" fullWidth asChild>
                <a href={login}>Buy this plan</a>
              </Button>
              <Button variant="outline" size="md" fullWidth asChild>
                <a href={login}>Get a quote</a>
              </Button>
            </div>
          </div>
        ) : null}

        {status === 'ready' ? <ReviewsBlock reviews={reviews} writeHref={login} /> : null}
      </div>
    </div>
  )
}
