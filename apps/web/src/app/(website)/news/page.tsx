import { Suspense } from 'react'
import { PageHeroSection } from '@/components/website/page-hero-section'
import { SponsoredAdsSection } from '@/components/website/sponsored-ads-section'
import { NewsFeed } from './components/news-feed'

export const metadata = {
  title: 'News WRAPA',
  description:
    'Stay updated with the latest news, insights, and announcements from WRAPA, the insurance marketplace for Nigeria, Kenya, and the wider Pan-African market.',
}

export default function NewsPage() {
  return (
    <>
      <PageHeroSection
        eyebrow="WRAPA News"
        title="Insights, updates & stories"
        subtitle="Product launches, regulatory updates, and other news from WRAPA in Nigeria, Kenya, and across Africa."
      />

      <div className="bg-white">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-16 py-14 lg:py-20">
          <Suspense
            fallback={<div className="h-[280px] rounded-[16px] bg-black/5 animate-pulse" />}
          >
            <NewsFeed />
          </Suspense>
        </div>
      </div>

      <SponsoredAdsSection placement="News" />
    </>
  )
}
