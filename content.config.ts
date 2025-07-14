import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSitemapCollection({
        schema: z.object({
          author: z.string().min(1).optional(),
          date: z.string().datetime(),
          description: z.string().min(1),
          draft: z.boolean().default(false),
          featured: z.boolean().default(false),
          image: z.string().optional(),
          ogImage: z.string().optional(),
          readingTime: z.number().optional(),
          tags: z.array(z.string()).default([]).optional(),
          title: z.string().min(1),
          updatedAt: z.string().datetime().optional(),
        }),
        source: 'blog/**/*.md',
        type: 'page',
      }),
    ),
    pages: defineCollection(
      asSitemapCollection({
        schema: z.object({
          description: z.string().min(1),
          ogImage: z.string().optional(),
          title: z.string().min(1),
        }),
        source: '*.md',
        type: 'page',
      }),
    ),
  },
})
