export function useWebsiteStructuredData() {
  const appConfig = useAppConfig()
  const canonicalUrl = useCanonicalURL()

  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': appConfig.site.title,
    'description': appConfig.site.desc,
    'url': canonicalUrl || undefined,
    'author': {
      '@type': 'Person',
      'name': appConfig.site.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': appConfig.site.title,
    },
    'inLanguage': appConfig.site.lang,
  })
}

export function useArticleStructuredData(article: {
  title: string
  description?: string
  author?: string
  date: string
  updatedAt?: string
  image?: string
  tags?: string[]
}) {
  const appConfig = useAppConfig()
  const canonicalUrl = useCanonicalURL()

  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.description,
    'author': {
      '@type': 'Person',
      'name': article.author || appConfig.site.author,
    },
    'datePublished': article.date,
    'dateModified': article.updatedAt || article.date,
    'publisher': {
      '@type': 'Organization',
      'name': appConfig.site.title,
      'logo': appConfig.site.website
        ? {
            '@type': 'ImageObject',
            'url': `${appConfig.site.website}/${appConfig.site.ogImage}`,
          }
        : undefined,
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    'image': article.image ? [article.image] : undefined,
    'keywords': article.tags?.join(', '),
    'inLanguage': appConfig.site.lang,
  })
}

export function useBreadcrumbStructuredData(items: Array<{ name: string, url?: string }>) {
  const appConfig = useAppConfig()
  const baseUrl = appConfig.site.website || ''

  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem' as const,
    'position': index + 1,
    'name': item.name,
    'item': item.url ? `${baseUrl}${item.url}` : undefined,
  }))

  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  })
}
