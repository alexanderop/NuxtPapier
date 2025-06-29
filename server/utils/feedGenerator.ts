import type { BlogCollectionItem } from '@nuxt/content'
import type { H3Event } from 'h3'
import { Feed } from 'feed'
import { siteConfig } from '~/utils/site.config'
import { tryCatch } from '~/utils/tryCatch'

export async function generateFeed(event: H3Event) {
  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: siteConfig.language,
    image: siteConfig.logo ? `${siteConfig.url}${siteConfig.logo}` : undefined,
    favicon: siteConfig.favicon ? `${siteConfig.url}${siteConfig.favicon}` : undefined,
    copyright: siteConfig.copyright || `© ${new Date().getFullYear()} ${siteConfig.name}`,
    updated: new Date(),
    generator: siteConfig.name,
    feedLinks: {
      rss: `${siteConfig.url}/rss.xml`,
      atom: `${siteConfig.url}/atom.xml`,
      json: `${siteConfig.url}/feed.json`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.author.url,
    },
  })

  // Use queryCollection with event as first argument for server context
  let posts: BlogCollectionItem[] = []

  const result = await tryCatch<BlogCollectionItem[]>(
    // @ts-expect-error - queryCollection works with event in server context
    queryCollection(event, 'blog')
      .orWhere((query: any) =>
        query
          .where('draft', '<>', true)
          .where('draft', 'IS NULL'),
      )
      .order('date', 'DESC')
      .all(),
  )

  if (result.error) {
    console.error('Error fetching posts for feed:', result.error)
    posts = []
  }
  else {
    posts = result.data
  }

  // Add posts to feed
  for (const post of posts) {
    feed.addItem({
      title: post.title || '',
      id: `${siteConfig.url}${post.path}`,
      link: `${siteConfig.url}${post.path}`,
      description: post.description || '',
      content: post.description || '',
      author: [
        {
          name: siteConfig.author.name,
          email: siteConfig.author.email,
          link: siteConfig.author.url,
        },
      ],
      date: post.date ? new Date(post.date) : new Date(),
      published: post.date ? new Date(post.date) : new Date(),
    })
  }

  return feed
}
