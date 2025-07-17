export function usePaginatedPosts() {
  const appConfig = useAppConfig()
  const route = useRoute()

  const pageSize = computed(() => appConfig.site.pagination.postsPerPage ?? 10)

  const { data: totalCount } = useAsyncData(
    'posts-total-count',
    async () => {
      try {
        const count = await queryCollection('posts')
          .where('draft', '<>', true)
          .count()
        return count
      }
      catch {
        return 0
      }
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
    () => `posts-page-${currentPage.value}-size-${pageSize.value}`,
    async () => {
      error.value = null
      try {
        const data = await queryCollection('posts')
          .where('draft', '<>', true)
          .order('date', 'DESC')
          .skip(offset.value)
          .limit(pageSize.value)
          .all()
        return data
      }
      catch (err) {
        error.value = err instanceof Error ? err : new Error(`Failed to fetch posts: ${String(err)}`)
        return []
      }
    },
    {
      watch: [currentPage, pageSize],
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
