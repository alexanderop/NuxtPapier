import type { BlogCollectionItem } from '@nuxt/content'
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // Query blog posts - use queryCollection with event
  // @ts-expect-error - Nuxt Content v3 requires event parameter in server context
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .limit(20)
    .all() as BlogCollectionItem[]

  const baseUrl = appConfig.site.website || 'http://localhost:3000'

  // Create RSS feed
  const feed = new RSS({
    title: appConfig.site.title || 'NuxtPapier Blog',
    description: appConfig.site.desc || 'A minimal, responsive and SEO-friendly Nuxt blog theme.',
    site_url: baseUrl,
    feed_url: `${baseUrl}/rss.xml`,
    copyright: `© ${new Date().getFullYear()} ${appConfig.site.author || 'Your Name'}`,
    language: appConfig.site.lang || 'en',
    pubDate: new Date(),
    ttl: 60,
  })

  // Add posts to feed
  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${baseUrl}${post.path}`,
      date: new Date(post.date),
      author: post.author,
      categories: post.tags || [],
    })
  }

  // Set response headers and return XML
  event.node.res.setHeader('content-type', 'text/xml')
  event.node.res.end(feed.xml({ indent: true }))
})
