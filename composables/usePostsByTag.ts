export function usePostsByTag(tag: Ref<string> | string) {
  const appConfig = useAppConfig()
  const route = useRoute()
  const tagValue = isRef(tag) ? tag : ref(tag)

  const pageSize = computed(() => appConfig.site.pagination.postsPerPage ?? 10)

  const { data: totalCount } = useAsyncData(
    () => `posts-tag-${tagValue.value}-count`,
    async () => {
      const result = await fromPromise(
        queryCollection('posts')
          .where('draft', '<>', true)
          .all(),
        error => new Error(`Failed to count posts for tag ${tagValue.value}: ${String(error)}`),
      )

      // Filter posts that contain the tag
      const filteredResult = result.map(posts =>
        posts.filter(post => post.tags && Array.isArray(post.tags) && post.tags.includes(tagValue.value)),
      )
      return filteredResult.match(
        posts => posts.length,
        () => 0,
      )
    },
    {
      watch: [tagValue],
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
    () => `posts-tag-${tagValue.value}-page-${currentPage.value}-size-${pageSize.value}`,
    async () => {
      error.value = null
      const result = await fromPromise(
        queryCollection('posts')
          .where('draft', '<>', true)
          .order('date', 'DESC')
          .all(),
        error => new Error(`Failed to fetch posts for tag ${tagValue.value}: ${String(error)}`),
      )

      return result.match(
        (data) => {
          // Filter posts that contain the tag
          const filtered = data.filter(post =>
            post.tags && Array.isArray(post.tags) && post.tags.includes(tagValue.value),
          )
          // Apply pagination manually
          const start = offset.value
          const end = start + pageSize.value
          return filtered.slice(start, end)
        },
        (err) => {
          error.value = err
          return []
        },
      )
    },
    {
      watch: [tagValue, currentPage, pageSize],
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
