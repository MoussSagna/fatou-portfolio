import { ContactSection } from '@/sections/ContactSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { HeroSection } from '@/sections/HeroSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { SkillsSection } from '@/sections/SkillsSection'

/** One-page landing — section order follows the mockup. */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  )
}
