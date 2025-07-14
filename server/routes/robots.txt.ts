export default defineEventHandler((event) => {
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig(event)

  let siteUrl = 'https://example.com'

  const { website } = appConfig.site
  const { siteUrl: publicSiteUrl } = runtimeConfig.public

  if (typeof website === 'string' && website.length > 0) {
    siteUrl = website
  }
  else if (typeof publicSiteUrl === 'string' && publicSiteUrl.length > 0) {
    siteUrl = publicSiteUrl
  }

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
