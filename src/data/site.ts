import type { SiteIdentity } from '@/types/site'

/** Static identity data — swap for an API call later without touching components. */
export const site: SiteIdentity = {
  name: 'Sarah',
  role: 'UI/UX Designer',
  email: 'hello@sarah.design',
  cvUrl: '#',
  introVideo: { url: '#', duration: '1 min' },
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Behance', href: 'https://www.behance.net/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
  ],
}
