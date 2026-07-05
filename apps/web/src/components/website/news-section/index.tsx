'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button, cn } from '@wrapa/ui'
import { useInView } from '@/hooks/use-in-view'

const NEWS_ITEMS = [
  {
    image: 'https://www.figma.com/api/mcp/asset/f2e18762-c9db-4b58-bb87-329accd4ed0b',
    date: 'September 27, 2023',
    title:
      "'With growing pensions, there is potential for increased liquidity, investment in Nigeria's financial market'",
    slug: 'growing-pensions-liquidity',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/c7d5c43c-965b-453c-be34-ced60b06502e',
    date: 'September 27, 2023',
    title: 'Stanbic IBTC Pension, Access, three others hold 64% of new registered contributors Q2',
    slug: 'stanbic-ibtc-pension',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/631023d9-d8e6-41bb-acd5-47a3f8a764d6',
    date: 'September 27, 2023',
    title: '14-years old Ndanyongmong emerges 2023 Heirs Life Essay Champion',
    slug: 'heirs-life-essay-champion',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/f4afe95b-0934-4176-a5bb-869e4ae153e1',
    date: 'September 27, 2023',
    title: "'Sanlam Nigeria says it settled motor insurance claim in one hour'",
    slug: 'sanlam-nigeria-claim',
  },
]

function NewsCard({
  image,
  date,
  title,
  slug,
  index,
}: {
  image: string
  date: string
  title: string
  slug: string
  index: number
}) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'p-2 transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: isInView ? `${Math.min(index * 80, 300)}ms` : '0ms' }}
    >
      <Link
        href={`/news/${slug}`}
        className={cn(
          'group flex flex-col h-full cursor-pointer bg-white rounded-[10px] overflow-hidden',
          'border-2 border-transparent shadow-[0px_4px_160px_0px_rgba(0,0,0,0.08)]',
          'hover:border-[#990505] hover:-translate-y-1 hover:shadow-[0px_12px_48px_0px_rgba(0,0,0,0.12)]',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out'
        )}
      >
        {/* Image */}
        <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px] overflow-hidden rounded-tl-[10px] rounded-tr-[10px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
          <p className="text-[16px] lg:text-[20px] text-black/80">{date}</p>
          <h3 className="font-bold text-[18px] lg:text-[25px] leading-[1.4] text-black line-clamp-3">
            {title}
          </h3>
        </div>
      </Link>
    </div>
  )
}

export function NewsSection() {
  const { ref: headingRef, isInView: headingInView } = useInView()

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Section Header */}
        <div
          ref={headingRef}
          className={cn(
            'flex items-end justify-between mb-10 lg:mb-14 transition-[opacity,transform] duration-1000 ease-out',
            headingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <h2 className="font-serif text-[48px] lg:text-[64px] font-bold text-black/80 leading-tight">
            Wrapa News
          </h2>
          <Button variant="outline" size="md" fullWidth={false} asChild>
            <Link href="/news">See all news</Link>
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {NEWS_ITEMS.map((item, i) => (
            <NewsCard key={item.slug} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
