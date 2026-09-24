import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/animations/Reveal'
import { HandwrittenNote } from '@/components/decor/HandwrittenNote'
import { Timeline } from '@/components/experience/Timeline'
import { SectionShell } from '@/components/layout/SectionShell'
import { Button } from '@/components/ui/button'
import { experience } from '@/data/experience'
import { site } from '@/data/site'

export function ExperienceSection() {
  return (
    <SectionShell id="parcours" eyebrow="Mon parcours" className="relative lg:pt-20">
      <div className="mt-8 grid items-start gap-14 lg:mt-0 lg:grid-cols-2 lg:gap-6">
        <Reveal className="lg:pt-10">
          <h2 className="text-h2">
            Un parcours
            <br />
            <span className="whitespace-nowrap">
              tourné vers <span className="text-terracotta">l’impact.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-[26rem] text-lead text-ink-muted lg:mt-7 lg:max-w-[24.5rem] lg:text-[1.3125rem]">
            Des expériences variées, des équipes inspirantes et une même envie&nbsp;: créer des
            produits qui ont du sens.
          </p>
          <Button asChild size="lg" className="mt-8 lg:mt-10">
            <a href={site.cvUrl}>
              En savoir plus
              <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </a>
          </Button>
        </Reveal>

        <div className="relative lg:-mt-6">
          <HandwrittenNote className="absolute -top-16 right-0 hidden w-48 md:block lg:-top-20 lg:w-56" />
          <Timeline items={experience} />
        </div>
      </div>
    </SectionShell>
  )
}
