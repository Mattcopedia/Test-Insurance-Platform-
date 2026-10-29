'use client'

import { Button, formatMoney } from '@wrapa/ui'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import MarketplaceApi from '@/services/marketplace'
import type { MarketplaceProduct, MarketplaceReview } from '@/services/marketplace/types'
import { ReviewsBlock } from '../../components/reviews-block'
import { MarketplaceEmpty } from '../../components/marketplace-empty'
import { marketplaceLoginHref, reviewsFrom } from '../../lib'

interface Props {
  params: Promise<{ categoryId: string; productId: string }>
}

export default function ProductDetailPage({ params }: Props) {
  const { categoryId, productId } = use(params)
  const [product, setProduct] = useState<MarketplaceProduct | null>(null)
  const [reviews, setReviews] = useState<MarketplaceReview[]>([])
  const [insurerReviews, setInsurerReviews] = useState<MarketplaceReview[]>([])
  const [hasForm, setHasForm] = useState(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const nextProduct = await MarketplaceApi.getProduct(productId)
        const [productReviews, insurer, form] = await Promise.allSettled([
          MarketplaceApi.getProductReviews(productId),
          nextProduct.insurerOrganizationId
            ? MarketplaceApi.getInsurerReviews(nextProduct.insurerOrganizationId, {
                page: 1,
                pageSize: 6,
              })
            : Promise.resolve({ items: [] }),
          MarketplaceApi.getProductApplicationForm(productId),
        ])
        if (cancelled) return
        setProduct(nextProduct)
        setReviews(
          productReviews.status === 'fulfilled'
            ? (reviewsFrom(productReviews.value) as MarketplaceReview[])
            : []
        )
        setInsurerReviews(insurer.status === 'fulfilled' ? insurer.value.items : [])
        setHasForm(form.status === 'fulfilled')
        setStatus('ready')
      } catch (cause) {
        if (cancelled) return
        setStatus('error')
        setError(cause instanceof Error ? cause.message : 'No offering available')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [productId])

  const login = marketplaceLoginHref(`/marketplace/products/${productId}`)
  const currency = product?.currencyCode ?? product?.headline?.currency
  const price = product?.headline?.premium

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
          <div>
            <p role="alert" className="text-red-600 mb-4">
              {error}
            </p>
            <MarketplaceEmpty message="No offering available" />
          </div>
        ) : null}

        {product ? (
          <div className="bg-white rounded-[16px] border border-black/8 shadow-[0px_4px_24px_rgba(0,0,0,0.06)] p-7 sm:p-9 mb-8">
            <h1 className="font-serif text-[22px] sm:text-[26px] font-bold text-black/85">
              {product.name}
            </h1>
            <p className="text-[14px] text-black/45 mt-1">{product.insurerName}</p>
            <p className="text-[14px] sm:text-[15px] text-black/60 leading-relaxed mt-4">
              {product.description}
            </p>
            <p className="text-[16px] font-bold text-black/85 mt-6">
              {currency && currency.length === 3 && price != null
                ? `${formatMoney(price, currency)}${product.headline?.billingPeriod ? ` / ${product.headline.billingPeriod}` : ''}`
                : 'Price on request'}
            </p>
            {hasForm ? (
              <p className="text-[13px] text-black/50 mt-4">
                An application form is available after you sign in.
              </p>
            ) : null}

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
        {status === 'ready' && insurerReviews.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-serif text-[20px] font-bold text-black/80 mb-3">Insurer reviews</h2>
            <ReviewsBlock reviews={insurerReviews} writeHref={login} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
