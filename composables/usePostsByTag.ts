export function usePostsByTag(tag: Ref<string> | string) {
  const appConfig = useAppConfig()
  const route = useRoute()
  const tagValue = isRef(tag) ? tag : ref(tag)

  const pageSize = computed(() => appConfig.site.pagination.postsPerPage ?? 10)

  const { data: totalCount } = useAsyncData(
    () => `posts-tag-${tagValue.value}-count`,
    async () => {
      try {
        const posts = await queryCollection('posts')
          .where('draft', '<>', true)
          .all()

        // Filter posts that contain the tag
        const filtered = posts.filter(post =>
          post.tags && Array.isArray(post.tags) && post.tags.includes(tagValue.value),
        )
        return filtered.length
      }
      catch {
        // Return 0 count on error
        return 0
      }
    },
    {
      watch: [tagValue],
    },
  )

  const handleNavigation = async (page: number | undefined) => {
    try {
      const navResult = await navigateTo({
        query: {
          ...route.query,
          page,
        },
      })
      return navResult
    }
    catch (error) {
      throw new Error(`Navigation failed: ${String(error)}`)
    }
  }

  const initialPage = Number.parseInt(String(route.query.page ?? '1')) || 1
  const {
    currentPage,
    pageCount: totalPages,
    isFirstPage,
    isLastPage,
    prev: goToPrevious,
    next: goToNext,
  } = useOffsetPagination({
    async onPageChange({ currentPage }) {
      await handleNavigation(currentPage > 1 ? currentPage : undefined)
    },
    page: initialPage,
    pageSize: computed(() => pageSize.value),
    total: computed(() => totalCount.value ?? 0),
  })

  watch(pageSize, async (newPageSize, oldPageSize) => {
    if (oldPageSize && newPageSize !== oldPageSize && currentPage.value > 1) {
      await handleNavigation(undefined)
    }
  })

  const hasPrevious = computed(() => !isFirstPage.value)
  const hasNext = computed(() => !isLastPage.value)
  const offset = computed(() => (currentPage.value - 1) * pageSize.value)

  const error = ref<Error | null>(null)

  const { data: posts, pending: loading } = useAsyncData(
    () => `posts-tag-${tagValue.value}-page-${currentPage.value}-size-${pageSize.value}`,
    async () => {
      error.value = null
      try {
        const data = await queryCollection('posts')
          .where('draft', '<>', true)
          .order('date', 'DESC')
          .all()

        // Filter posts that contain the tag
        const filtered = data.filter(post =>
          post.tags && Array.isArray(post.tags) && post.tags.includes(tagValue.value),
        )
        // Apply pagination manually
        const start = offset.value
        const end = start + pageSize.value
        return filtered.slice(start, end)
      }
      catch (err) {
        error.value = err instanceof Error ? err : new Error(`Failed to fetch posts for tag ${tagValue.value}: ${String(err)}`)
        return []
      }
    },
    {
      watch: [tagValue, currentPage, pageSize],
    },
  )

  const goToNextWithError = async () => {
    try {
      await handleNavigation(currentPage.value + 1)
      goToNext()
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    }
  }

  const goToPreviousWithError = async () => {
    try {
      await handleNavigation(currentPage.value - 1)
      goToPrevious()
    }
    catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    }
  }

  return {
    currentPage: readonly(currentPage),
    error: readonly(error),
    goToNext: goToNextWithError,
    goToPrevious: goToPreviousWithError,
    hasNext: readonly(hasNext),
    hasPrevious: readonly(hasPrevious),
    loading: readonly(loading),
    pageSize: readonly(pageSize),
    posts: readonly(posts),
    totalCount: readonly(totalCount),
    totalPages: readonly(totalPages),
  }
}
