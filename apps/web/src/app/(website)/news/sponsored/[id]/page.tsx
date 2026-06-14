import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@wrapa/ui'
import { SPONSORED_ADS } from '@/components/website/sponsored-ads-section/sponsored-ads-data'

interface SponsoredAdPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return SPONSORED_ADS.map((ad) => ({ id: ad.id }))
}

export async function generateMetadata({ params }: SponsoredAdPageProps) {
  const { id } = await params
  const ad = SPONSORED_ADS.find((a) => a.id === id)
  if (!ad) return {}
  return {
    title: `${ad.title} — ${ad.orgName} | WRAPA`,
    description: ad.description,
  }
}

export default async function SponsoredAdPage({ params }: SponsoredAdPageProps) {
  const { id } = await params
  const ad = SPONSORED_ADS.find((a) => a.id === id)

  if (!ad) notFound()

  const others = SPONSORED_ADS.filter((a) => a.id !== id).slice(0, 3)

  return (
    <div className="bg-white">
      {/* Hero image */}
      <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[520px] overflow-hidden bg-gray-100">
        <Image src={ad.image} alt={ad.title} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

        {/* Sponsored label over the image */}
        <div className="absolute bottom-5 left-6 lg:bottom-8 lg:left-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-400/90 text-amber-950 backdrop-blur-sm">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden>
              <circle cx="4" cy="4" r="4" />
            </svg>
            Sponsored content
          </span>
        </div>
      </div>

      {/* Ad body */}
      <div className="mx-auto max-w-[860px] px-6 lg:px-8 py-10 lg:py-16">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[14px] lg:text-[16px] text-black/50 hover:text-black transition-colors duration-150 mb-8"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" stroke="currentColor" />
          </svg>
          Back to News
        </Link>

        {/* Org identity */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="size-10 lg:size-12 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] lg:text-[15px] font-bold shadow-sm"
            style={{ backgroundColor: ad.orgColor }}
            aria-label={ad.orgName}
          >
            {ad.orgInitials}
          </div>
          <div>
            <p className="text-[15px] lg:text-[17px] font-semibold text-black/80">{ad.orgName}</p>
            <p className="text-[12px] lg:text-[13px] text-black/45">Verified WRAPA partner</p>
          </div>
        </div>

        {/* Category */}
        <span className="text-[13px] font-semibold uppercase tracking-widest text-[#990505]">
          {ad.category}
        </span>

        {/* Title */}
        <h1 className="font-serif text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight text-black/90 mt-3 mb-6 lg:mb-8">
          {ad.title}
        </h1>

        {/* Lead / short description */}
        <p className="text-[17px] lg:text-[21px] leading-[1.7] text-black/70 font-medium border-l-4 border-[#990505] pl-5 mb-8 lg:mb-12">
          {ad.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-black/10 mb-8 lg:mb-12" />

        {/* Full body */}
        <div className="space-y-6 lg:space-y-8">
          {ad.body.map((paragraph, i) => (
            <p key={i} className="text-[16px] lg:text-[19px] leading-[1.8] text-black/80">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA footer */}
        <div className="mt-10 lg:mt-14 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] lg:text-[14px] text-black/40 max-w-[420px]">
            This is sponsored content from {ad.orgName}. WRAPA does not endorse specific products —
            always review terms before purchasing.
          </p>
          <Button variant="default" size="md" fullWidth={false} asChild>
            <Link href={ad.websiteUrl} target="_blank" rel="noopener noreferrer">
              Visit {ad.orgName} →
            </Link>
          </Button>
        </div>
      </div>

      {/* Other sponsored content */}
      {others.length > 0 && (
        <div className="bg-[#fafafa] py-14 lg:py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <h2 className="font-serif text-[26px] lg:text-[36px] font-bold text-black/80">
                More from our partners
              </h2>
              <Button variant="outline" size="sm" fullWidth={false} asChild>
                <Link href="/news#sponsored">See all</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/news/sponsored/${other.id}`}
                  className="group flex flex-col bg-white rounded-[10px] overflow-hidden border border-black/5 shadow-[0px_4px_160px_0px_rgba(0,0,0,0.06)] hover:shadow-[0px_8px_200px_0px_rgba(0,0,0,0.12)] transition-shadow duration-200"
                >
                  <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden shrink-0">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 lg:p-5 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-6 rounded-full flex items-center justify-center shrink-0 text-white text-[9px] font-bold"
                        style={{ backgroundColor: other.orgColor }}
                        aria-hidden
                      >
                        {other.orgInitials}
                      </div>
                      <span className="text-[12px] lg:text-[13px] font-semibold text-black/60 truncate">
                        {other.orgName}
                      </span>
                      <span className="shrink-0 ml-auto text-[9px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                        Ad
                      </span>
                    </div>
                    <h3 className="font-bold text-[14px] lg:text-[17px] leading-[1.4] text-black line-clamp-2">
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
