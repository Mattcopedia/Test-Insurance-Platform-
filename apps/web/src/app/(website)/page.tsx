// import { ApiSection } from '@/components/website/api-section'
import { FaqSection } from '@/components/website/faq-section'
import { FeaturesSection } from '@/components/website/features-section'
import { HealthToolsSection } from '@/components/website/health-tools-section'
import { HeroSection } from '@/components/website/hero-section'
import { HowSection } from '@/components/website/how-section'
import { TestimonialsSection } from '@/components/website/testimonials-section'
// import { TrustedBySection } from '@/components/website/trusted-by-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <TrustedBySection />  */}
      <FeaturesSection />
      <HowSection />
      <TestimonialsSection />
      {/* <ApiSection /> */}
      <FaqSection />
      <HealthToolsSection />
    </>
  )
}
