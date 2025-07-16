// app.config.ts
import type { Metadata, Site } from '~/types'
import { SOCIALS } from '~/constants'

export default defineAppConfig({
  pages: {
    about: {
      description: 'Learn more about the person behind this blog.',
      title: 'About',
    } satisfies Metadata,
    home: {
      description: 'Welcome to NuxtPapier - A minimal, responsive and SEO-friendly Nuxt blog theme.',
      title: 'Home',
    } satisfies Metadata,
    posts: {
      description: 'A collection of articles on web development, design, and technology.',
      title: 'Posts',
    } satisfies Metadata,
  },
  site: {
    // Set to false to disable all animations
    animations: true,

    // Update with your name or organization
    author: 'Your Name',

    // Site description used in meta tags
    desc: 'A minimal, responsive and SEO-friendly Nuxt blog theme.',

    // Site direction
    dir: 'ltr',

    // Dynamic OG image generation
    dynamicOgImage: true,

    // Site language
    lang: 'en',

    // Light and dark mode support
    lightAndDarkMode: true,

    // OG image filename
    ogImage: 'nuxtpapier-og.jpg',

    // Pagination settings
    pagination: {
      postsPerPage: 5,
    },

    // Posts per index page
    postPerIndex: 4,

    // Posts per page (deprecated - use pagination.postsPerPage)
    postPerPage: 4,

    // Show archives page
    showArchives: true,

    // Show back button
    showBackButton: true,

    // Site timezone
    timezone: 'America/New_York',

    // Site title used throughout the application
    title: 'NuxtPapier',

    // IMPORTANT: Set your production URL here or via NUXT_PUBLIC_SITE_URL environment variable
    // This is required for proper canonical URLs and social media sharing
    // Example: 'https://yourdomain.com' (without trailing slash)
    // This will be populated from runtime config in plugins/site-url.client.ts
    website: '',
  } satisfies Site,
  socials: SOCIALS,
})
