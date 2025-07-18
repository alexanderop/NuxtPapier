// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
    fallback: 'light',
    preference: 'system',
  },
  compatibilityDate: '2025-05-15',
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'js',
            'javascript',
            'ts',
            'typescript',
            'vue',
            'css',
            'scss',
            'html',
            'bash',
            'shell',
            'json',
            'md',
            'markdown',
            'yaml',
            'yml',
            'python',
            'py',
            'jsx',
            'tsx',
          ],
          theme: {
            dark: 'vitesse-dark',
            default: 'vitesse-light',
          },
        },
        toc: {
          depth: 5,
          searchDepth: 5,
        },
      },
    },
    renderer: {
      anchorLinks: {
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        h5: true,
        h6: true,
      },
    },
  },
  css: ['~/assets/css/main.css', '~/app.css'],

  devtools: { enabled: true },

  hooks: {
    'content:file:afterParse': function (ctx) {
      const { file, content } = ctx

      if (!file.path.includes('/posts/'))
        return

      const wordsPerMinute = 180
      const text = typeof file.body === 'string' ? file.body : ''
      const wordCount = text.split(/\s+/).length

      content.readingTime = Math.ceil(wordCount / wordsPerMinute)
    },
  },

  image: {
    format: ['webp'],
    // Set lazy loading as default for all images
    loading: 'lazy',

    quality: 80,

    // For better Netlify compatibility, you can optionally use Netlify's provider
    // provider: 'netlify',
  },
  modules: [
    '@nuxtjs/sitemap', // Must be before @nuxt/content for v3
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'nuxt-jsonld',
    'nuxt-og-image',
  ],

  nitro: {
    // Nuxt Content will automatically detect Netlify environment
    // For static generation, we don't set a preset - nuxi generate handles it

    prerender: {
      routes: ['/rss.xml'],
    },

    // Ensure public assets are copied to output
    publicAssets: [
      {
        baseURL: 'images',
        dir: 'public/images',
        maxAge: 31536000, // 1 year cache
      },
    ],
  },

  // OG Image configuration
  ogImage: {
    defaults: {

      cacheMaxAgeSeconds: 86400,

      // Using satori for better performance
      extension: 'png',

      height: 630,
      renderer: 'satori',
      width: 1200, // 1 day cache
    },
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    },
  },

  // Site configuration required for OG image generation
  site: {
    name: 'NuxtPapier',
    url: process.env.NUXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  },

  // Sitemap configuration
  sitemap: {

    // Cache time in seconds (1 hour)
    cacheMaxAgeSeconds: 3600,

    // Exclude specific routes
    exclude: [
      '/404',
      '/admin/**',
      '/private/**',
    ],
  },

})
