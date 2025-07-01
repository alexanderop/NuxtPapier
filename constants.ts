import type { Socials } from '~/types'

export const SOCIALS: Socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    linkTitle: 'Visit on GitHub',
    icon: 'mdi:github',
  },
  {
    name: 'X',
    href: 'https://x.com/yourusername',
    linkTitle: 'Follow on X',
    icon: 'ri:twitter-x-fill',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yourusername/',
    linkTitle: 'Connect on LinkedIn',
    icon: 'mdi:linkedin',
  },
  {
    name: 'Mail',
    href: 'mailto:your.email@example.com',
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
