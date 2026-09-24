import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/animations/Reveal'
import { Blob } from '@/components/decor/Blob'
import { Sparkles } from '@/components/decor/Sparkles'
import { Button } from '@/components/ui/button'
import { site } from '@/data/site'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative container-page scroll-mt-6 pt-4 pb-10 lg:pt-6 lg:pb-12"
    >
      <Blob className="absolute -top-16 -left-10 hidden w-44 text-blush/70 lg:block" />

      <Reveal className="relative">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-nude-200 px-6 py-12 sm:px-10 lg:-mx-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-16">
          <div className="relative">
            <h2 id="contact-title" className="relative inline-block pr-10 text-h2 sm:pr-0">
              Un projet en tête&nbsp;?
              <Sparkles className="absolute -top-7 right-0 size-9 text-coral sm:-top-8 sm:-right-12 sm:size-10 lg:-top-11 lg:-right-16 lg:size-14" />
            </h2>
            <p className="mt-5 max-w-[34rem] text-lead text-ink-muted lg:mt-6 lg:max-w-none lg:text-[1.3125rem]">
              Je suis toujours ouverte à de nouvelles opportunités,{' '}
              <br className="hidden lg:inline" />
              des collaborations ou simplement à échanger autour d’un café virtuel&nbsp;
              <span aria-hidden="true">☕</span>
            </p>
          </div>

          <div className="relative mt-10 flex flex-col items-start gap-4 lg:mt-0 lg:items-center lg:px-16 lg:py-10">
            <Blob className="absolute -inset-x-6 -inset-y-8 hidden text-blush/80 lg:block" />
            <Sparkles className="absolute -top-1 right-2 hidden size-14 rotate-12 text-ink lg:block" />
            <Button asChild size="lg" className="relative">
              <a href={`mailto:${site.email}`}>
                Me contacter
                <ArrowUpRight className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </a>
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="touch-hit relative rounded-sm text-sm text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
