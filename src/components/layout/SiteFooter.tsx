import { Link } from 'react-router'
import { Reveal } from '@/animations/Reveal'
import { SocialIcon } from '@/components/ui/social-icon'
import { primaryNav } from '@/data/navigation'
import { site } from '@/data/site'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'

const linkClass =
  'rounded-sm transition-colors duration-300 hover:text-terracotta focus-visible:text-terracotta'

/**
 * Minimal footer: identity, navigation, socials, signature, copyright and
 * legal links. Bottom padding clears the mobile tab bar and the iOS home bar.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="container-page pt-6 pb-[calc(env(safe-area-inset-bottom)+7.5rem)] lg:pt-8 lg:pb-14">
      <Reveal>
        {/* Wraps into two rows between lg and xl, where the single row does not fit. */}
        <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-8 lg:gap-y-6 xl:flex-nowrap">
          <Logo />

          <nav aria-label="Navigation du pied de page">
            <ul className="flex flex-wrap gap-x-7 text-[0.9375rem] text-ink/85 lg:gap-x-10 lg:text-base">
              {primaryNav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    className={cn(linkClass, 'inline-block py-3 lg:inline lg:py-0')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-8 lg:gap-10">
            <ul className="flex items-center gap-6 lg:gap-7" aria-label="Réseaux sociaux">
              {site.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} (nouvel onglet)`}
                    className="touch-hit block rounded-sm text-ink transition-[color,transform] duration-300 ease-(--ease-out-soft) hover:-translate-y-0.5 hover:text-terracotta"
                  >
                    <SocialIcon id={social.id} className="size-5 lg:size-6" />
                  </a>
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="hidden h-16 w-px bg-ink/25 sm:block" />
            <p className="hidden text-[0.9375rem] leading-snug whitespace-nowrap text-ink-muted sm:block">
              {site.tagline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index < site.tagline.length - 1 && <span className="sr-only"> </span>}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between lg:mt-12 lg:text-[0.9375rem]">
          <p>
            © {year} {site.name}. Tous droits réservés.
          </p>
          <ul className="flex gap-8">
            {site.legal.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={cn(linkClass, 'touch-hit')}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </footer>
  )
}
