interface TagInfo {
  tag: string
  count: number
}

export function useTags() {
  const error = ref<Error | null>(null)

  const { data: tagData, pending: loading } = useAsyncData(
    'all-tags',
    async () => {
      error.value = null
      try {
        const posts = await queryCollection('posts')
          .where('draft', '<>', true)
          .select('tags')
          .all()

        const tagCountMap = new Map<string, number>()

        for (const post of posts) {
          if (post.tags && Array.isArray(post.tags)) {
            for (const tag of post.tags) {
              tagCountMap.set(tag, (tagCountMap.get(tag) ?? 0) + 1)
            }
          }
        }

        const tagInfoArray: TagInfo[] = Array.from(tagCountMap.entries())
          .map(([tag, count]) => ({ count, tag }))
          .sort((a, b) => b.count - a.count)

        return tagInfoArray
      }
      catch (err) {
        error.value = err instanceof Error ? err : new Error(`Failed to fetch tags: ${String(err)}`)
        return []
      }
    },
  )

  const tags = computed(() => tagData.value?.map(info => info.tag) || [])
  const tagInfos = computed(() => tagData.value || [])
  const totalTags = computed(() => tags.value.length)

  return {
    error: readonly(error),
    loading: readonly(loading),
    tagInfos: readonly(tagInfos),
    tags: readonly(tags),
    totalTags: readonly(totalTags),
  }
}
