import { AboutSection } from '@/sections/AboutSection'
import { ContactSection } from '@/sections/ContactSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { HeroSection } from '@/sections/HeroSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ToolsSection } from '@/sections/ToolsSection'
import { Seo } from '@/seo/useSeo'

/** One-page landing: who (about, skills, career, tools) before the work (projects). */
export function HomePage() {
  return (
    <>
      <Seo />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ToolsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}
