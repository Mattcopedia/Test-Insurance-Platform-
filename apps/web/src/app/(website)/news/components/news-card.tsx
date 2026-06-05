import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@wrapa/ui'
import type { NewsArticle } from './news-data'

interface NewsCardProps {
  article: NewsArticle
  className?: string
}

export function NewsCard({ article, className }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className={cn(
        'group flex flex-col bg-white rounded-[10px] shadow-[0px_4px_160px_0px_rgba(0,0,0,0.08)] overflow-hidden',
        'hover:shadow-[0px_8px_200px_0px_rgba(0,0,0,0.14)] transition-shadow duration-200',
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full h-[180px] sm:h-[220px] lg:h-[240px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
        {/* Category badge */}
        <span className="inline-block text-[12px] lg:text-[13px] font-semibold uppercase tracking-widest text-[#990505]">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-[17px] lg:text-[22px] leading-[1.4] text-black line-clamp-3">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[14px] lg:text-[17px] leading-[1.6] text-black/60 line-clamp-2 flex-1">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-black/8 mt-auto">
          <p className="text-[13px] lg:text-[15px] text-black/50">{article.date}</p>
          <p className="text-[13px] lg:text-[15px] text-black/50">{article.readTime}</p>
        </div>
      </div>
    </Link>
  )
}
