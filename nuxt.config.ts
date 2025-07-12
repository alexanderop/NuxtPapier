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

  hooks: {
    'content:file:afterParse': function (ctx) {
      const { file, content } = ctx

      // Only calculate reading time for blog posts
      if (file.id.startsWith('content/blog/') && file.id.endsWith('.md')) {
        // Function to extract text from the parsed AST
        function extractText(node: any): string {
          if (!node)
            return ''

          // If it's a text node, return its value
          if (node.type === 'text' && node.value) {
            return node.value
          }

          // If it has children, recursively extract text from them
          if (node.children && Array.isArray(node.children)) {
            return node.children.map(extractText).join(' ')
          }

          return ''
        }

        // Extract text from the parsed body
        const text = extractText(content.body)
        const wordsPerMinute = 180
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length

        content.readingTime = Math.ceil(wordCount / wordsPerMinute)
      }
    },
  },
})
