export function useWebsiteStructuredData() {
  const appConfig = useAppConfig()
  const canonicalUrl = useCanonicalURL()

  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'author': {
      '@type': 'Person',
      'name': appConfig.site.author,
    },
    'description': appConfig.site.desc,
    'inLanguage': appConfig.site.lang,
    'name': appConfig.site.title,
    'publisher': {
      '@type': 'Organization',
      'name': appConfig.site.title,
    },
    'url': canonicalUrl || undefined,
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
    'author': {
      '@type': 'Person',
      'name': article.author ?? appConfig.site.author,
    },
    'dateModified': article.updatedAt ?? article.date,
    'datePublished': article.date,
    'description': article.description,
    'headline': article.title,
    'image': article.image != null ? [article.image] : undefined,
    'inLanguage': appConfig.site.lang,
    'keywords': article.tags?.join(', '),
    'mainEntityOfPage': {
      '@id': canonicalUrl,
      '@type': 'WebPage',
    },
    'publisher': {
      '@type': 'Organization',
      'logo': appConfig.site.website
        ? {
            '@type': 'ImageObject',
            'url': `${appConfig.site.website}/${appConfig.site.ogImage}`,
          }
        : undefined,
      'name': appConfig.site.title,
    },
  })
}

export function useBreadcrumbStructuredData(items: Array<{ name: string, url?: string }>) {
  const appConfig = useAppConfig()
  const baseUrl = appConfig.site.website || ''

  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem' as const,
    'item': item.url != null ? `${baseUrl}${item.url}` : undefined,
    'name': item.name,
    'position': index + 1,
  }))

  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  })
}
