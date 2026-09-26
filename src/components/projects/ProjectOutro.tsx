import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/animations/Reveal'
import { Blob } from '@/components/decor/Blob'
import { Button } from '@/components/ui/button'
import { caseStudyPath } from '@/data/case-studies'
import type { CaseStudy, Project } from '@/types/project'
import { cn } from '@/lib/utils'

interface ProjectConclusionProps {
  conclusion: CaseStudy['conclusion']
}

/** Closing band: one short sentence (+ optional line) on a frosted card, CTA back to the projects. */
export function ProjectConclusion({ conclusion }: ProjectConclusionProps) {
  return (
    <section
      aria-label="Conclusion"
      className="relative grid min-h-[26rem] place-items-center overflow-hidden bg-[linear-gradient(180deg,var(--nude-100),var(--blush))] px-5 py-20 sm:px-8 lg:min-h-[30rem]"
    >
      <Blob className="absolute -bottom-24 -left-20 w-[28rem] text-nude-50/60 lg:w-[40rem]" />
      <Blob className="absolute -top-16 -right-24 w-[22rem] rotate-180 text-nude-200/80 lg:w-[34rem]" />

      <Reveal
        className={cn(
          'relative w-full rounded-[2rem] bg-nude-50/75 px-7 py-10 text-center shadow-float backdrop-blur-md sm:px-12 lg:py-12',
          conclusion.body ? 'max-w-[42rem]' : 'max-w-[34rem]',
        )}
      >
        <p className="text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] leading-snug font-semibold text-balance text-ink">
          {conclusion.quote}
        </p>
        {conclusion.body && (
          <p className="mx-auto mt-5 max-w-[32rem] text-lead text-balance text-ink-muted">
            {conclusion.body}
          </p>
        )}
        <Button asChild className="mt-8 bg-terracotta hover:bg-ink">
          <Link to="/#projets">
            {conclusion.cta}
            <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}

interface ProjectNavigationProps {
  previous?: Project
  next?: Project
}

/**
 * Previous / next case study (home page order) and a way back to the projects.
 * Renders nothing while a single project page exists.
 */
export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Autres projets"
      className="container-page grid items-center gap-x-6 gap-y-8 py-10 sm:grid-cols-3 lg:py-14"
    >
      <div>{previous && <AdjacentLink project={previous} direction="previous" />}</div>
      <Link
        to="/#projets"
        className="touch-hit order-last justify-self-center rounded-sm text-[0.9375rem] text-ink-muted underline decoration-ink/25 underline-offset-[6px] transition-colors duration-300 hover:text-ink hover:decoration-ink sm:order-none"
      >
        Retour aux projets
      </Link>
      <div className="text-right">{next && <AdjacentLink project={next} direction="next" />}</div>
    </nav>
  )
}

function AdjacentLink({
  project,
  direction,
}: {
  project: Project
  direction: 'previous' | 'next'
}) {
  const isNext = direction === 'next'
  const Arrow = isNext ? ArrowRight : ArrowLeft

  return (
    <Link
      to={caseStudyPath(project.slug)}
      className={cn('group inline-flex flex-col gap-1.5 rounded-sm', isNext && 'items-end')}
    >
      <span className="flex items-center gap-2 text-xs tracking-[0.2em] whitespace-nowrap text-ink-muted uppercase">
        {!isNext && (
          <Arrow
            className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
        )}
        {isNext ? 'Projet suivant' : 'Projet précédent'}
        {isNext && (
          <Arrow
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="text-[0.9375rem] font-medium text-ink lg:text-base">{project.title}</span>
    </Link>
  )
}
