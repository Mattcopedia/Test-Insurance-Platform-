import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@wrapa/ui'
import { SPONSORED_ADS, type SponsoredAd } from './sponsored-ads-data'

function AdCard({ ad }: { ad: SponsoredAd }) {
  const detailHref = `/news/sponsored/${ad.id}`

  return (
    <Link
      href={detailHref}
      className={cn(
        'group flex flex-col bg-white rounded-[10px] overflow-hidden',
        'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.08)]',
        'border border-black/5',
        'hover:shadow-[0px_8px_200px_0px_rgba(0,0,0,0.14)] transition-shadow duration-200'
      )}
    >
      {/* Image */}
      <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden shrink-0">
        <Image
          src={ad.image}
          alt={ad.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
        {/* Org row + Sponsored badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="size-7 lg:size-8 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] lg:text-[11px] font-bold"
              style={{ backgroundColor: ad.orgColor }}
              aria-hidden
            >
              {ad.orgInitials}
            </div>
            <span className="text-[13px] lg:text-[14px] font-semibold text-black/70 truncate">
              {ad.orgName}
            </span>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] lg:text-[11px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden>
              <circle cx="4" cy="4" r="4" />
            </svg>
            Sponsored
          </span>
        </div>

        {/* Category */}
        <span className="text-[11px] lg:text-[12px] font-semibold uppercase tracking-widest text-[#990505]">
          {ad.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[16px] lg:text-[20px] leading-[1.4] text-black line-clamp-2">
          {ad.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] lg:text-[15px] leading-[1.6] text-black/55 line-clamp-2 flex-1">
          {ad.description}
        </p>

        {/* CTA */}
        <div className="pt-3 border-t border-black/8 mt-auto flex items-center justify-between">
          <span className="text-[13px] lg:text-[14px] font-semibold text-[#990505] group-hover:underline">
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  )
}

export function SponsoredAdsSection() {
  return (
    <section className="bg-[#fafafa] py-14 lg:py-20" aria-label="Sponsored content">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 lg:mb-12">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SPONSORED_ADS.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>

        {/* Disclosure */}
        <p className="mt-8 lg:mt-10 text-[12px] text-black/35 text-center">
          Sponsored content is approved by WRAPA before publication and does not constitute
          financial or medical advice.
        </p>
      </div>
    </section>
  )
}
