import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        date: z.string().datetime(),
        author: z.string().min(1),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        image: z.string().optional(),
      }),
    }),
  },
})
