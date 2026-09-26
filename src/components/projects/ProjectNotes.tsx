import { Reveal } from '@/animations/Reveal'
import { allTools } from '@/data/tools'
import type { NotesSection } from '@/types/project'
import { cn } from '@/lib/utils'

/**
 * Process steps that have no visual to show: large decorative index, title and
 * short copy, side by side from `md` with a hairline between them.
 */
export function ProjectNotes({ section }: { section: NotesSection }) {
  return (
    <section
      id={section.id}
      aria-label={section.label}
      className={cn(section.tinted && 'bg-nude-200')}
    >
      <div className="container-page grid gap-16 py-20 sm:py-24 md:grid-cols-2 md:gap-0 lg:py-32">
        {section.items.map((item, index) => {
          const tool = allTools.find((entry) => entry.id === item.toolId)

          return (
            <Reveal
              key={item.index}
              delay={index * 0.12}
              className={cn(
                'md:pr-10 lg:pr-20',
                index > 0 && 'md:border-l md:border-ink/12 md:pl-10 lg:pl-20',
              )}
            >
              <p
                aria-hidden="true"
                className="font-display text-[clamp(5.5rem,3rem+9vw,11rem)] leading-[0.78] font-bold tracking-[-0.04em] text-terracotta/15 tabular-nums"
              >
                {item.index}
              </p>
              <h2 className="-mt-[0.3em] text-[clamp(2.5rem,1.6rem+2.6vw,4.25rem)] leading-none tracking-[-0.03em]">
                <span className="sr-only">{item.index} — </span>
                {item.title}
              </h2>
              {item.body.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraph}
                  className={cn(
                    'max-w-[28rem] text-lead',
                    paragraphIndex === 0 ? 'mt-6 text-ink lg:mt-8' : 'mt-4 text-ink-muted',
                  )}
                >
                  {paragraph}
                </p>
              ))}
              {tool && (
                <p className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-nude-50 py-2 pr-5 pl-2.5 text-sm text-ink-muted">
                  <span className="grid size-8 place-items-center rounded-full bg-white">
                    <img
                      src={tool.logo}
                      alt=""
                      width={18}
                      height={18}
                      className="size-[1.125rem]"
                    />
                  </span>
                  Testé avec <span className="font-medium text-ink">{tool.name}</span>
                </p>
              )}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
