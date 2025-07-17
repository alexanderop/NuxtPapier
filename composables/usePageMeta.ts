interface PageContent {
  title: string
  description?: string
  ogImage?: string
}

interface PageMetaOptions {
  isHomePage?: boolean
  isBlogPost?: boolean
  customSuffix?: string
  fallbackDescription?: string
}

export function usePageMeta(content: PageContent, options: PageMetaOptions = {}) {
  const appConfig = useAppConfig()

  const {
    isHomePage: isUserOnHomePage = false,
    isBlogPost: isContentBlogPost = false,
    customSuffix,
    fallbackDescription,
  } = options

  const pageTitle = isUserOnHomePage
    ? appConfig.site.title
    : `${content.title} - ${customSuffix ?? appConfig.site.title}`

  const pageDescription = content.description
    ?? fallbackDescription
    ?? (isContentBlogPost
      ? `Read "${content.title}" on ${appConfig.site.title}`
      : `${content.title} page on ${appConfig.site.title}`)

  const pageOgImage = content.ogImage ?? appConfig.site.ogImage

  return {
    pageDescription,
    pageOgImage,
    pageTitle,
  }
}
