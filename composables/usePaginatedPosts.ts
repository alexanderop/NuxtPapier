export function usePaginatedPosts() {
  const appConfig = useAppConfig()
  const route = useRoute()

  const pageSize = computed(() => appConfig.site.pagination.postsPerPage ?? 10)

  const { data: totalCount } = useAsyncData(
    'posts-total-count',
    async () => {
      const result = await fromPromise(
        queryCollection('posts')
          .where('draft', '<>', true)
          .count(),
        error => new Error(`Failed to count posts: ${String(error)}`),
      )
      return result.match(
        count => count,
        () => 0,
      )
    },
  )

  const handleNavigation = async (page: number | undefined) => {
    const navResult = navigateTo({
      query: {
        ...route.query,
        page,
      },
    })

    const isPromise = navResult !== null && navResult !== undefined && typeof navResult === 'object' && 'then' in navResult
    if (isPromise) {
      const result = await fromPromise(
        navResult,
        error => new Error(`Navigation failed: ${String(error)}`),
      )
      return result
    }

    return ok(navResult)
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
      const result = await fromPromise(
        queryCollection('posts')
          .where('draft', '<>', true)
          .order('date', 'DESC')
          .skip(offset.value)
          .limit(pageSize.value)
          .all(),
        error => new Error(`Failed to fetch posts: ${String(error)}`),
      )

      return result.match(
        data => data,
        (err) => {
          error.value = err
          return []
        },
      )
    },
    {
      watch: [currentPage, pageSize],
    },
  )

  const goToNextWithError = async () => {
    const result = await handleNavigation(currentPage.value + 1)
    if (result.isErr()) {
      error.value = result.error
      return
    }
    goToNext()
  }

  const goToPreviousWithError = async () => {
    const result = await handleNavigation(currentPage.value - 1)
    if (result.isErr()) {
      error.value = result.error
      return
    }
    goToPrevious()
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
