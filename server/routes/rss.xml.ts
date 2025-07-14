import RSS from 'rss'

// @ts-nocheck
interface BlogPost {
  author?: string
  date: string
  description: string
  path: string
  tags?: string[]
  title: string
}

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()

  // Query blog posts using neverthrow
  const postsResult = await fromPromise(
    // @ts-expect-error - Nuxt Content v3 requires event parameter in server context
    queryCollection(event, 'blog')
      .where('draft', '=', false)
      .limit(20)
      .all(),
    (error: unknown) => (error instanceof Error ? error : new Error('Failed to fetch blog posts for RSS')),
  )

  const posts = postsResult.match(
    (data: any[]) => data as BlogPost[],
    () => {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to generate RSS feed',
      })
    },
  )
  const baseUrl = appConfig.site.website ?? 'http://localhost:3000'

  // Create RSS feed
  const feed = new RSS({
    copyright: `© ${new Date().getFullYear()} ${appConfig.site.author ?? 'Your Name'}`,
    description: appConfig.site.desc ?? 'A minimal, responsive and SEO-friendly Nuxt blog theme.',
    feed_url: `${baseUrl}/rss.xml`,
    language: appConfig.site.lang ?? 'en',
    pubDate: new Date(),
    site_url: baseUrl,
    title: appConfig.site.title ?? 'NuxtPapier Blog',
    ttl: 60,
  })

  // Add posts to feed
  for (const post of posts) {
    feed.item({
      author: post.author ?? 'Unknown',
      categories: post.tags ?? [],
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
