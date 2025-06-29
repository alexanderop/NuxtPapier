export function useEnhancedContent() {
  const getRelatedPosts = async (post: any, limit: number = 3) => {
    const { data } = await useAsyncData(`related-${post._id}`, () =>
      $fetch('/api/_content/query', {
        params: {
          where: {
            _path: { $ne: post._path },
            $or: [
              { tags: { $in: post.tags || [] } },
              { category: post.category },
            ],
            status: 'published',
          },
          limit,
          sort: { date: -1 },
        },
      }))
    return data.value || []
  }

  const getPostsByTag = async (tag: string, limit?: number) => {
    const { data } = await useAsyncData(`posts-tag-${tag}`, () =>
      $fetch('/api/_content/query', {
        params: {
          where: {
            tags: { $contains: tag },
            status: 'published',
          },
          limit: limit || 10,
          sort: { date: -1 },
        },
      }))
    return data.value || []
  }

  const getPostsByCategory = async (category: string, limit?: number) => {
    const { data } = await useAsyncData(`posts-category-${category}`, () =>
      $fetch('/api/_content/query', {
        params: {
          where: {
            category,
            status: 'published',
          },
          limit: limit || 10,
          sort: { date: -1 },
        },
      }))
    return data.value || []
  }

  const getAllTags = async () => {
    const { data } = await useAsyncData('all-tags', () =>
      $fetch('/api/_content/query', {
        params: {
          where: { status: 'published' },
          only: ['tags'],
        },
      }))

    const posts = (data.value || []) as any[]
    const tagCounts = new Map<string, number>()

    posts.forEach((post: any) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag: string) => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
        })
      }
    })

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }

  const getAllCategories = async () => {
    const { data } = await useAsyncData('all-categories', () =>
      $fetch('/api/_content/query', {
        params: {
          where: { status: 'published' },
          only: ['category', 'categorySlug'],
        },
      }))

    const posts = (data.value || []) as any[]
    const categoryCounts = new Map<string, { slug: string, count: number }>()

    posts.forEach((post: any) => {
      if (post.category) {
        const existing = categoryCounts.get(post.category)
        if (existing) {
          existing.count++
        }
        else {
          categoryCounts.set(post.category, {
            slug: post.categorySlug || post.category.toLowerCase().replace(/\s+/g, '-'),
            count: 1,
          })
        }
      }
    })

    return Array.from(categoryCounts.entries())
      .map(([name, { slug, count }]) => ({ name, slug, count }))
      .sort((a, b) => b.count - a.count)
  }

  return {
    getRelatedPosts,
    getPostsByTag,
    getPostsByCategory,
    getAllTags,
    getAllCategories,
  }
}
