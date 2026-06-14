import { PageHeroSection } from '@/components/website/page-hero-section'
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
        subtitle="We exist to make insurance accessible, transparent, and fast for every individual, business, and insurer across the continent."
      />
      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutJoin />
    </>
  )
}
