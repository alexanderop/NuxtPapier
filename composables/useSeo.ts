import type { SeoMetaData, Social } from '~/types'

export function useCanonicalURL(path?: string) {
  const route = useRoute()
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()
  const error = ref<string | null>(null)

  const basePath = path || route.path
  const baseUrl = appConfig.site.website || (runtimeConfig.public?.siteUrl as string) || ''

  if (!baseUrl) {
    error.value = 'No website URL configured. Set app.config.site.website or NUXT_PUBLIC_SITE_URL'
    return { url: '', error: readonly(error) }
  }

  const cleanUrl = typeof baseUrl === 'string' ? baseUrl.replace(/\/$/, '') : ''
  return { url: `${cleanUrl}${basePath}`, error: readonly(error) }
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
  const canonicalResult = useCanonicalURL(options.path)
  const canonicalUrl = typeof canonicalResult === 'string' ? canonicalResult : canonicalResult.url

  const metaTitle = options.title || appConfig.site.title
  const metaDescription = options.description || appConfig.site.desc
  const metaImage = options.image || `/${appConfig.site.ogImage}`

  // Default image dimensions for better social media preview
  const imageWidth = options.imageWidth || 1200
  const imageHeight = options.imageHeight || 630

  const seoMeta: SeoMetaData = {
    title: metaTitle,
    description: metaDescription,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage: metaImage,
    ogImageWidth: imageWidth,
    ogImageHeight: imageHeight,
    ogImageAlt: metaTitle,
    ogUrl: canonicalUrl,
    ogType: options.type || 'website',
    ogSiteName: appConfig.site.title,
    ogLocale: appConfig.site.lang === 'en' ? 'en_US' : appConfig.site.lang,
    twitterCard: 'summary_large_image',
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    twitterImage: metaImage,
    twitterImageAlt: metaTitle,
    twitterSite: appConfig.socials?.find((s: Social) => s.name === 'Twitter')?.href?.split('/').pop(),
    author: options.author || appConfig.site.author,
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
        { rel: 'canonical', href: canonicalUrl },
      ],
    })
  }
}
