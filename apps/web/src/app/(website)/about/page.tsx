import { PageHeroSection } from '@/components/website/page-hero-section'
import { AboutHmo } from './components/about-hmo'
import { AboutJoin } from './components/about-join'
import { AboutMission } from './components/about-mission'
import { AboutStats } from './components/about-stats'
import { AboutTeam } from './components/about-team'
import { AboutValues } from './components/about-values'

export default function AboutPage() {
  return (
    <>
      <PageHeroSection
        eyebrow="About WRAPA"
        title="Building Africa's modern insurance backbone"
        subtitle="We exist to make insurance and HMO health cover accessible, transparent, and fast for every individual, family, and business in Nigeria, Kenya, and across the Pan-African market."
      />
      <AboutMission />
      <AboutHmo />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutJoin />
    </>
  )
}
