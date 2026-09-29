import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { easeOutSoft, fadeUp, stagger } from '@/animations/variants'
import { Bitmoji } from '@/components/bitmoji/Bitmoji'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip lg:h-[calc(100svh-6rem)] lg:max-h-[60rem] lg:min-h-[32rem]"
    >
      {/* Desktop: the hero fits the viewport under the header — text and illustration both visible without scrolling. */}
      <div className="relative container-page grid h-full items-center gap-y-5 pt-6 pb-6 sm:gap-y-6 sm:pt-10 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-10 lg:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.09, 0.1)}
          className="relative z-10 flex flex-col"
        >
          {/* Slightly larger than text-display, set in spaced capitals. */}
          <h1
            id="hero-title"
            className="text-[clamp(2.75rem,min(1.8rem+3.6vw,8.4svh),5.5rem)] leading-[0.96] tracking-[0.04em] uppercase"
          >
            <motion.span variants={fadeUp} className="block whitespace-nowrap">
              Portfolio
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[30rem] text-lead text-pretty text-ink-muted lg:mt-6 lg:max-w-[32rem] lg:text-[1.3125rem]"
          >
            Designer UI/UX passionnée par les expériences qui ont du sens, je conçois des produits
            digitaux esthétiques, intuitifs et pensés pour les gens qui les utilisent.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-4 sm:gap-x-8 lg:mt-8 lg:gap-x-5 xl:gap-x-8"
          >
            <Button asChild className="px-5 text-sm sm:h-14 sm:px-8 sm:text-base lg:px-6 xl:px-8">
              <a href="#projets">
                Voir mes projets
                <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: easeOutSoft }}
          className="mx-auto w-[82%] max-w-[34rem] sm:w-full lg:max-w-[calc((100svh-12rem)*1.5)] lg:justify-self-end"
        >
          <Bitmoji animated sizes="(min-width: 1024px) 55vw, (min-width: 640px) 34rem, 82vw" />
        </motion.div>
      </div>
    </section>
  )
}
