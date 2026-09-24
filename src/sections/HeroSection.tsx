import { motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { easeOutSoft, fadeUp, stagger } from '@/animations/variants'
import { Bitmoji } from '@/components/bitmoji/Bitmoji'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { site } from '@/data/site'

const HEADLINE = ['Des idées', 'en expériences'] as const
const HEADLINE_ACCENT = 'qui comptent.'

export function HeroSection() {
  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip lg:h-[calc(100svh-6rem)] lg:max-h-[60rem] lg:min-h-[32rem]"
    >
      {/* Desktop: the hero fits the viewport under the header — text and illustration both visible without scrolling. */}
      <div className="relative container-page grid h-full items-center gap-y-5 pt-2 pb-6 sm:gap-y-6 sm:pt-10 sm:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-10 lg:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.09, 0.1)}
          className="relative z-10 flex flex-col"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>{site.role}</Eyebrow>
          </motion.div>

          <h1 id="hero-title" className="mt-5 text-display lg:mt-6">
            {HEADLINE.map((line) => (
              <motion.span key={line} variants={fadeUp} className="block whitespace-nowrap">
                {line}
              </motion.span>
            ))}
            <motion.span variants={fadeUp} className="block whitespace-nowrap text-terracotta">
              {HEADLINE_ACCENT}
            </motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[30rem] text-lead text-ink-muted lg:mt-6"
          >
            Je suis {site.name}, UI/UX designer. J’imagine et conçois des expériences digitales
            esthétiques, intuitives et humaines pour aider les marques à créer des produits que les
            gens aiment vraiment.
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

            <a
              href={site.introVideo.url}
              className="group flex items-center gap-3 rounded-full sm:gap-4"
            >
              <span className="grid size-11 place-items-center rounded-full border-[1.5px] border-ink/80 transition-colors duration-300 group-hover:bg-ink group-hover:text-white sm:size-14">
                <Play className="size-4 translate-x-px fill-current" aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-ink sm:text-[1.0625rem]">
                  Voir la vidéo
                </span>
                <span className="text-[0.625rem] font-medium tracking-[0.2em] text-ink-muted uppercase">
                  {site.introVideo.duration}
                </span>
              </span>
            </a>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href="#projets"
            aria-label="Faire défiler vers les projets"
            className="absolute top-[calc(100%+2rem)] hidden w-fit items-start gap-3.5 rounded-sm border-l border-ink/50 py-1 pl-7 [@media(min-height:44rem)]:lg:flex"
          >
            <span className="flex flex-col items-center gap-4">
              <span className="text-xs font-medium tracking-[0.3em] text-ink-muted uppercase">
                Scroll
              </span>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="size-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
            </span>
          </motion.a>
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
