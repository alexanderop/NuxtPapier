import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import { siteConfig } from './utils/site.config'

/**
 * Nuxt configuration tuned to avoid build-time memory spikes.
 * - Disables DevTools in production (known leak)
 * - Keeps experimental flags minimal
 * - Lowers Nitro prerender concurrency & flushes routes
 * - Removes heavy optional modules (e.g. @nuxt/icon)
 */

const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },

  // 👉 DevTools off in production to prevent leak
  devtools: { enabled: !isProd },

  experimental: {
    // Keep payloads inside the bundle (less I/O / RAM at build time)
    payloadExtraction: false,
    // Disable component islands unless you are actively using them
    componentIslands: false,
    // Tree-shake client-only components
    treeshakeClientOnly: true,
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        '/feeds',
        '/tags',
        '/rss.xml',
        '/atom.xml',
        '/feed.json',
        // blog routes are appended dynamically in hook below
      ],
      ignore: ['/__nuxt_content'],
      // 🔻 Constrain memory during prerender
      concurrency: 4,
      flushRoutes: true,
      crawlLinks: false,
    },
    // Persisted fs storage to avoid in-memory cache explosion
    storage: {
      db: {
        driver: 'fs',
        base: './.nuxt/db',
      },
    },
  },

  // No source-maps in production builds
  sourcemap: {
    server: false,
    client: false,
  },

  css: [
    '~/assets/css/theme.css',
    '~/assets/css/prose.css',
  ],

  app: {
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
            (function () {
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
    '@nuxtjs/seo',
    '@nuxt/content',
    // '@nuxt/icon', // ➡️ Optional: re-enable only after leak is resolved
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  seo: {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    trailingSlash: true,
    indexable: true,
    sitemap: { autoLastmod: true, xsl: false, strictNuxtContentPaths: true },
    robots: {
      rules: [
        { userAgent: '*', allow: '/' },
        { userAgent: 'AhrefsBot', disallow: ['/preview/'] },
      ],
      host: siteConfig.url,
      sitemap: `${siteConfig.url}/sitemap.xml`,
    },
  },

  ogImage: {
    defaults: { width: 1200, height: 630 }, // renderer defaults to satori
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 4,
          searchDepth: 4,
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
    // Dynamically add routes for all blog posts
    'nitro:config': async (nitroConfig) => {
      const fs = await import('node:fs')
      const path = await import('node:path')
      const cwd = process.cwd()

      try {
        const blogDir = path.join(cwd, 'content/blog')
        const blogFiles = fs
          .readdirSync(blogDir)
          .filter(file => file.endsWith('.md'))
          .map(file => `/blog/${file.replace('.md', '')}`)

        if (nitroConfig.prerender && nitroConfig.prerender.routes) {
          nitroConfig.prerender.routes.push(...blogFiles)
        }
      }
      catch (error) {
        console.warn('Could not read blog directory:', error)
      }
    },

    // Enhance parsed Markdown content
    'content:file:afterParse': (ctx) => {
      const { file, content } = ctx

      if (file.id.endsWith('.md')) {
        // ...existing enrichment logic unchanged...

        // Add formatted date from frontmatter
        if (content.date) {
          content.formattedDate = new Date(content.date as string).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }

        const wordsPerMinute = 180
        let text = ''
        if (typeof content.body === 'string') {
          text = content.body
        }
        else if (content.body && typeof (content.body as any).children === 'object') {
          const extractText = (nodes: any[]): string => {
            return nodes
              .map((node) => {
                if (node.type === 'text')
                  return node.value || ''
                if (node.children)
                  return extractText(node.children)
                return ''
              })
              .join(' ')
          }
          text = extractText((content.body as any).children || [])
        }

        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        content.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

        if (!content.excerpt && text) {
          content.excerpt = `${text.slice(0, 200).trim()}...`
        }

        if (content.tags && typeof content.tags === 'string') {
          content.tags = content.tags.split(',').map((tag: string) => tag.trim())
        }

        if (!content.slug) {
          const pathParts = file.id.split('/')
          const filename = pathParts[pathParts.length - 1]
          if (filename)
            content.slug = filename.replace('.md', '')
        }

        if (!content.author) {
          content.author = siteConfig.author
        }

        if (content.image && typeof content.image === 'string') {
          content.image = {
            src: content.image,
            alt: content.title || 'Featured image',
          }
        }

        if (!content.createdAt && content.date) {
          content.createdAt = new Date(content.date as string).toISOString()
        }
        if (!content.updatedAt) {
          content.updatedAt = content.createdAt || new Date().toISOString()
        }

        if (!content.status) {
          content.status = 'published'
        }

        if (content.category && typeof content.category === 'string') {
          content.categorySlug = content.category.toLowerCase().replace(/\s+/g, '-')
        }
      }
    },
  },
})
