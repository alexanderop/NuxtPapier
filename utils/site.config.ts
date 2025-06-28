import process from 'node:process'

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

// Get the base URL from environment variables for GitHub Pages support
function getBaseUrl() {
  // For production deployment
  if (process.env.NODE_ENV === 'production') {
    return 'https://alexanderop-nuxt-papier.nuxt.space'
  }
  // For local development
  return 'http://localhost:3000'
}

export const siteConfig: SiteConfig = {
  name: 'NuxtPapier',
  title: 'NuxtPapier Blog',
  description: 'A minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.',
  url: getBaseUrl(),
  author: {
    name: 'NuxtPapier',
    email: 'hello@example.com',
    url: getBaseUrl(),
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
