import { PageHeroSection } from '@/components/website/page-hero-section'
import { SponsoredAdsSection } from '@/components/website/sponsored-ads-section'
import { NewsCategoryFilter } from './components/news-category-filter'
import { FEATURED_ARTICLE } from './components/news-data'
import { NewsFeatured } from './components/news-featured'
import { NewsPagination } from './components/news-pagination'

export const metadata = {
  title: 'News — WRAPA',
  description:
    "Stay updated with the latest news, insights, and announcements from WRAPA  Africa's insurance marketplace.",
}

export default function NewsPage() {
  return (
    <>
      <PageHeroSection
        eyebrow="WRAPA News"
        title="Insights, updates & stories"
        subtitle="The latest from Africa's fastest-growing insurance platform  industry news, product launches, regulatory updates, and more."
      />

      <div className="bg-white">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-16 py-14 lg:py-20 space-y-14 lg:space-y-20">
          {/* Featured article */}
          <section aria-label="Featured article">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-black/80 mb-6 lg:mb-8">
              Featured
            </h2>
            <NewsFeatured article={FEATURED_ARTICLE} />
          </section>

          {/* Divider */}
          <div className="h-px bg-black/10" />

          {/* All articles with category filter */}
          <section aria-label="All articles">
            <h2 className="font-serif text-[28px] lg:text-[36px] font-bold text-black/80 mb-6 lg:mb-8">
              All Articles
            </h2>
            <NewsCategoryFilter />
          </section>

          {/* Pagination */}
          <NewsPagination currentPage={1} totalPages={4} />
        </div>
      </div>

      {/* Sponsored ads from partner insurers / HMOs */}
      <SponsoredAdsSection />
    </>
  )
}
