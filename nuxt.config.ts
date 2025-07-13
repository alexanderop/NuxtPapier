// https://nuxt.com/docs/api/configuration/nuxt-config
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

      if (!file.path.includes('/blog/'))
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
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/sitemap',
    'nuxt-jsonld',
    'nuxt-og-image',
  ],

  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
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

  // Site configuration required for OG image generation
  site: {
    name: 'NuxtPapier',
    url: import.meta.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
})
