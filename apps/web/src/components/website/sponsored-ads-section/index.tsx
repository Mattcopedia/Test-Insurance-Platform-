'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'
import { useInView } from '@/hooks/use-in-view'
import SponsoredPostsApi from '@/services/sponsored-posts'
import type { SponsoredSummary } from '@/services/sponsored-posts/types'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function AdCard({ ad, index }: { ad: SponsoredSummary; index: number }) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn('p-2', scrollRevealClasses(isInView, 'card'))}
      style={scrollRevealStagger(isInView, index)}
    >
      <Link
        href={`/news/sponsored/${ad.slug}`}
        className={cn(
          'group flex flex-col h-full cursor-pointer bg-white rounded-[10px] overflow-hidden',
          'border-2 border-transparent shadow-[0px_4px_160px_0px_rgba(0,0,0,0.08)]',
          'hover:border-[#990505] hover:-translate-y-1 hover:shadow-[0px_12px_48px_0px_rgba(0,0,0,0.12)]',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out'
        )}
      >
        <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden shrink-0 bg-[#ead9c2]">
          {ad.imageUrl ? (
            <Image
              src={ad.imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {ad.partnerLogoUrl ? (
                <Image
                  src={ad.partnerLogoUrl}
                  alt=""
                  width={32}
                  height={32}
                  className="size-7 lg:size-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="size-7 lg:size-8 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] lg:text-[11px] font-bold bg-[#10243f]">
                  {initials(ad.partnerName)}
                </div>
              )}
              <span className="text-[13px] lg:text-[14px] font-semibold text-black/70 truncate">
                {ad.partnerName}
              </span>
            </div>

            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] lg:text-[11px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              Sponsored
            </span>
          </div>

          <h3 className="font-bold text-[16px] lg:text-[20px] leading-[1.4] text-black line-clamp-2">
            {ad.title}
          </h3>

          <p className="text-[13px] lg:text-[15px] leading-[1.6] text-black/55 line-clamp-2 flex-1">
            {ad.excerpt}
          </p>

          <div className="pt-3 border-t border-black/8 mt-auto">
            <span className="text-[13px] lg:text-[14px] font-semibold text-[#990505] group-hover:underline">
              {ad.callToActionLabel || 'Learn more'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export function SponsoredAdsSection({
  placement = 'News',
}: {
  placement?: 'Any' | 'Homepage' | 'News' | 'Marketplace'
}) {
  const { ref: headingRef, isInView: headingInView } = useInView()
  const [posts, setPosts] = useState<SponsoredSummary[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    SponsoredPostsApi.list({ placement, limit: 6 })
      .then((items) => {
        if (!cancelled) setPosts(items)
      })
      .catch(() => {
        if (!cancelled) setPosts([])
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [placement])

  if (!ready || posts.length === 0) return null

  return (
    <section className="bg-[#fafafa] py-14 lg:py-20" aria-label="Sponsored content" id="sponsored">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div
          ref={headingRef}
          className={cn(
            'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12',
            scrollRevealClasses(headingInView, 'heading')
          )}
        >
          <div>
            <p className="text-[#990505] text-[13px] lg:text-[14px] font-semibold tracking-widest uppercase mb-2 lg:mb-3">
              Partner spotlight
            </p>
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-black/80 leading-tight">
              Sponsored by our partners
            </h2>
          </div>
          <p className="text-[13px] lg:text-[15px] text-black/45 max-w-[320px] sm:text-right">
            Promotional content from approved insurers and HMOs on the WRAPA platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((ad, index) => (
            <AdCard key={ad.id} ad={ad} index={index} />
          ))}
        </div>

        <p className="mt-8 lg:mt-10 text-[12px] text-black/35 text-center">
          {posts[0]?.disclosure ||
            'Sponsored content is approved by WRAPA before publication and does not constitute financial or medical advice.'}
        </p>
      </div>
    </section>
  )
}
