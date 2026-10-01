import { Reveal } from '@/animations/Reveal'
import { Timeline } from '@/components/experience/Timeline'
import { SectionShell } from '@/components/layout/SectionShell'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  return (
    <SectionShell id="parcours" eyebrow="Mon parcours" className="relative lg:pt-20">
      <div className="mt-8 grid items-start gap-14 lg:mt-0 lg:grid-cols-2 lg:gap-6">
        <Reveal className="max-lg:text-center lg:pt-10">
          <h2 className="text-h2">
            Un parcours
            <br />
            <span className="xl:whitespace-nowrap">
              qui prend <span className="text-terracotta">forme</span>
            </span>
          </h2>
          <p className="mt-6 max-w-[26rem] text-lead text-ink-muted max-lg:mx-auto lg:mt-7 lg:max-w-[24.5rem] lg:text-[1.3125rem]">
            Des expériences variées, des équipes inspirantes et une même envie&nbsp;: créer des
            produits qui ont du sens.
          </p>
        </Reveal>

        <div className="relative lg:-mt-6">
          <Timeline items={experience} />
        </div>
      </div>
    </SectionShell>
  )
}
