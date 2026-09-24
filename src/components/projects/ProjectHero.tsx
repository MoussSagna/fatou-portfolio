import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { easeOutSoft, fadeUp, stagger } from '@/animations/variants'
import { Blob } from '@/components/decor/Blob'
import type { CaseStudy, Project } from '@/types/project'

interface ProjectHeroProps {
  project: Project
  hero: CaseStudy['hero']
}

/** Case study opening: back link, big title, tagline, tags and the main visual. */
export function ProjectHero({ project, hero }: ProjectHeroProps) {
  const { tagline, description, tags, meta, image } = hero

  return (
    <section aria-labelledby="projet-titre" className="relative overflow-x-clip">
      <div className="container-page grid items-center gap-y-12 pt-2 pb-6 sm:pt-6 sm:pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-x-12 lg:pt-8 lg:pb-14">
        <motion.div initial="hidden" animate="visible" variants={stagger(0.08, 0.05)}>
          <motion.div variants={fadeUp}>
            <Link
              to="/#projets"
              className="group touch-hit inline-flex items-center gap-2.5 rounded-sm text-[0.9375rem] text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <ArrowLeft
                className="size-4 transition-transform duration-300 ease-(--ease-out-soft) group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Retour aux projets
            </Link>
          </motion.div>

          <motion.h1
            id="projet-titre"
            variants={fadeUp}
            className="mt-10 text-[clamp(2.75rem,0.5rem+14vw,4.25rem)] leading-[0.86] tracking-[-0.01em] uppercase sm:text-[clamp(4.25rem,2.6rem+6vw,8.75rem)] lg:mt-16"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-[clamp(1.875rem,1.3rem+1.9vw,3rem)] leading-[1.08] font-medium tracking-[-0.02em] text-ink lg:mt-6"
          >
            {tagline.text}
            {tagline.accent && (
              <>
                {' '}
                <br className="hidden sm:inline" />
                <span className="text-terracotta">{tagline.accent}</span>
              </>
            )}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-[31rem] text-lead text-ink-muted">
            {description}
          </motion.p>

          <motion.ul
            variants={fadeUp}
            aria-label="Disciplines"
            className="mt-7 flex flex-wrap gap-2.5 lg:mt-8"
          >
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-blush/70 px-4 py-2 text-sm font-medium text-ink/85 lg:px-5 lg:text-[0.9375rem]"
              >
                {tag}
              </li>
            ))}
          </motion.ul>

          <motion.ul
            variants={fadeUp}
            aria-label="Informations"
            className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem] text-ink-muted lg:mt-8"
          >
            {meta.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5">
                <Icon className="size-4 text-ink" strokeWidth={1.8} aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOutSoft }}
          className="relative mx-auto w-full max-w-[40rem] lg:mr-0"
        >
          <Blob className="absolute -top-[10%] -right-[18%] w-[95%] text-blush/70" />
          <picture>
            <source type="image/avif" srcSet={image.avif} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={image.webp} sizes={HERO_SIZES} />
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              fetchPriority="high"
              decoding="async"
              className="relative w-full rounded-[2rem] shadow-soft"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  )
}

const HERO_SIZES = '(min-width: 1024px) 40rem, 100vw'
