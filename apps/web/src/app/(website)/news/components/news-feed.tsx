'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@wrapa/ui'
import NewsApi from '@/services/news'
import type { NewsArticle, NewsQuery } from '@/services/news/types'
import { NewsCard } from './news-card'
import { NewsFeatured } from './news-featured'
import { NewsPagination } from './news-pagination'

const PAGE_SIZE = 4

type ScopeParam = NewsQuery['scope']
type TopicParam = NewsQuery['topic']

function pageFrom(params: URLSearchParams) {
  const page = Number(params.get('page'))
  return Number.isInteger(page) && page > 0 ? page : 1
}

function scopeFrom(params: URLSearchParams): ScopeParam {
  const scope = params.get('scope')
  if (scope === 'Local' || scope === 'Africa' || scope === 'Global') return scope
  return undefined
}

function topicFrom(params: URLSearchParams): TopicParam {
  const topic = params.get('topic')
  if (topic === 'Insurance' || topic === 'Health') return topic
  return undefined
}

const REGIONS = [
  { value: 'all', label: 'All regions' },
  { value: 'Local', label: 'Nigeria' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Global', label: 'Worldwide' },
] as const

const TOPICS = [
  { value: 'all', label: 'All topics' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Health', label: 'Health' },
] as const

function FilterMenu({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="flex w-[200px] max-w-full flex-col gap-2">
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="text-[14px] font-semibold text-[#161616] lg:text-[16px]"
      >
        {label}
      </label>
      <div ref={rootRef} className="relative">
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="flex h-[52px] w-full items-center justify-between gap-3 rounded-[10px] border border-black/15 bg-white px-4 text-left text-[15px] font-medium text-[#161616] shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none focus-visible:ring-2 focus-visible:ring-black/25 lg:h-[56px] lg:text-[16px]"
        >
          <span className="truncate">{selected?.label}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={cn('shrink-0 transition-transform duration-150', open && 'rotate-180')}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open ? (
          <ul
            role="listbox"
            aria-labelledby={`${id}-label`}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-auto rounded-[14px] border border-black/10 bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
          >
            {options.map((option) => {
              const active = option.value === value
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center px-4 py-3 text-left text-[15px] leading-6 text-[#161616] hover:bg-[#f3f3f3] lg:text-[16px]',
                      active && 'bg-[#f3f3f3] font-semibold'
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export function NewsFeed() {
  const router = useRouter()
  const params = useSearchParams()
  const page = pageFrom(params)
  const scope = scopeFrom(params)
  const topic = topicFrom(params)
  const country = params.get('country')
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const keepFiltersInView = useRef(false)

  function visit(next: { scope?: ScopeParam | 'all'; topic?: TopicParam | 'all'; page?: number }) {
    const search = new URLSearchParams()
    const nextScope = next.scope === 'all' ? undefined : (next.scope ?? scope)
    const nextTopic = next.topic === 'all' ? undefined : (next.topic ?? topic)
    const nextPage = next.page ?? 1

    if (nextScope) search.set('scope', nextScope)
    if (nextScope === 'Local') search.set('country', next.scope ? 'NG' : country || 'NG')
    if (nextTopic) search.set('topic', nextTopic)
    search.set('page', String(nextPage))
    search.set('pageSize', String(PAGE_SIZE))

    keepFiltersInView.current = true
    router.push(`/news?${search.toString()}`, { scroll: false })
  }

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      setError(null)
      const query: NewsQuery = { page, pageSize: PAGE_SIZE }
      if (scope) query.scope = scope
      if (scope === 'Local') query.country = country && country.length >= 2 ? country : 'NG'
      if (topic) query.topic = topic

      try {
        const result = await NewsApi.getNews(query)
        if (cancelled) return
        setArticles(result.items)
        setTotalPages(result.totalPages)
        setStatus('ready')
      } catch (cause) {
        if (cancelled) return
        setArticles([])
        setStatus('error')
        setError(cause instanceof Error ? cause.message : 'News could not be loaded.')
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [country, page, scope, topic])

  useEffect(() => {
    if (!keepFiltersInView.current || status === 'loading') return
    const timer = window.setTimeout(() => {
      keepFiltersInView.current = false
      if (articles.length > 0) return
      const node = filtersRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight
      if (!inView) node.scrollIntoView({ block: 'center' })
    }, 50)
    return () => window.clearTimeout(timer)
  }, [status, articles.length])

  const featured = articles.find((article) => article.isPinned) ?? articles[0]
  const rest = featured ? articles.filter((article) => article.id !== featured.id) : articles

  return (
    <div className="space-y-14 lg:space-y-20">
      {status !== 'ready' || featured ? (
        <section aria-label="Featured article">
          <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-black/80 mb-6 lg:mb-8">
            Featured
          </h2>
          {status === 'loading' ? (
            <div className="h-[280px] sm:h-[360px] rounded-[16px] bg-black/5 animate-pulse" />
          ) : null}
          {status === 'error' ? (
            <p role="alert" className="text-[16px] lg:text-[18px] text-red-600">
              {error}
            </p>
          ) : null}
          {status === 'ready' && featured ? <NewsFeatured article={featured} /> : null}
        </section>
      ) : null}

      {status !== 'ready' || featured ? <div className="h-px bg-black/10" /> : null}

      <section aria-label="All articles">
        <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-black/80 mb-6 lg:mb-8">
          All Articles
        </h2>
        <p className="text-[15px] lg:text-[18px] text-black/60 mb-6 max-w-[720px]">
          Insurance and HMO headlines, newest first. Pinned stories stay on top, and each one opens
          the original publisher.
        </p>
        <div ref={filtersRef}>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-6 lg:mb-10">
            <FilterMenu
              id="news-region"
              label="Region"
              value={scope ?? 'all'}
              options={REGIONS}
              onChange={(value) =>
                visit({ scope: value === 'all' ? 'all' : (value as ScopeParam) })
              }
            />
            <FilterMenu
              id="news-topic"
              label="Topic"
              value={topic ?? 'all'}
              options={TOPICS}
              onChange={(value) =>
                visit({ topic: value === 'all' ? 'all' : (value as TopicParam) })
              }
            />
          </div>
          {status === 'ready' && articles.length === 0 ? (
            <p className="text-[16px] lg:text-[18px] text-black/60">No news feed for this search</p>
          ) : null}
        </div>
        {status === 'ready' && rest.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : null}
        {status === 'ready' && rest.length === 0 && featured ? (
          <p className="text-[16px] text-black/45">That is the only story in this topic for now.</p>
        ) : null}
      </section>

      <NewsPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(next) => visit({ page: next })}
      />
    </div>
  )
}
