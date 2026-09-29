import type { SiteIdentity } from '@/types/site'

/** Static identity data — swap for an API call later without touching components. */
export const site: SiteIdentity = {
  name: 'Fatou',
  role: 'UI/UX Designer',
  email: 'fatou.fofana75@yahoo.fr',
  cvUrl: '/cv-fatou-fofana.pdf',
  introVideo: { url: '#', duration: '1 min' },
  socials: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/fatou-fofana-124396139/',
    },
  ],
  tagline: ['Designing', 'a kinder', 'digital world.'],
  legal: [
    { label: 'Confidentialité', href: '/confidentialite' },
    { label: 'Conditions', href: '/conditions-utilisation' },
  ],
}
