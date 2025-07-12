import type { Socials } from '~/types'

// Update these social links with your actual profiles
// You can add, remove, or modify social links as needed
// Icons are from Iconify - find more at https://icones.js.org/
export const SOCIALS: Socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername', // Replace with your GitHub username
    linkTitle: 'Visit on GitHub',
    icon: 'mdi:github',
  },
  {
    name: 'X',
    href: 'https://x.com/yourusername', // Replace with your X/Twitter username
    linkTitle: 'Follow on X',
    icon: 'ri:twitter-x-fill',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yourusername/', // Replace with your LinkedIn profile
    linkTitle: 'Connect on LinkedIn',
    icon: 'mdi:linkedin',
  },
  {
    name: 'Mail',
    href: 'mailto:your.email@example.com', // Replace with your email address
    linkTitle: 'Send an email',
    icon: 'mdi:email',
  },
] as const

export const SHARE_LINKS = [
  {
    name: 'WhatsApp',
    icon: 'mdi:whatsapp',
    getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: 'Facebook',
    icon: 'mdi:facebook',
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'X',
    icon: 'ri:twitter-x-fill',
    getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Telegram',
    icon: 'mdi:telegram',
    getUrl: (url: string, title: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: 'Pinterest',
    icon: 'mdi:pinterest',
    getUrl: (url: string, title: string, description?: string) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description || title)}`,
  },
  {
    name: 'Email',
    icon: 'mdi:email',
    getUrl: (url: string, title: string) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
] as const
