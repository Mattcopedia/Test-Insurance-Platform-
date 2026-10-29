'use client'

import { useEffect, useState } from 'react'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses } from '@/lib/scroll-reveal'
import Image from 'next/image'
import TestimonialsApi from '@/services/testimonials'
import type { Testimonial } from '@/services/testimonials/types'

const FALLBACK_AVATAR = '/assets/icons/Testimonial 1.svg'

function roleLine(item: Testimonial) {
  return [item.authorTitle, item.organizationName].filter(Boolean).join(', ')
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const role = roleLine(item)

  return (
    <article
      className={cn(
        'w-[340px] sm:w-[380px] lg:w-[550px] shrink-0',
        'min-h-[220px] sm:min-h-[240px]',
        'bg-white rounded-[16px] border border-black/[0.06]',
        'shadow-[0_4px_32px_rgba(0,0,0,0.10)]',
        'p-6 sm:p-7 lg:p-8 flex flex-col gap-5'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative size-12 sm:size-14 rounded-full overflow-hidden shrink-0 bg-gray-100">
          <Image
            src={item.avatarUrl || FALLBACK_AVATAR}
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[20px] sm:text-[17px] font-bold text-black/90 leading-tight">
            {item.authorName}
          </p>
          {role ? <p className="text-[18px] sm:text-[20px] text-black/45 mt-0.5">{role}</p> : null}
        </div>
      </div>

      <p className="text-[18px] sm:text-[22px] lg:text-[25px] leading-[1.7] text-black/70">
        {item.quote}
      </p>
    </article>
  )
}

function MarqueeTrack({ items, duplicate = false }: { items: Testimonial[]; duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-stretch gap-5 sm:gap-6 pr-5 sm:pr-6"
      aria-hidden={duplicate || undefined}
    >
      {items.map((item) => (
        <TestimonialCard key={`${duplicate ? 'dup-' : ''}${item.id}`} item={item} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { ref: headingRef, isInView: headingInView } = useInView()
  const [items, setItems] = useState<Testimonial[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    TestimonialsApi.list({ featured: true, limit: 12 })
      .then((result) => {
        if (cancelled) return
        setItems(result)
      })
      .catch(() => {
        if (!cancelled) setItems([])
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!ready || items.length === 0) return null

  return (
    <section className="bg-[#f7f8fa] py-14 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div
          ref={headingRef}
          className={cn('mb-10 lg:mb-12', scrollRevealClasses(headingInView, 'heading'))}
        >
          <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-black/85 leading-[1.15] mb-3">
            Why businesses and individuals are choosing Wrapa
          </h2>
          <p className="text-[16px] lg:text-[18px] leading-relaxed text-black/55 max-w-[640px]">
            Here is what some of them say about Wrapa.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" aria-label="Customer testimonials">
        <div className="testimonials-marquee-track flex w-max will-change-transform">
          <MarqueeTrack items={items} />
          <MarqueeTrack items={items} duplicate />
        </div>
      </div>
    </section>
  )
}
