import { defineNuxtConfig } from 'nuxt/config'
import { siteConfig } from './utils/site.config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  nitro: {
    prerender: {
      routes: ['/rss.xml', '/atom.xml', '/feed.json', '/feeds'],
    },
  },
  css: [],
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
            (function() {
              const savedMode = localStorage.getItem('vueuse-color-scheme');
              if (!savedMode || savedMode === 'dark') {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
          type: 'text/javascript',
        },
      ],
    },
  },
  modules: ['@nuxtjs/seo', '@nuxt/content', '@nuxt/icon', '@unocss/nuxt', '@vueuse/nuxt'],
  seo: {
    siteUrl: siteConfig.url,
    siteName: siteConfig.name,
    trailingSlash: true,
    indexable: true, // Will be controlled by robots.txt rules
    sitemap: {
      autoLastmod: true,
      xsl: false, // Pretty human-readable sitemap
      strictNuxtContentPaths: true, // Auto-include Nuxt Content pages
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
  ogImage: {
    defaults: {
      renderer: 'chromium',
      width: 1200,
      height: 630,
    },
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
