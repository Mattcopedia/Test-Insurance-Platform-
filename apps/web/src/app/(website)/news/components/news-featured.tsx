'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button, cn } from '@wrapa/ui'
import { useInView } from '@/hooks/use-in-view'
import type { NewsArticle } from './news-data'

interface NewsFeaturedProps {
  article: NewsArticle
}

export function NewsFeatured({ article }: NewsFeaturedProps) {
  const { ref, isInView } = useInView()

  return (
    <div
      ref={ref}
      className={cn(
        'p-2 transition-[opacity,transform] duration-1000 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
    >
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[16px] overflow-hidden cursor-pointer',
          'border-2 border-transparent shadow-[0px_4px_160px_0px_rgba(0,0,0,0.1)]',
          'hover:border-[#990505] hover:-translate-y-1 hover:shadow-[0px_12px_48px_0px_rgba(0,0,0,0.12)]',
          'transition-[transform,box-shadow,border-color] duration-300 ease-out'
        )}
      >
        {/* Image */}
        <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[480px] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="bg-white p-8 lg:p-12 xl:p-16 flex flex-col justify-center gap-5">
          <div className="flex items-center gap-3">
            <span className="text-[12px] lg:text-[13px] font-semibold uppercase tracking-widest text-[#990505]">
              {article.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span className="text-[13px] lg:text-[15px] text-black/50">{article.readTime}</span>
          </div>

          <h2 className="font-serif text-[24px] sm:text-[30px] lg:text-[36px] xl:text-[40px] font-bold leading-[1.3] text-black/90">
            {article.title}
          </h2>

          <p className="text-[15px] lg:text-[18px] leading-[1.7] text-black/60 max-w-[540px]">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-black/10">
            <p className="text-[14px] lg:text-[16px] text-black/50">{article.date}</p>
            <Button variant="outline" size="sm" fullWidth={false} asChild>
              <Link href={`/news/${article.slug}`}>Read article</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
