// app.config.ts
import type { Metadata, Site } from '~/types'
import { SOCIALS } from '~/constants'

export default defineAppConfig({
  site: {
    // IMPORTANT: Set your production URL here or via NUXT_PUBLIC_SITE_URL environment variable
    // This is required for proper canonical URLs and social media sharing
    // Example: 'https://yourdomain.com' (without trailing slash)
    website: '',

    // Update with your name or organization
    author: 'Your Name',

    // Site description used in meta tags
    desc: 'A minimal, responsive and SEO-friendly Nuxt blog theme.',

    // Site title used throughout the application
    title: 'NuxtPapier',
    ogImage: 'nuxtpapier-og.jpg',
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 4,
    showBackButton: true,
    showArchives: true,
    dynamicOgImage: true,
    dir: 'ltr',
    lang: 'en',
    timezone: 'America/New_York',
    animations: true, // Set to false to disable all animations
  } satisfies Site,
  pages: {
    home: {
      title: 'Home',
      description: 'Welcome to NuxtPapier - A minimal, responsive and SEO-friendly Nuxt blog theme.',
    } satisfies Metadata,
    blog: {
      title: 'Blog',
      description: 'A collection of articles on web development, design, and technology.',
    } satisfies Metadata,
    about: {
      title: 'About',
      description: 'Learn more about the person behind this blog.',
    } satisfies Metadata,
  },
  socials: SOCIALS,
})
