import { Button } from '@wrapa/ui'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SponsoredPostsApi from '@/services/sponsored-posts'
import type { SponsoredPost } from '@/services/sponsored-posts/types'
import { ApiRequestError } from '@/services/api/schema'

interface SponsoredAdPageProps {
  params: Promise<{ slug: string }>
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export async function generateMetadata({ params }: SponsoredAdPageProps) {
  const { slug } = await params
  try {
    const ad = await SponsoredPostsApi.getBySlug(slug)
    return {
      title: `${ad.title} | ${ad.partnerName} | WRAPA`,
      description: ad.excerpt,
    }
  } catch {
    return { title: 'Sponsored story | WRAPA' }
  }
}

export default async function SponsoredAdPage({ params }: SponsoredAdPageProps) {
  const { slug } = await params

  let ad: SponsoredPost
  try {
    ad = await SponsoredPostsApi.getBySlug(slug)
  } catch (error) {
    if (error instanceof ApiRequestError) notFound()
    notFound()
  }

  const paragraphs = ad.body.split(/\n{2,}/).filter((paragraph) => paragraph.trim().length > 0)
  let others: Awaited<ReturnType<typeof SponsoredPostsApi.list>> = []
  try {
    others = (await SponsoredPostsApi.list({ placement: ad.placement, limit: 4 })).filter(
      (item) => item.slug !== ad.slug
    )
  } catch {
    others = []
  }

  return (
    <div className="bg-white">
      <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[520px] overflow-hidden bg-[#ead9c2]">
        {ad.imageUrl ? (
          <Image src={ad.imageUrl} alt="" fill sizes="100vw" className="object-cover" priority />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-5 left-6 lg:bottom-8 lg:left-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-400/90 text-amber-950">
            Sponsored content
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-6 lg:px-8 py-10 lg:py-16">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[14px] lg:text-[16px] text-black/50 hover:text-black transition-colors duration-150 mb-8"
        >
          Back to News
        </Link>

        <div className="flex items-center gap-3 mb-6">
          {ad.partnerLogoUrl ? (
            <Image
              src={ad.partnerLogoUrl}
              alt=""
              width={48}
              height={48}
              className="size-10 lg:size-12 rounded-full object-cover"
            />
          ) : (
            <div className="size-10 lg:size-12 rounded-full flex items-center justify-center shrink-0 text-white text-[13px] lg:text-[15px] font-bold bg-[#10243f]">
              {initials(ad.partnerName)}
            </div>
          )}
          <div>
            <p className="text-[15px] lg:text-[17px] font-semibold text-black/80">
              {ad.partnerName}
            </p>
            <p className="text-[12px] lg:text-[13px] text-black/45">WRAPA partner</p>
          </div>
        </div>

        <h1 className="font-serif text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-tight text-black/90 mt-3 mb-6 lg:mb-8">
          {ad.title}
        </h1>

        <p className="text-[17px] lg:text-[21px] leading-[1.7] text-black/70 font-medium border-l-4 border-[#990505] pl-5 mb-8 lg:mb-12">
          {ad.excerpt}
        </p>

        <div className="h-px bg-black/10 mb-8 lg:mb-12" />

        <div className="space-y-6 lg:space-y-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[16px] lg:text-[19px] leading-[1.8] text-black/80">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 lg:mt-14 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] lg:text-[14px] text-black/40 max-w-[420px]">{ad.disclosure}</p>
          {ad.callToActionUrl ? (
            <Button variant="default" size="md" fullWidth={false} asChild>
              <a href={ad.callToActionUrl} target="_blank" rel="noopener noreferrer">
                {ad.callToActionLabel || `Visit ${ad.partnerName}`}
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      {others.length > 0 ? (
        <div className="bg-[#fafafa] py-14 lg:py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <h2 className="font-serif text-[26px] lg:text-[36px] font-bold text-black/80 mb-8 lg:mb-10">
              More from our partners
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {others.slice(0, 3).map((other) => (
                <Link
                  key={other.id}
                  href={`/news/sponsored/${other.slug}`}
                  className="group flex flex-col bg-white rounded-[10px] overflow-hidden border border-black/5 shadow-[0px_4px_160px_0px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden shrink-0 bg-[#ead9c2]">
                    {other.imageUrl ? (
                      <Image
                        src={other.imageUrl}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-4 lg:p-5 flex flex-col gap-2">
                    <p className="text-[12px] lg:text-[13px] font-semibold text-black/60 truncate">
                      {other.partnerName}
                    </p>
                    <h3 className="font-bold text-[14px] lg:text-[17px] leading-[1.4] text-black line-clamp-2">
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
