export default defineSitemapEventHandler(async () => {
  const posts = await $fetch<any[]>('/api/blog')

  const blogUrls = posts.map(post => ({
    loc: `/blog/${post._path}`,
    lastmod: new Date(post.date),
    changefreq: 'weekly' as const,
    priority: 0.8 as const,
  }))

  const staticPages = [
    {
      loc: '/',
      changefreq: 'weekly' as const,
      priority: 1.0 as const,
    },
    {
      loc: '/blog',
      changefreq: 'daily' as const,
      priority: 0.9 as const,
    },
    {
      loc: '/about',
      changefreq: 'monthly' as const,
      priority: 0.7 as const,
    },
  ]

  return [...staticPages, ...blogUrls]
})
