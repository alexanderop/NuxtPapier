import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        ogImage: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.string().datetime(),
        updatedAt: z.string().datetime().optional(),
        featured: z.boolean().default(false),
        author: z.string().min(1).optional(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        image: z.string().optional(),
        ogImage: z.string().optional(),
        readingTime: z.number().optional(),
      }),
    }),
  },
})
