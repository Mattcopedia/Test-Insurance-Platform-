'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, cn } from '@wrapa/ui'
import { useInView } from '@/hooks/use-in-view'
import { scrollRevealClasses, scrollRevealStagger } from '@/lib/scroll-reveal'
import { formatPublished } from '@/lib/format-date'
import NewsApi from '@/services/news'
import type { NewsArticle } from '@/services/news/types'

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
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
          'transition-[transform,box-shadow,border-color] duration-300 ease-out'
        )}
      >
        <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[260px] overflow-hidden rounded-tl-[10px] rounded-tr-[10px] bg-[#ead9c2]">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
          <p className="text-[16px] lg:text-[20px] text-black/80">
            {formatPublished(article.publishedAt)}
          </p>
          <h3 className="font-bold text-[18px] lg:text-[25px] leading-[1.4] text-black line-clamp-3">
            {article.title}
          </h3>
        </div>
      </a>
    </div>
  )
}

export function NewsSection() {
  const { ref: headingRef, isInView: headingInView } = useInView()
  const [articles, setArticles] = useState<NewsArticle[]>([])

  useEffect(() => {
    let cancelled = false
    NewsApi.getNews({ page: 1, pageSize: 4 })
      .then((page) => {
        if (!cancelled) setArticles(page.items)
      })
      .catch(() => {
        if (!cancelled) setArticles([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (articles.length === 0) return null

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div
          ref={headingRef}
          className={cn(
            'flex items-end justify-between mb-10 lg:mb-14',
            scrollRevealClasses(headingInView, 'heading')
          )}
        >
          <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[64px] font-bold text-black/80 leading-tight">
            Wrapa News
          </h2>
          <Button variant="outline" size="md" fullWidth={false} asChild>
            <Link href="/news">See all news</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
