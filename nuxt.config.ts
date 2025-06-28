import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import { siteConfig } from './utils/site.config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ...(process.env.NUXT_APP_BASE_URL ? {
    ssr: false,
    nitro: {
      prerender: {
        routes: [],
        crawlLinks: false,
      },
    },
  } : {
    nitro: {
      prerender: {
        routes: ['/rss.xml', '/atom.xml', '/feed.json'],
        crawlLinks: false,
      },
    },
  }),
  css: [
    '~/assets/css/theme.css',
    '~/assets/css/prose.css',
  ],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
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
    ...(process.env.NUXT_APP_BASE_URL ? [] : ['@nuxtjs/seo']),
    '@nuxt/content',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  ...(process.env.NUXT_APP_BASE_URL ? {} : {
    seo: {
      siteUrl: siteConfig.url,
      siteName: siteConfig.name,
      trailingSlash: true,
      indexable: true,
      sitemap: {
        autoLastmod: true,
        xsl: false,
        strictNuxtContentPaths: true,
      },
      robots: {
        rules: [
          { userAgent: '*', allow: '/' },
          { userAgent: 'AhrefsBot', disallow: ['/preview/'] },
        ],
        host: siteConfig.url,
        sitemap: `${siteConfig.url}/sitemap.xml`,
      },
    },
  }),
  // Temporarily disable OG image generation to avoid memory issues
  // ...(process.env.NUXT_APP_BASE_URL ? {} : {
  //   ogImage: {
  //     defaults: {
  //       renderer: 'chromium',
  //       width: 1200,
  //       height: 630,
  //     },
  //   },
  // }),
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

        // Add reading time calculation
        const wordsPerMinute = 180
        // Get text content from the body property
        let text = ''
        if (typeof content.body === 'string') {
          text = content.body
        }
        else if (content.body && typeof (content.body as any).children === 'object') {
          // Extract text from AST nodes with depth limit to prevent memory issues
          const extractText = (nodes: any[], depth = 0): string => {
            if (depth > 20) return '' // Prevent infinite recursion
            return nodes.map((node) => {
              if (node.type === 'text')
                return node.value || ''
              if (node.children && Array.isArray(node.children))
                return extractText(node.children, depth + 1)
              return ''
            }).join(' ')
          }
          text = extractText((content.body as any).children || [])
        }

        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        content.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

        // Enhanced metadata processing
        // Generate excerpt if not provided
        if (!content.excerpt && text) {
          content.excerpt = `${text.slice(0, 200).trim()}...`
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
