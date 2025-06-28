import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'
import { siteConfig } from './utils/site.config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: 'github_pages',
    prerender: {
      routes: ['/rss.xml', '/atom.xml', '/feed.json', '/', '/blog', '/feeds'],
      crawlLinks: true,
      failOnError: false,
      concurrency: 1,
      interval: 300, // Increased interval to reduce memory pressure
    },
    routeRules: {
      '/blog/**': { prerender: true },
    },
    // Memory optimizations
    rollupConfig: {
      output: {
        manualChunks(id) {
          // Split vendor chunks to reduce memory usage
          if (id.includes('node_modules')) {
            if (id.includes('@nuxt/content')) {
              return 'content'
            }
            if (id.includes('vue') || id.includes('@vue')) {
              return 'vue'
            }
            if (id.includes('shiki') || id.includes('highlight')) {
              return 'syntax'
            }
            return 'vendor'
          }
        },
      },
    },
    // Reduce source map generation in production
    sourceMap: false,
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
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop.github.io',
  },
  seo: {
    siteName: siteConfig.name,
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop.github.io',
    trailingSlash: true,
    indexable: true,
    redirectToCanonicalSiteUrl: false,
    sitemap: {
      autoLastmod: true,
      xsl: false,
      strictNuxtContentPaths: true,
      // Exclude dynamic routes to reduce memory usage
      exclude: [
        '/api/**',
      ],
    },
    robots: {
      robotsTxt: false,
      rules: [
        { userAgent: '*', allow: '/' },
      ],
      host: process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop.github.io',
      sitemap: `${process.env.NUXT_PUBLIC_SITE_URL || 'https://alexanderop.github.io'}/NuxtPapier/sitemap.xml`,
    },
    ogImage: {
      enabled: false,
    },
  },
  experimental: {
    payloadExtraction: false,
    // Reduce component islands overhead
    componentIslands: false,
    // Disable view transitions to save memory
    viewTransition: false,
  },
  content: {
    // Optimize content module for production
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
          // Preload only common languages to reduce bundle size
          preload: ['js', 'ts', 'vue', 'css', 'html', 'bash', 'json'],
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
  // Build optimizations
  build: {
    // Reduce transpilation overhead
    transpile: process.env.NODE_ENV === 'production' ? [] : undefined,
  },
  // Disable source maps in production
  sourcemap: {
    server: false,
    client: false,
  },
  // Optimize Vue
  vue: {
    propsDestructure: true,
    compilerOptions: {
      // Remove comments in production
      comments: process.env.NODE_ENV !== 'production',
    },
  },
  // Optimize Vite build
  vite: {
    build: {
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 1000,
      // Optimize rollup
      rollupOptions: {
        output: {
          // Use smaller chunks
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@nuxt/content')) {
                return 'content'
              }
              if (id.includes('vue') || id.includes('@vue')) {
                return 'vue'
              }
              if (id.includes('unocss') || id.includes('@unocss')) {
                return 'uno'
              }
              if (id.includes('shiki') || id.includes('highlight')) {
                return 'syntax'
              }
              return 'vendor'
            }
          },
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['vue', '@vueuse/core'],
      exclude: ['@nuxt/content'],
    },
  },
  hooks: {
    'content:file:afterParse': function (ctx) {
      const { file, content } = ctx

      if (file.id.endsWith('.md')) {
        // Optimized content processing
        if (content.date) {
          content.formattedDate = new Date(content.date as string).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }

        // Simplified reading time calculation
        const wordsPerMinute = 180
        let text = ''
        if (content.body && content._raw && typeof content._raw === 'string') {
          text = content._raw.slice(0, 5000) // Limit text processing
        }

        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        content.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

        // Minimal metadata processing
        if (!content.excerpt) {
          content.excerpt = content.description || 'No description available.'
        }

        if (content.tags && typeof content.tags === 'string') {
          content.tags = content.tags.split(',').map((tag: string) => tag.trim())
        }

        if (!content.slug) {
          const filename = file.id.split('/').pop()
          if (filename) {
            content.slug = filename.replace('.md', '')
          }
        }

        if (!content.author) {
          content.author = {
            name: siteConfig.author,
            url: siteConfig.url,
          }
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

        content.status = content.status || 'published'

        if (content.category && typeof content.category === 'string') {
          content.categorySlug = content.category.toLowerCase().replace(/\s+/g, '-')
        }
      }
    },
  },
})

