import { Reveal } from '@/animations/Reveal'
import { SectionShell } from '@/components/layout/SectionShell'
import { about } from '@/data/about'

export function AboutSection() {
  return (
    <SectionShell id="a-propos" eyebrow="À propos" className="lg:pt-20">
      {/* Single left-aligned column (centred below lg): headline, then the copy. */}
      <div className="mt-8 max-lg:text-center lg:mt-12">
        <Reveal>
          <h2 className="max-w-[56rem] text-[clamp(1.875rem,1.2rem+2.2vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance max-lg:mx-auto">
            Je suis {about.name},
            <br />
            {about.headline}{' '}
            <span className="whitespace-nowrap text-terracotta">{about.headlineAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[38rem] text-lead text-ink-muted max-lg:mx-auto lg:mt-8 lg:text-[1.3125rem]">
            {about.body}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  )
}
