import type { Socials } from '~/types'

// Update these social links with your actual profiles
// You can add, remove, or modify social links as needed
// Icons are from Iconify - find more at https://icones.js.org/
export const SOCIALS: Socials = [
  {
    href: 'https://github.com/yourusername',
    icon: 'mdi:github',
    // Replace with your GitHub username
    linkTitle: 'Visit on GitHub',

    name: 'GitHub',
  },
  {
    href: 'https://x.com/yourusername',
    icon: 'ri:twitter-x-fill',
    // Replace with your X/Twitter username
    linkTitle: 'Follow on X',

    name: 'X',
  },
  {
    href: 'https://www.linkedin.com/in/yourusername/',
    icon: 'mdi:linkedin',
    // Replace with your LinkedIn profile
    linkTitle: 'Connect on LinkedIn',

    name: 'LinkedIn',
  },
  {
    href: 'mailto:your.email@example.com',
    icon: 'mdi:email',
    // Replace with your email address
    linkTitle: 'Send an email',

    name: 'Mail',
  },
] as const

export const SHARE_LINKS = [
  {
    getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    icon: 'mdi:whatsapp',
    name: 'WhatsApp',
  },
  {
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: 'mdi:facebook',
    name: 'Facebook',
  },
  {
    getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    icon: 'ri:twitter-x-fill',
    name: 'X',
  },
  {
    getUrl: (url: string, title: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: 'mdi:telegram',
    name: 'Telegram',
  },
  {
    getUrl: (url: string, title: string, description?: string) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description || title)}`,
    icon: 'mdi:pinterest',
    name: 'Pinterest',
  },
  {
    getUrl: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    icon: 'mdi:email',
    name: 'Email',
  },
] as const
