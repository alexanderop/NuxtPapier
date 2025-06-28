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

// Get the base URL - using a simple check that works in both server and client
function getBaseUrl() {
  // Check if we're in development
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3000'
  }
  // Default to production URL
  return 'https://alexanderop-nuxt-papier.nuxt.space'
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
