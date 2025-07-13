export default defineEventHandler((event) => {
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = appConfig.site.website || runtimeConfig.public.siteUrl || 'https://example.com'

  const robotsTxt = `# Robots.txt for ${appConfig.site.title}
# Allow all crawlers access to all content

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay for respectful crawling (optional)
# Crawl-delay: 1

# Disallow access to admin or private areas (if any)
# Disallow: /admin/
# Disallow: /api/
`

  setHeader(event, 'Content-Type', 'text/plain')
  return robotsTxt
})
