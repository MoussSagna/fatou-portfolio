import { ChevronRight, Download } from 'lucide-react'
import { Reveal } from '@/animations/Reveal'
import { SectionHeader, SectionShell } from '@/components/layout/SectionShell'
import { SkillTile } from '@/components/skills/SkillTile'
import { ToolsDock } from '@/components/tools/ToolsDock'
import { Button } from '@/components/ui/button'
import { site } from '@/data/site'
import { skills } from '@/data/skills'
import { tools } from '@/data/tools'

/** Tiles cascade by this step (s) as the grid enters the viewport. */
const TILE_STAGGER = 0.06

export function SkillsSection() {
  return (
    <SectionShell id="a-propos" eyebrow="Mes compétences" className="lg:pt-16">
      <div className="mt-8 grid items-start gap-12 lg:mt-3 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:gap-10">
        <Reveal className="lg:pt-9">
          <h2 className="text-h2">
            Du design
            <br />
            au <span className="text-terracotta">réel.</span>
          </h2>
          <p className="mt-6 max-w-[26rem] text-lead text-ink-muted lg:mt-7 lg:max-w-[21.25rem] lg:text-[1.3125rem]">
            Une combinaison de créativité, de méthode et de sens du détail pour concevoir des
            expériences utiles, belles et impactantes.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8 font-semibold lg:mt-9">
            <a href={site.cvUrl} download>
              Télécharger mon CV
              <Download className="transition-transform duration-300 group-hover/button:translate-y-0.5" />
              <ChevronRight className="-ml-1 size-3.5 opacity-60" aria-hidden="true" />
            </a>
          </Button>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {skills.map((skill, index) => (
            <li key={skill.id}>
              <Reveal delay={index * TILE_STAGGER}>
                <SkillTile skill={skill} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 lg:mt-24">
        <SectionHeader eyebrow="Logiciels que j’utilise" />
        <div className="mt-10 lg:mt-12">
          <ToolsDock tools={tools} />
        </div>
      </div>
    </SectionShell>
  )
}
