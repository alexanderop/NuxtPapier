import type { SeoMetaData, Social } from '~/types'

export function useCanonicalURL(path?: string) {
  const route = useRoute()
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()

  const basePath = path || route.path
  const baseUrl = appConfig.site.website || (runtimeConfig.public?.siteUrl as string) || ''

  if (!baseUrl) {
    // Only warn in development
    if (import.meta.dev) {
      console.warn('[SEO] No website URL configured. Set app.config.site.website or NUXT_PUBLIC_SITE_URL for production')
    }
    return ''
  }

  const cleanUrl = typeof baseUrl === 'string' ? baseUrl.replace(/\/$/, '') : ''
  return `${cleanUrl}${basePath}`
}

export function useEnhancedSeoMeta(options: {
  title?: string
  description?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  type?: 'website' | 'article'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  path?: string
}) {
  const appConfig = useAppConfig()
  const canonicalUrl = useCanonicalURL(options.path)

  const metaTitle = options.title || appConfig.site.title
  const metaDescription = options.description || appConfig.site.desc
  const metaImage = options.image || `/${appConfig.site.ogImage}`

  // Default image dimensions for better social media preview
  const imageWidth = options.imageWidth || 1200
  const imageHeight = options.imageHeight || 630

  const seoMeta: SeoMetaData = {
    author: options.author || appConfig.site.author,
    description: metaDescription,
    ogDescription: metaDescription,
    ogImage: metaImage,
    ogImageAlt: metaTitle,
    ogImageHeight: imageHeight,
    ogImageWidth: imageWidth,
    ogLocale: appConfig.site.lang === 'en' ? 'en_US' : appConfig.site.lang,
    ogSiteName: appConfig.site.title,
    ogTitle: metaTitle,
    ogType: options.type || 'website',
    ogUrl: canonicalUrl,
    title: metaTitle,
    twitterCard: 'summary_large_image',
    twitterDescription: metaDescription,
    twitterImage: metaImage,
    twitterImageAlt: metaTitle,
    twitterSite: appConfig.socials?.find((s: Social) => s.name === 'Twitter')?.href?.split('/').pop(),
    twitterTitle: metaTitle,
  }

  if (canonicalUrl && canonicalUrl.length > 0) {
    seoMeta.canonical = canonicalUrl
  }

  if (options.type === 'article') {
    if (options.author)
      seoMeta.articleAuthor = [options.author]
    if (options.publishedTime)
      seoMeta.articlePublishedTime = options.publishedTime
    if (options.modifiedTime)
      seoMeta.articleModifiedTime = options.modifiedTime
    if (options.tags && options.tags.length > 0)
      seoMeta.articleTag = options.tags
    seoMeta.articleSection = 'Technology'
  }

  useSeoMeta(seoMeta)

  if (canonicalUrl && canonicalUrl.length > 0) {
    useHead({
      link: [
        { href: canonicalUrl, rel: 'canonical' },
      ],
    })
  }
}
