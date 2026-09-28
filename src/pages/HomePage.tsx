import { ContactSection } from '@/sections/ContactSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { HeroSection } from '@/sections/HeroSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { Seo } from '@/seo/useSeo'

/** One-page landing — section order follows the mockup. */
export function HomePage() {
  return (
    <>
      <Seo />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
