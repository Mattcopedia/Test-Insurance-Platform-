'use client'

import Image from 'next/image'
import { cn } from '@wrapa/ui'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'
import { formatPublished } from '@/lib/format-date'
import { useInView } from '@/hooks/use-in-view'
import type { NewsArticle } from '@/services/news/types'

interface NewsCardProps {
  article: NewsArticle
  className?: string
  index?: number
}

export function NewsCard({ article, className, index = 0 }: NewsCardProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn('p-2', scrollRevealClasses(isInView, 'card'))}
      style={scrollRevealStagger(isInView, index)}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex flex-col h-full cursor-pointer bg-white rounded-[10px] overflow-hidden',
          'border-2 border-transparent shadow-[0px_4px_160px_0px_rgba(0,0,0,0.08)]',
          'hover:border-[#990505] hover:-translate-y-1 hover:shadow-[0px_12px_48px_0px_rgba(0,0,0,0.12)]',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out',
          className
        )}
      >
        <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[240px] overflow-hidden bg-[#ead9c2]">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
          <span className="inline-block text-[12px] lg:text-[13px] font-semibold uppercase tracking-widest text-[#990505]">
            {article.topic}
          </span>

          <h3 className="font-bold text-[17px] lg:text-[22px] leading-[1.4] text-black line-clamp-3">
            {article.title}
          </h3>

          {article.summary ? (
            <p className="text-[14px] lg:text-[17px] leading-[1.6] text-black/60 line-clamp-2 flex-1">
              {article.summary}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-black/8 mt-auto">
            <p className="text-[13px] lg:text-[15px] text-black/50">
              {formatPublished(article.publishedAt)}
            </p>
            <p className="text-[13px] lg:text-[15px] text-black/50 truncate">
              {article.sourceName}
            </p>
          </div>
        </div>
      </a>
    </div>
  )
}
