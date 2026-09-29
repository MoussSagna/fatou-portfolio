import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router'
import { Reveal } from '@/animations/Reveal'
import { fadeUp, stagger } from '@/animations/variants'
import { Eyebrow } from '@/components/ui/eyebrow'
import { legalDocuments } from '@/data/legal'
import { Seo } from '@/seo/useSeo'
import type { LegalBlock, LegalDocument } from '@/types/legal'

/** Picks the legal document matching the current route. */
export function LegalRoute() {
  const { pathname } = useLocation()
  const document = legalDocuments.find((entry) => entry.path === pathname.replace(/\/$/, ''))
  return document ? <LegalPage document={document} /> : <Navigate to="/" replace />
}

/** Legal page template (/confidentialite, /conditions-utilisation) — content in data/legal.ts. */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <article aria-labelledby="legal-title" className="container-page pt-6 pb-20 lg:pt-10 lg:pb-28">
      <Seo legal={document.path} />

      <motion.header initial="hidden" animate="visible" variants={stagger(0.08)}>
        <motion.div variants={fadeUp}>
          <Link
            to="/"
            className="group touch-hit inline-flex items-center gap-2.5 rounded-sm text-[0.9375rem] text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-300 ease-(--ease-out-soft) group-hover:-translate-x-1"
              aria-hidden="true"
            />
            Retour au portfolio
          </Link>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-10 lg:mt-14">
          <Eyebrow withRule>Informations légales</Eyebrow>
        </motion.div>
        <motion.h1 id="legal-title" variants={fadeUp} className="mt-6 text-h2 text-balance">
          {document.title}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[40rem] text-lead text-pretty text-ink-muted lg:mt-7 lg:text-[1.3125rem]"
        >
          {document.intro}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-sm text-ink-muted">
          Dernière mise à jour :{' '}
          <time dateTime={document.updated.iso}>{document.updated.label}</time>
        </motion.p>
      </motion.header>

      {/* One row per section: title left, text right from lg, hairline between rows. */}
      <div className="mt-14 lg:mt-20">
        {document.sections.map((section, index) => (
          <Reveal
            key={section.title}
            className="grid gap-4 border-t border-line py-9 lg:grid-cols-12 lg:gap-8 lg:py-12"
          >
            <h2 className="flex items-baseline gap-4 font-display text-[clamp(1.375rem,1.1rem+0.9vw,1.875rem)] leading-tight lg:col-span-4">
              <span className="text-sm font-medium text-ink-muted tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              {section.title}
            </h2>
            <div className="max-w-[42rem] space-y-4 text-base leading-relaxed text-ink-muted lg:col-span-8 lg:text-[1.0625rem]">
              {section.body.map((block, blockIndex) => (
                <LegalBlockView key={blockIndex} block={block} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </article>
  )
}

function LegalBlockView({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p>{withPlaceholders(block)}</p>
  return (
    <ul className="space-y-2">
      {block.map((item) => (
        <li
          key={item}
          className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-terracotta/60"
        >
          {withPlaceholders(item)}
        </li>
      ))}
    </ul>
  )
}

/** Highlights `[À compléter : …]` so missing information cannot go unnoticed. */
function withPlaceholders(text: string) {
  return text.split(/(\[[^\]]+\])/).map((part, index) =>
    part.startsWith('[') ? (
      <mark key={index} className="rounded bg-blush px-1 text-ink">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
