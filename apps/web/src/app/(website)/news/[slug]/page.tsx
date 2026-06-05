import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@wrapa/ui'
import { NewsCard } from '../components/news-card'
import { NEWS_ARTICLES } from '../components/news-data'

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = NEWS_ARTICLES.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — WRAPA News`,
    description: article.excerpt,
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = NEWS_ARTICLES.find((a) => a.slug === slug)

  if (!article) notFound()

  const related = NEWS_ARTICLES.filter(
    (a) => a.slug !== slug && a.category === article.category
  ).slice(0, 3)

  const fallbackRelated = NEWS_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3)
  const relatedArticles = related.length >= 2 ? related : fallbackRelated

  return (
    <div className="bg-white">
      {/* Hero image */}
      <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[520px] overflow-hidden bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Article body */}
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
          >
            <path d="M15 18l-6-6 6-6" stroke="currentColor" />
          </svg>
          Back to News
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="text-[13px] font-semibold uppercase tracking-widest text-[#990505]">
            {article.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-[13px] lg:text-[15px] text-black/50">{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="text-[13px] lg:text-[15px] text-black/50">{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-[28px] sm:text-[36px] lg:text-[48px] font-bold leading-[1.25] text-black/90 mb-6 lg:mb-8">
          {article.title}
        </h1>

        {/* Excerpt / lead */}
        <p className="text-[17px] lg:text-[21px] leading-[1.7] text-black/70 font-medium border-l-4 border-[#990505] pl-5 mb-8 lg:mb-12">
          {article.excerpt}
        </p>

        {/* Divider */}
        <div className="h-px bg-black/10 mb-8 lg:mb-12" />

        {/* Body paragraphs */}
        <div className="space-y-6 lg:space-y-8">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-[16px] lg:text-[19px] leading-[1.8] text-black/80">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author + share */}
        <div className="mt-10 lg:mt-14 pt-8 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[14px] lg:text-[16px] text-black/50">
            By <span className="font-semibold text-black/70">{article.author}</span>
          </p>
          <Button variant="outline" size="sm" fullWidth={false} asChild>
            <Link href="/news">Browse all articles</Link>
          </Button>
        </div>
      </div>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-[#f9fafb] py-14 lg:py-20">
          <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <h2 className="font-serif text-[26px] lg:text-[36px] font-bold text-black/80">
                More from WRAPA News
              </h2>
              <Button variant="outline" size="sm" fullWidth={false} asChild>
                <Link href="/news">See all</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedArticles.map((related) => (
                <NewsCard key={related.slug} article={related} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
