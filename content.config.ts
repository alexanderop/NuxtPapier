import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

const authorSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
})

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

const tocLinkSchema = z.lazy(() => z.object({
  id: z.string(),
  text: z.string(),
  depth: z.number(),
  children: z.array(z.any()).optional(),
}))

export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'blog/**/*.md',
        schema: z.object({
          title: z.string(),
          description: z.string(),
          date: z.string(),
          formattedDate: z.string().optional(),
          slug: z.string().optional(),
          excerpt: z.string().optional(),
          tags: z.union([z.array(z.string()), z.string()]).optional(),
          category: z.string().optional(),
          categorySlug: z.string().optional(),
          author: authorSchema.optional(),
          image: z.union([imageSchema, z.string()]).optional(),
          readingTime: z.number().optional(),
          status: z.enum(['draft', 'published', 'archived']).optional(),
          createdAt: z.string().optional(),
          updatedAt: z.string().optional(),
          draft: z.boolean().optional(),
          toc: z.object({
            title: z.string().optional(),
            links: z.array(tocLinkSchema),
          }).optional(),
        }),
      }),
    ),
  },
})
