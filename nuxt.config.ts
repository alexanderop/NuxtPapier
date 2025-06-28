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
      interval: 0, // No delay needed
    },
    routeRules: {
      '/blog/**': { prerender: true },
    },
    // Optimize build for memory efficiency
    compressPublicAssets: false,
    minify: false,
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
  // Reorder modules to prevent initialization issues
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
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
    componentIslands: false,
    viewTransition: false,
    // Enable async context to prevent "Nuxt instance is unavailable" errors
    asyncContext: true,
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
    transpile: process.env.NODE_ENV === 'production' ? [] : undefined,
    // Reduce memory usage during build
    analyze: false,
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
      comments: process.env.NODE_ENV !== 'production',
    },
  },
  // Optimize Vite build
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      // Reduce memory usage during build
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: undefined, // Let Vite handle chunking
        },
      },
    },
    // Reduce memory during dev/build
    server: {
      fs: {
        strict: false,
      },
    },
  },
  hooks: {
    'content:file:afterParse': function (ctx) {
      const { file, content } = ctx

      if (file.id.endsWith('.md')) {
        if (content.date) {
          content.formattedDate = new Date(content.date as string).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }

        const wordsPerMinute = 180
        let text = ''
        if (content.body && content._raw && typeof content._raw === 'string') {
          text = content._raw.slice(0, 5000)
        }

        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        content.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

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
