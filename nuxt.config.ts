import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
  ],
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
            dark: 'github-dark',
          },
        },
      },
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  hooks: {
    'content:file:afterParse': (ctx) => {
      const { file , content} = ctx
      if (!file.date) return
      // @ts-expect-error - Nuxt Content hook file type
      // Add formatted date to all content files
      content.formattedDate = new Date(file.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      // Add reading time
      const wordsPerMinute = 180
      const text = typeof file.body === 'string' ? file.body : ''
      const wordCount = text.split(/\s+/).length

      content.readingTime = Math.ceil(wordCount / wordsPerMinute)
    },
  },
})
