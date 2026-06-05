'use client'

import { useState } from 'react'
import { cn } from '@wrapa/ui'
import { NewsCard } from './news-card'
import { CATEGORIES, GRID_ARTICLES } from './news-data'
import type { NewsCategory } from './news-data'

export function NewsCategoryFilter() {
  const [active, setActive] = useState<NewsCategory>('All')

  const filtered =
    active === 'All' ? GRID_ARTICLES : GRID_ARTICLES.filter((a) => a.category === active)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 lg:mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-[14px] lg:text-[16px] font-medium transition-colors duration-150 border',
              active === cat
                ? 'bg-black text-white border-black'
                : 'bg-white text-black/60 border-black/20 hover:border-black/50 hover:text-black'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <NewsGrid articles={filtered} />
    </div>
  )
}

function NewsGrid({ articles }: { articles: typeof GRID_ARTICLES }) {
  if (articles.length === 0) {
    return (
      <div className="py-16 text-center text-black/40 text-[18px]">
        No articles in this category yet.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((article) => (
        <NewsCard key={article.slug} article={article} />
      ))}
    </div>
  )
}
