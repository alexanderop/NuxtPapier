import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import { siteConfig } from './utils/site.config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true, // Explicitly enable SSR for SSG
  nitro: {
    preset: 'github_pages', // Use the built-in GitHub Pages preset
    prerender: {
      routes: ['/rss.xml', '/atom.xml', '/feed.json', '/', '/blog', '/feeds'],
      crawlLinks: true, // Enable crawling to discover all pages
      failOnError: false, // Don't fail build on prerender errors
      concurrency: 1, // Limit concurrent prerenders
      interval: 200, // Add delay between prerenders
    },
    routeRules: {
      '/blog/**': { prerender: true },
    },
  },
  css: [
    '~/assets/css/theme.css',
    '~/assets/css/prose.css',
  ],
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/NuxtPapier/' : '/',
    head: {
      htmlAttrs: {
        lang: siteConfig.language,
      },
      title: siteConfig.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: siteConfig.description },
        { property: 'og:title', content: siteConfig.title },
        { property: 'og:description', content: siteConfig.description },
        { property: 'og:url', content: siteConfig.url },
        { property: 'og:site_name', content: siteConfig.name },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: siteConfig.title },
        { name: 'twitter:description', content: siteConfig.description },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: siteConfig.favicon || '/favicon.ico' },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: `${siteConfig.title} RSS Feed`,
          href: '/rss.xml',
        },
        {
          rel: 'alternate',
          type: 'application/atom+xml',
          title: `${siteConfig.title} Atom Feed`,
          href: '/atom.xml',
        },
      ],
      script: [
        // Prevent flash of light mode on page load
        {
          innerHTML: `
            (function() {
              if (localStorage.getItem('vueuse-color-scheme') !== 'light') {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          type: 'text/javascript',
        },
      ],
    },
  },
  modules: [
    '@nuxtjs/seo', // Re-enable SEO for proper sitemap generation
    '@nuxt/content',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image', // Re-enable image module
  ],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop-nuxt-papier.nuxt.space',
  },
  seo: {
    siteName: siteConfig.name,
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop-nuxt-papier.nuxt.space',
    trailingSlash: true,
    indexable: true,
    redirectToCanonicalSiteUrl: false, // Important for custom domains
    sitemap: {
      autoLastmod: true,
      xsl: false,
      strictNuxtContentPaths: true,
    },
    robots: {
      robotsTxt: false, // Disable robots.txt generation when using baseURL
      rules: [
        { userAgent: '*', allow: '/' },
      ],
      host: process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop-nuxt-papier.nuxt.space',
      sitemap: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop-nuxt-papier.nuxt.space'}/sitemap.xml`,
    },
    ogImage: {
      enabled: false, // Disable to prevent memory issues
    },
  },
  // Explicitly set experimental options for better SSG
  experimental: {
    payloadExtraction: false, // Disable payload extraction to ensure full SSG
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'dracula',
          },
        },
      },
    },
    renderer: {
      anchorLinks: {
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
      },
    },
  },
  hooks: {
    'content:file:afterParse': function (ctx) {
      const { file, content } = ctx

      if (file.id.endsWith('.md')) {
        // Add formatted date from frontmatter
        if (content.date) {
          content.formattedDate = new Date(content.date as string).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }

        // Add reading time calculation - simplified version
        const wordsPerMinute = 180
        // Simple text extraction without deep recursion
        let text = ''
        if (content.body) {
          // Use the markdown source if available
          if (content._raw && typeof content._raw === 'string') {
            text = content._raw
          }
          else if (typeof content.body === 'string') {
            text = content.body
          }
          else {
            // Fallback to a simple estimate based on content length
            text = JSON.stringify(content).slice(0, 5000) // Limit to prevent memory issues
          }
        }

        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        content.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

        // Enhanced metadata processing
        // Generate excerpt if not provided
        if (!content.excerpt && content.description) {
          content.excerpt = content.description
        }
        else if (!content.excerpt) {
          content.excerpt = 'No description available.'
        }

        // Process tags to ensure they're arrays
        if (content.tags && typeof content.tags === 'string') {
          content.tags = content.tags.split(',').map((tag: string) => tag.trim())
        }

        // Add slug from filename if not provided
        if (!content.slug) {
          const pathParts = file.id.split('/')
          const filename = pathParts[pathParts.length - 1]
          if (filename) {
            content.slug = filename.replace('.md', '')
          }
        }

        // Add author defaults from site config if not provided
        if (!content.author) {
          content.author = {
            name: siteConfig.author,
            url: siteConfig.url,
          }
        }

        // Process featured image
        if (content.image && typeof content.image === 'string') {
          content.image = {
            src: content.image,
            alt: content.title || 'Featured image',
          }
        }

        // Add timestamps
        if (!content.createdAt && content.date) {
          content.createdAt = new Date(content.date as string).toISOString()
        }
        if (!content.updatedAt) {
          content.updatedAt = content.createdAt || new Date().toISOString()
        }

        // Add status with default
        if (!content.status) {
          content.status = 'published'
        }

        // Process category
        if (content.category && typeof content.category === 'string') {
          content.categorySlug = content.category.toLowerCase().replace(/\s+/g, '-')
        }
      }
    },
  },
})
