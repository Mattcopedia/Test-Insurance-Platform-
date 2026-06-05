import { PageHeroSection } from '@/components/website/page-hero-section'
import { AboutMission } from './components/about-mission'
import { AboutStats } from './components/about-stats'
import { AboutValues } from './components/about-values'
import { AboutTeam } from './components/about-team'
import { AboutJoin } from './components/about-join'

export default function AboutPage() {
  return (
    <>
      <PageHeroSection
        eyebrow="About WRAPA"
        title="Building Africa's modern insurance backbone"
        subtitle="We exist to make insurance accessible, transparent, and fast — for every individual, business, and insurer across the continent."
      />
      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutJoin />
    </>
  )
}
