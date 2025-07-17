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
# Allow social media bots for Open Graph previews
# These bots need access to generate link previews on social platforms

# LinkedIn Bot - for LinkedIn post previews
User-agent: LinkedInBot
Allow: /

# Facebook Bot - for Facebook/Instagram link previews
User-agent: facebookexternalhit
Allow: /

# Twitter Bot - for Twitter/X link previews
User-agent: Twitterbot
Allow: /

# WhatsApp Bot - for WhatsApp link previews
User-agent: WhatsApp
Allow: /

# Telegram Bot - for Telegram link previews
User-agent: Telegrambot
Allow: /

# Discord Bot - for Discord link previews
User-agent: Discordbot
Allow: /

# Slack Bot - for Slack link previews
User-agent: Slackbot
Allow: /

# Allow all other crawlers access to all content
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
