import { HeroSection } from '@/components/website/hero-section'
import { TrustedBySection } from '@/components/website/trusted-by-section'
import { FeaturesSection } from '@/components/website/features-section'
import { HowSection } from '@/components/website/how-section'
import { TestimonialsSection } from '@/components/website/testimonials-section'
import { ApiSection } from '@/components/website/api-section'
import { NewsSection } from '@/components/website/news-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowSection />
      <TestimonialsSection />
      <ApiSection />
      <NewsSection />
    </>
  )
}
