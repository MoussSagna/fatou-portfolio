import { motion } from 'motion/react'
import { easeOutSoft, fadeUp, stagger } from '@/animations/variants'
import type { WideHero } from '@/types/project'
import { cn } from '@/lib/utils'
import { FactList } from './ProjectFacts'
import { BackToProjects } from './ProjectHero'

interface ProjectHeroWideProps {
  hero: WideHero
}

/**
 * Editorial opening: display title on two lines, subtitle and facts on one
 * row, then the main visual across the content width (cropped to 16:10 from
 * the top, so the screen keeps its header and content; optional portrait crop
 * on phones).
 */
export function ProjectHeroWide({ hero }: ProjectHeroWideProps) {
  const { titleLines, subtitle, facts, image, imageMobile } = hero

  return (
    <section aria-labelledby="projet-titre" className="relative overflow-x-clip">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger(0.08, 0.05)}
        className="container-page pt-2 sm:pt-6 lg:pt-8"
      >
        <motion.div variants={fadeUp}>
          <BackToProjects />
        </motion.div>

        <motion.h1
          id="projet-titre"
          variants={fadeUp}
          className="mt-10 text-[clamp(2.25rem,0.9rem+6.6vw,4.5rem)] leading-[0.88] tracking-[-0.02em] uppercase lg:mt-16"
        >
          {titleLines.map((line, index) => (
            <span key={line} className={index > 0 ? 'block text-terracotta' : 'block'}>
              {index > 0 && ' '}
              {line}
            </span>
          ))}
        </motion.h1>

        <div className="mt-10 grid gap-10 border-t border-line pt-7 lg:mt-14 lg:grid-cols-12 lg:gap-8 lg:pt-9">
          <motion.p
            variants={fadeUp}
            className="text-[clamp(1.5rem,1.1rem+1.4vw,2.375rem)] leading-[1.1] font-medium tracking-[-0.02em] text-balance text-ink lg:col-span-5"
          >
            {subtitle}
          </motion.p>
          <motion.div variants={stagger(0.08)} className="lg:col-span-7">
            <FactList
              facts={facts}
              itemVariants={fadeUp}
              className="grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="container-page mt-12 lg:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: easeOutSoft }}
          className="overflow-hidden rounded-[1.25rem] bg-nude-200 shadow-float sm:rounded-[2rem] lg:rounded-[2.5rem]"
        >
          <picture>
            {imageMobile && (
              <>
                <source media={MOBILE} type="image/avif" srcSet={imageMobile.avif} sizes="94vw" />
                <source media={MOBILE} type="image/webp" srcSet={imageMobile.webp} sizes="94vw" />
              </>
            )}
            <source type="image/avif" srcSet={image.avif} sizes={HERO_SIZES} />
            <source type="image/webp" srcSet={image.webp} sizes={HERO_SIZES} />
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              fetchPriority="high"
              decoding="async"
              className={cn(
                'w-full object-cover object-top',
                imageMobile ? 'aspect-[217/235] sm:aspect-[16/10]' : 'aspect-[16/10]',
              )}
            />
          </picture>
        </motion.div>
      </div>
    </section>
  )
}

const HERO_SIZES = '(min-width: 1440px) 81rem, 94vw'
const MOBILE = '(max-width: 639px)'
