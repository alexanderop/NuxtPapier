import type { BlogCollectionItem } from '@nuxt/content'

export function queryPublishedPosts(collection: any) {
  return collection
    .orWhere((query: any) =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .order('date', 'DESC')
}

export async function getAllPublishedPosts() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .all()

  return posts
}

export async function getRecentPosts(limit = 3) {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .limit(limit)
    .all()

  return posts
}

export async function getPostByPath(path: string) {
  const normalizedPath = path.startsWith('/blog/') ? path : `/blog/${path}`

  const post = await queryCollection('blog')
    .path(normalizedPath)
    .first()

  return post
}

export async function getPostsByTag(tag: string) {
  const allPosts = await queryPublishedPosts(queryCollection('blog'))
    .select(['title', 'description', 'path', 'date', 'tags', 'formattedDate', 'readingTime'])
    .all()

  return allPosts.filter((post: BlogCollectionItem) => {
    const tags = Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === 'string'
        ? post.tags.split(',').map((t: string) => t.trim())
        : []

    return tags.includes(tag)
  })
}

export async function getAllTags() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['tags'])
    .all()

  const tagCounts = new Map<string, number>()

  posts.forEach((post: BlogCollectionItem) => {
    const tags = Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === 'string'
        ? post.tags.split(',').map((t: string) => t.trim())
        : []

    tags.forEach((tag: string) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getPostsForFeed() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['title', 'description', 'excerpt', 'date', 'tags', 'author', 'path', 'slug', 'image'])
    .all()

  return posts
}

export async function getSurroundingPosts(currentPath: string) {
  const surroundings = await queryCollectionItemSurroundings(
    'blog',
    currentPath,
    {
      fields: ['title', 'path'],
    },
  )
    .orWhere((query: any) =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .order('date', 'DESC')

  return surroundings
}

export async function searchPosts(searchQuery: string) {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return []
  }

  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['title', 'description', 'excerpt', 'path', 'date', 'formattedDate'])
    .all()

  const query = searchQuery.toLowerCase()

  return posts.filter((post: BlogCollectionItem) =>
    post.title?.toLowerCase().includes(query)
    || post.description?.toLowerCase().includes(query)
    || post.excerpt?.toLowerCase().includes(query),
  )
}

export async function getPostsWithFields(fields: string[]) {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(fields)
    .all()

  return posts
}

export async function getPostsByCategory(category: string) {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .where('category', '=', category)
    .all()

  return posts
}

export async function getPostCount() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['path'])
    .all()
  return posts.length
}

export async function getPostPaths() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['path'])
    .all()

  return posts.map((post: BlogCollectionItem) => post.path)
}

export async function getPostsForListing() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['title', 'description', 'path', 'date', 'formattedDate', 'readingTime', 'tags', 'category'])
    .all()

  return posts
}

export async function postExists(path: string): Promise<boolean> {
  const normalizedPath = path.startsWith('/blog/') ? path : `/blog/${path}`

  const post = await queryCollection('blog')
    .path(normalizedPath)
    .first()

  return !!post
}

export async function getPostsGroupedByTags() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .select(['title', 'path', 'date', 'tags', 'description'])
    .all()

  const tagGroups = new Map<string, BlogCollectionItem[]>()

  posts.forEach((post: BlogCollectionItem) => {
    const tags = Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === 'string'
        ? post.tags.split(',').map((t: string) => t.trim())
        : []

    tags.forEach((tag: string) => {
      if (!tagGroups.has(tag)) {
        tagGroups.set(tag, [])
      }
      tagGroups.get(tag)!.push(post)
    })
  })

  tagGroups.forEach((posts) => {
    posts.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime()
      const dateB = new Date(b.date || 0).getTime()
      return dateB - dateA
    })
  })

  return tagGroups
}
