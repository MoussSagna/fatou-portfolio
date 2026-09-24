import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '@/animations/Reveal'
import { Blob } from '@/components/decor/Blob'
import { Button } from '@/components/ui/button'
import { caseStudyPath } from '@/data/case-studies'
import type { CaseStudy, Project } from '@/types/project'

interface ProjectConclusionProps {
  conclusion: CaseStudy['conclusion']
}

/** Closing band: one short sentence on a frosted card, CTA back to the projects. */
export function ProjectConclusion({ conclusion }: ProjectConclusionProps) {
  return (
    <section
      aria-label="Conclusion"
      className="relative grid min-h-[26rem] place-items-center overflow-hidden bg-[linear-gradient(180deg,var(--nude-100),var(--blush))] px-5 py-20 sm:px-8 lg:min-h-[30rem]"
    >
      <Blob className="absolute -bottom-24 -left-20 w-[28rem] text-nude-50/60 lg:w-[40rem]" />
      <Blob className="absolute -top-16 -right-24 w-[22rem] rotate-180 text-nude-200/80 lg:w-[34rem]" />

      <Reveal className="relative w-full max-w-[34rem] rounded-[2rem] bg-nude-50/75 px-7 py-10 text-center shadow-float backdrop-blur-md sm:px-12 lg:py-12">
        <p className="text-[clamp(1.375rem,1.1rem+0.8vw,1.875rem)] leading-snug font-semibold text-balance text-ink">
          {conclusion.quote}
        </p>
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

/** Previous / next case study. Renders nothing while a single project page exists. */
export function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Autres projets"
      className="container-page flex items-center justify-between gap-6 py-10 text-[0.9375rem] font-medium lg:py-14 lg:text-base"
    >
      {previous ? (
        <Link
          to={caseStudyPath(previous.slug)}
          className="group touch-hit flex items-center gap-2.5 rounded-sm"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span className="sr-only">Projet précédent : </span>
          {previous.title}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={caseStudyPath(next.slug)}
          className="group touch-hit flex items-center gap-2.5 rounded-sm"
        >
          <span className="sr-only">Projet suivant : </span>
          {next.title}
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </nav>
  )
}
