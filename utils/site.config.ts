export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  author: {
    name: string
    email: string
    url?: string
  }
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    mastodon?: string
  }
  logo?: string
  favicon?: string
  language: string
  copyright?: string
}

export const siteConfig: SiteConfig = {
  name: 'NuxtPapier',
  title: 'NuxtPapier Blog',
  description: 'A minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.',
  url: 'https://example.com',
  author: {
    name: 'NuxtPapier',
    email: 'hello@example.com',
    url: 'https://example.com',
  },
  social: {
    twitter: '@nuxtpapier',
    github: 'nuxtpapier/blog',
    // linkedin: 'your-linkedin',
    // mastodon: '@user@mastodon.social',
  },
  logo: '/logo.png',
  favicon: '/favicon.ico',
  language: 'en',
  copyright: `© ${new Date().getFullYear()} NuxtPapier. All rights reserved.`,
}
