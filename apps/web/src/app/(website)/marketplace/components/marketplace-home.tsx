'use client'

import { MarketplaceCategoryCard, MarketplaceFilterTabs } from '@wrapa/ui'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import MarketplaceApi from '@/services/marketplace'
import type {
  MarketplaceCategory,
  MarketplaceGroup,
  MarketplaceOffering,
  MarketplaceProduct,
  MarketplaceReview,
} from '@/services/marketplace/types'
import { colorFrom, initialsFrom } from '../lib'
import { MarketplaceEmpty } from './marketplace-empty'
import { OfferingCard, ProductCard } from './offering-card'

function isHmo(category: MarketplaceCategory) {
  const group = `${category.group ?? ''} ${category.slug}`.toLowerCase()
  return group.includes('hmo')
}

function audienceOf(category: MarketplaceCategory) {
  return category.groupInfo?.audience ?? ''
}

export function MarketplaceHome() {
  const [activeTab, setActiveTab] = useState('Insurance')
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [categories, setCategories] = useState<MarketplaceCategory[]>([])
  const [groups, setGroups] = useState<MarketplaceGroup[]>([])
  const [bestSellers, setBestSellers] = useState<MarketplaceOffering[]>([])
  const [recommendations, setRecommendations] = useState<MarketplaceOffering[]>([])
  const [basic, setBasic] = useState<MarketplaceProduct[]>([])
  const [reviews, setReviews] = useState<MarketplaceReview[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      setError(null)
      try {
        const [nextCategories, nextGroups, nextBest, nextRecs, nextBasic, nextReviews] =
          await Promise.all([
            MarketplaceApi.getCategories({ activeOnly: true }),
            MarketplaceApi.getGroups({ activeOnly: true }),
            MarketplaceApi.getBestSellers({ limit: 8 }),
            MarketplaceApi.getRecommendations({ limit: 8 }),
            MarketplaceApi.getRecommendationsBasic({ limit: 8 }),
            MarketplaceApi.getReviews({ page: 1, pageSize: 6 }),
          ])
        if (cancelled) return
        setCategories(nextCategories)
        setGroups(nextGroups)
        setBestSellers(nextBest)
        setRecommendations(nextRecs)
        setBasic(nextBasic)
        setReviews(nextReviews.items)
        setStatus('ready')
      } catch (cause) {
        if (cancelled) return
        setStatus('error')
        setError(cause instanceof Error ? cause.message : 'Marketplace could not be loaded.')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const groupNames = useMemo(
    () => [...new Set(groups.map((group) => group.name).filter(Boolean))],
    [groups]
  )

  const visible = useMemo(() => {
    return categories.filter((category) => {
      if (activeTab === 'HMO' && !isHmo(category)) return false
      if (activeTab === 'Insurance' && isHmo(category)) return false
      const audience = audienceOf(category)
      if (activeTab === 'Personal' && audience !== 'Personal' && audience !== 'Both') return false
      if (activeTab === 'Business' && audience !== 'Business' && audience !== 'Both') return false
      if (activeGroup && category.group !== activeGroup && category.groupInfo?.name !== activeGroup)
        return false
      return true
    })
  }, [activeGroup, activeTab, categories])

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="mb-8">
          <h1 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] font-bold text-black/85 mb-1">
            Marketplace
          </h1>
          <p className="text-[15px] sm:text-[16px] text-black/50">
            Browse plans by category and find the right cover for you.
          </p>
        </div>

        {status === 'error' ? (
          <p role="alert" className="text-red-600 text-[15px] mb-8">
            {error}
          </p>
        ) : null}

        <div className="mb-8">
          <MarketplaceFilterTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setActiveGroup(null)
            }}
            groups={groupNames}
            activeGroup={activeGroup}
            onGroupChange={setActiveGroup}
          />
        </div>

        {status === 'loading' ? (
          <div className="h-40 rounded-[16px] bg-black/5 animate-pulse mb-12" />
        ) : visible.length === 0 ? (
          <MarketplaceEmpty message="No offering available" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 mb-14">
            {visible.map((cat) => (
              <MarketplaceCategoryCard
                key={cat.id}
                initials={initialsFrom(cat.name)}
                color={colorFrom(cat.id)}
                name={cat.name}
                group={cat.group || cat.groupInfo?.name || 'Cover'}
                description={cat.description || ''}
                href={`/marketplace/${cat.slug || cat.id}`}
              />
            ))}
          </div>
        )}

        <Rail title="Best sellers">
          {status === 'loading' ? (
            <div className="h-32 rounded-[16px] bg-black/5 animate-pulse" />
          ) : bestSellers.length === 0 ? (
            <MarketplaceEmpty message="No Best offering based on reviews" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {bestSellers.map((offering) => (
                <OfferingCard
                  key={`${offering.offeringType}-${offering.id}`}
                  offering={offering}
                  categorySlug={offering.categoryId || 'all'}
                />
              ))}
            </div>
          )}
        </Rail>

        <Rail title="Recommended for you">
          {status === 'loading' ? (
            <div className="h-32 rounded-[16px] bg-black/5 animate-pulse" />
          ) : recommendations.length === 0 ? (
            <MarketplaceEmpty message="No recommendation offering" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {recommendations.map((offering) => (
                <OfferingCard
                  key={`${offering.offeringType}-${offering.id}`}
                  offering={offering}
                  categorySlug={offering.categoryId || 'all'}
                />
              ))}
            </div>
          )}
        </Rail>

        <Rail title="Suggested products">
          {status === 'loading' ? (
            <div className="h-32 rounded-[16px] bg-black/5 animate-pulse" />
          ) : basic.length === 0 ? (
            <MarketplaceEmpty message="No recommendation offering" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {basic.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={product.categoryId || 'all'}
                />
              ))}
            </div>
          )}
        </Rail>

        <Rail title="Reviews">
          {status === 'loading' ? (
            <div className="h-32 rounded-[16px] bg-black/5 animate-pulse" />
          ) : reviews.length === 0 ? (
            <MarketplaceEmpty message="No Best offering based on reviews" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, index) => (
                <article
                  key={review.id || String(index)}
                  className="rounded-[16px] bg-white border border-black/5 p-5 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]"
                >
                  <p className="text-[14px] font-semibold text-black/80 mb-1">
                    {review.reviewerName || review.authorName || 'Customer'}
                  </p>
                  <p className="text-[13px] text-black/45 mb-3">
                    {review.rating != null ? `${review.rating}/5` : 'Review'}
                  </p>
                  <p className="text-[14px] text-black/65 leading-relaxed">
                    {review.comment || review.body || review.title || 'No comment'}
                  </p>
                </article>
              ))}
            </div>
          )}
        </Rail>
      </div>
    </div>
  )
}

function Rail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-14">
      <h2 className="font-serif text-[24px] lg:text-[30px] font-bold text-black/85 mb-5">
        {title}
      </h2>
      {children}
    </section>
  )
}
