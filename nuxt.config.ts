import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/theme.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  modules: ['@nuxt/content', '@nuxt/icon', '@unocss/nuxt', '@vueuse/nuxt'],
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
          // Extract text from AST nodes
          const extractText = (nodes: any[]): string => {
            return nodes.map((node) => {
              if (node.type === 'text')
                return node.value || ''
              if (node.children)
                return extractText(node.children)
              return ''
            }).join(' ')
          }
          text = extractText((content.body as any).children || [])
        }

        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
        content.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
      }
    },
  },
})
