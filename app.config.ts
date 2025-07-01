// app.config.ts
import type { Site, Metadata } from '~/types';
import { SOCIALS } from '~/constants';

export default defineAppConfig({
  site: {
    website: '', // Leave empty for development, set your deployed URL in production
    author: 'Your Name',
    desc: 'A minimal, responsive and SEO-friendly Nuxt blog theme.',
    title: 'NuxtPapier',
    ogImage: 'nuxtpapier-og.jpg',
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 4,
    showBackButton: true,
    dynamicOgImage: true,
    dir: 'ltr',
    lang: 'en',
    timezone: 'America/New_York',
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
});