import type { SiteIdentity } from '@/types/site'

/** Static identity data — swap for an API call later without touching components. */
export const site: SiteIdentity = {
  name: 'Fatou',
  role: 'UI/UX Designer',
  email: 'hello@fatou.design',
  cvUrl: '#',
  introVideo: { url: '#', duration: '1 min' },
  socials: [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
    { id: 'behance', label: 'Behance', href: 'https://www.behance.net/' },
    { id: 'dribbble', label: 'Dribbble', href: 'https://dribbble.com/' },
  ],
  tagline: ['Designing', 'a kinder', 'digital world.'],
  // Pages to create before going live.
  legal: [
    { label: 'Confidentialité', href: '#' },
    { label: 'Conditions', href: '#' },
  ],
}
