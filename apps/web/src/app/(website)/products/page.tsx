import { PageHeroSection } from '@/components/website/page-hero-section'
import { ProductCatalogSection } from './components/products-catalog'
import { ProductCategoriesSection } from './components/products-categories'
import { ProductsCta } from './components/products-cta'

export default function ProductsPage() {
  return (
    <>
      <PageHeroSection
        eyebrow="Our Products"
        title="Insurance built for Africa's future"
        subtitle="Browse the full range of insurance and savings products available on WRAPA  from health and life to marine and cyber. All in one place."
      />
      <ProductCategoriesSection />
      <ProductCatalogSection />
      <ProductsCta />
    </>
  )
}
