// @ts-nocheck
/* eslint-disable ts/strict-boolean-expressions */
import RSS from 'rss'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // Query blog posts - use queryCollection with event
  // @ts-expect-error - Nuxt Content v3 requires event parameter in server context
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .limit(20)
    .all()

  const baseUrl = appConfig.site.website || 'http://localhost:3000'

  // Create RSS feed
  const feed = new RSS({
    copyright: `© ${new Date().getFullYear()} ${appConfig.site.author || 'Your Name'}`,
    description: appConfig.site.desc || 'A minimal, responsive and SEO-friendly Nuxt blog theme.',
    feed_url: `${baseUrl}/rss.xml`,
    language: appConfig.site.lang || 'en',
    pubDate: new Date(),
    site_url: baseUrl,
    title: appConfig.site.title || 'NuxtPapier Blog',
    ttl: 60,
  })

  // Add posts to feed
  for (const post of posts) {
    feed.item({
      author: post.author,
      categories: post.tags || [],
      // @ts-expect-error - Nuxt Content v3 requires event parameter in server context
      date: new Date(post.date),
      description: post.description,
      title: post.title,
      url: `${baseUrl}${post.path}`,
    })
  }

  // Set response headers and return XML
  event.node.res.setHeader('content-type', 'text/xml')
  event.node.res.end(feed.xml({ indent: true }))
})
