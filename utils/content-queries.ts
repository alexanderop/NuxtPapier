import type { BlogCollectionItem } from '@nuxt/content'

/**
 * Centralized content queries for both server and frontend
 * Avoids duplication and ensures consistent query patterns
 */

/**
 * Base query for published blog posts
 * Handles both draft: false and draft: undefined cases
 */
export function queryPublishedPosts(collection: any) {
  return collection
    .orWhere((query: any) =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .order('date', 'DESC')
}

/**
 * Get all published blog posts
 */
export async function getAllPublishedPosts() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .all()

  return posts
}

/**
 * Get recent blog posts with limit
 */
export async function getRecentPosts(limit = 3) {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .limit(limit)
    .all()

  return posts
}

/**
 * Get a single blog post by path
 */
export async function getPostByPath(path: string) {
  const normalizedPath = path.startsWith('/blog/') ? path : `/blog/${path}`

  const post = await queryCollection('blog')
    .path(normalizedPath)
    .first()

  return post
}

/**
 * Get posts by tag
 * Note: Nuxt Content v3 doesn't support array contains queries,
 * so we fetch all posts and filter client-side
 */
export async function getPostsByTag(tag: string) {
  const allPosts = await getAllPublishedPosts()

  return allPosts.filter((post: BlogCollectionItem) => {
    const tags = Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === 'string'
        ? post.tags.split(',').map((t: string) => t.trim())
        : []

    return tags.includes(tag)
  })
}

/**
 * Get all unique tags from published posts
 */
export async function getAllTags() {
  const posts = await getAllPublishedPosts()

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

/**
 * Get posts for RSS/Atom/JSON feeds
 * Includes only necessary fields for feed generation
 */
export async function getPostsForFeed() {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .only(['title', 'description', 'excerpt', 'date', 'tags', 'author', 'path', 'slug', 'image'])
    .all()

  return posts
}

/**
 * Get surrounding posts for navigation
 * Returns [previous, next] posts
 */
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

/**
 * Search posts by query string
 * Searches in title, description, and content
 */
export async function searchPosts(searchQuery: string) {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return []
  }

  // Get all published posts for client-side search
  // Note: Nuxt Content v3 doesn't have built-in full-text search
  const posts = await getAllPublishedPosts()

  const query = searchQuery.toLowerCase()

  return posts.filter((post: BlogCollectionItem) =>
    post.title?.toLowerCase().includes(query)
    || post.description?.toLowerCase().includes(query)
    || post.excerpt?.toLowerCase().includes(query),
  )
}

/**
 * Get posts with specific fields only
 * Useful for performance when you don't need full content
 */
export async function getPostsWithFields(fields: string[]) {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .only(fields)
    .all()

  return posts
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string) {
  const posts = await queryPublishedPosts(queryCollection('blog'))
    .where('category', '=', category)
    .all()

  return posts
}

/**
 * Get post count
 */
export async function getPostCount() {
  const posts = await getAllPublishedPosts()
  return posts.length
}
