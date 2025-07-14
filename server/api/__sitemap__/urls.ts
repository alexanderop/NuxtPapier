// @ts-nocheck
interface BlogPost {
  date: string
  _path: string
}

export default defineSitemapEventHandler(async () => {
  const postsResult = await fromPromise(
    $fetch<BlogPost[]>('/api/blog'),
    (error: unknown) => (error instanceof Error ? error : new Error('Failed to fetch blog posts for sitemap')),
  )

  const blogUrls = postsResult.match(
    (posts: BlogPost[]) => posts.map(post => ({
      changefreq: 'weekly' as const,
      lastmod: new Date(post.date),
      loc: `/blog/${post._path}`,
      priority: 0.8 as const,
    })),
    () => [],
  )

  const staticPages = [
    {
      changefreq: 'weekly' as const,
      loc: '/',
      priority: 1.0 as const,
    },
    {
      changefreq: 'daily' as const,
      loc: '/blog',
      priority: 0.9 as const,
    },
    {
      changefreq: 'monthly' as const,
      loc: '/about',
      priority: 0.7 as const,
    },
  ]

  return [...staticPages, ...blogUrls]
})
