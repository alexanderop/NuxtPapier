// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',

  devtools: { enabled: true },

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
  ],

  css: ['~/assets/css/main.css', '~/app.css'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    dataValue: 'theme',
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'vitesse-light',
            dark: 'vitesse-dark',
          },
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
        },
      },
    },
  },

  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },

  image: {
    quality: 80,
    format: ['webp'],
    // Set lazy loading as default for all images
    loading: 'lazy',
  },

  hooks: {
    'content:file:afterParse': function (ctx) {
      const { file, content } = ctx

        if (file.path.includes('/page/')) return

        const wordsPerMinute = 180
        const text = typeof file.body === 'string' ? file.body : ''
        const wordCount = text.split(/\s+/).length

        content.readingTime = Math.ceil(wordCount / wordsPerMinute)
    },
  },
})
