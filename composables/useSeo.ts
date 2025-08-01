import type { SeoMetaData, Social } from '~/types'

export function useCanonicalURL(path?: string) {
  const route = useRoute()
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()

  const basePath = path ?? route.path
  const { siteUrl } = runtimeConfig.public
  const siteUrlValue = typeof siteUrl === 'string' ? siteUrl : undefined
  const baseUrl = appConfig.site.website ?? siteUrlValue ?? ''

  if (baseUrl === '') {
    // Only warn in development
    if (import.meta.dev) {
      console.warn('[SEO] No website URL configured. Set app.config.site.website or NUXT_PUBLIC_SITE_URL for production')
    }
    return ''
  }

  const cleanUrl = typeof baseUrl === 'string' ? baseUrl.replace(/\/$/, '') : ''
  return `${cleanUrl}${basePath}`
}

interface SeoMetaOptions {
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
}

interface AppConfig {
  site: {
    title: string
    desc: string
    ogImage?: string
    lang: string
    author: string
  }
  socials?: Social[]
}

function buildBaseSeoMeta(
  options: SeoMetaOptions,
  appConfig: AppConfig,
  canonicalUrl: string,
): SeoMetaData {
  const metaTitle = options.title ?? appConfig.site.title
  const metaDescription = options.description ?? appConfig.site.desc
  const metaImage = options.image ?? `/${appConfig.site.ogImage}`
  const imageWidth = options.imageWidth ?? 1200
  const imageHeight = options.imageHeight ?? 630

  const twitterHandle = appConfig.socials?.find((s: Social) => s.name === 'Twitter')?.href?.split('/').pop()

  return {
    author: options.author ?? appConfig.site.author,
    description: metaDescription,
    ogDescription: metaDescription,
    ogImage: metaImage,
    ogImageAlt: metaTitle,
    ogImageHeight: imageHeight,
    ogImageWidth: imageWidth,
    ogLocale: appConfig.site.lang === 'en' ? 'en_US' : appConfig.site.lang,
    ogSiteName: appConfig.site.title,
    ogTitle: metaTitle,
    ogType: options.type ?? 'website',
    ogUrl: canonicalUrl,
    title: metaTitle,
    twitterCard: 'summary_large_image',
    twitterDescription: metaDescription,
    twitterImage: metaImage,
    twitterImageAlt: metaTitle,
    twitterSite: twitterHandle,
    twitterTitle: metaTitle,
  }
}

function addArticleMeta(seoMeta: SeoMetaData, options: SeoMetaOptions): void {
  if (options.type !== 'article')
    return

  if (options.author != null)
    seoMeta.articleAuthor = [options.author]
  if (options.publishedTime != null)
    seoMeta.articlePublishedTime = options.publishedTime
  if (options.modifiedTime != null)
    seoMeta.articleModifiedTime = options.modifiedTime
  if (options.tags != null && options.tags.length > 0)
    seoMeta.articleTag = options.tags
  seoMeta.articleSection = 'Technology'
}

export function useEnhancedSeoMeta(options: SeoMetaOptions) {
  const appConfig = useAppConfig()
  const canonicalUrl = useCanonicalURL(options.path)

  const seoMeta = buildBaseSeoMeta(options, appConfig, canonicalUrl)

  const hasCanonicalUrl = canonicalUrl !== '' && canonicalUrl.length > 0
  if (hasCanonicalUrl) {
    seoMeta.canonical = canonicalUrl
  }

  addArticleMeta(seoMeta, options)

  useSeoMeta(seoMeta)

  if (hasCanonicalUrl) {
    useHead({
      link: [
        { href: canonicalUrl, rel: 'canonical' },
      ],
    })
  }
}
