export function usePaginatedPosts() {
  const appConfig = useAppConfig()
  const route = useRoute()

  // Make page size reactive
  const pageSize = computed(() => appConfig.site.pagination.postsPerPage ?? 10)

  // Fetch total count of posts
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

  // Setup pagination with reactive total and pageSize
  const initialPage = Number.parseInt(String(route.query.page ?? '1')) || 1
  const {
    currentPage,
    pageCount: totalPages,
    isFirstPage,
    isLastPage,
    prev: goToPrevious,
    next: goToNext,
  } = useOffsetPagination({
    onPageChange({ currentPage }) {
      navigateTo({
        query: {
          ...route.query,
          page: currentPage > 1 ? currentPage : undefined,
        },
      })
    },
    page: initialPage,
    pageSize: pageSize.value,
    total: computed(() => totalCount.value ?? 0),
  })

  // Watch for pageSize changes and reset to page 1
  watch(pageSize, (newPageSize, oldPageSize) => {
    if (oldPageSize && newPageSize !== oldPageSize && currentPage.value > 1) {
      navigateTo({
        query: {
          ...route.query,
          page: undefined,
        },
      })
    }
  })

  // Computed values for pagination state
  const hasPrevious = computed(() => !isFirstPage.value)
  const hasNext = computed(() => !isLastPage.value)
  const offset = computed(() => (currentPage.value - 1) * pageSize.value)

  // Fetch paginated posts
  const { data: posts } = useAsyncData(
    () => `posts-page-${currentPage.value}-size-${pageSize.value}`,
    async () => {
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
        () => [],
      )
    },
    {
      watch: [currentPage, pageSize],
    },
  )

  return {
    currentPage,
    goToNext,
    goToPrevious,
    hasNext,
    hasPrevious,
    pageSize,
    posts,
    totalCount,
    totalPages,
  }
}
