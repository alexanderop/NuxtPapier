import { useOffsetPagination } from '@vueuse/core'

interface UsePaginationOptions<T> {
  collection: string
  pageSize?: number
  where?: Array<[string, string, any]>
  order?: [string, 'ASC' | 'DESC']
}

interface PaginationData<T> {
  items: T[]
  total: number
}

export function usePaginatedCollection<T = any>(options: UsePaginationOptions<T>) {
  const appConfig = useAppConfig()
  const route = useRoute()

  const {
    collection,
    where = [],
    order = ['date', 'DESC'],
    pageSize = appConfig.site.pagination.postsPerPage || 10,
  } = options

  const initialPage = Number.parseInt(route.query.page as string) || 1

  // Fetch total count
  const { data: totalCount } = useAsyncData(
    `${collection}-total-count`,
    async () => {
      let query = queryCollection(collection)

      // Apply where clauses
      for (const [field, operator, value] of where) {
        query = query.where(field, operator, value)
      }

      const result = await fromPromise(
        query.count(),
        error => new Error(`Failed to count ${collection}: ${error}`),
      )

      return result.match(
        count => count,
        () => 0,
      )
    },
  )

  // Setup pagination
  const {
    currentPage,
    currentPageSize,
    pageCount,
    isFirstPage,
    isLastPage,
    prev,
    next,
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
    pageSize,
    total: totalCount || 0,
  })

  const offset = computed(() => (currentPage.value - 1) * currentPageSize.value)

  // Fetch paginated items
  const { data: items, refresh, pending, error } = useAsyncData(
    () => `${collection}-page-${currentPage.value}`,
    async () => {
      let query = queryCollection(collection)

      // Apply where clauses
      for (const [field, operator, value] of where) {
        query = query.where(field, operator, value)
      }

      const result = await fromPromise(
        query
          .order(order[0], order[1])
          .skip(offset.value)
          .limit(pageSize)
          .all(),
        error => new Error(`Failed to fetch ${collection}: ${error}`),
      )

      return result.match(
        data => data as T[],
        () => [] as T[],
      )
    },
    {
      watch: [currentPage],
    },
  )

  return {

    // Pagination state
    currentPage: readonly(currentPage),

    error: readonly(error),

    goToNext: next,

    goToPage: (page: number) => {
      currentPage.value = page
    },

    // Navigation
    goToPrevious: prev,

    hasNext: computed(() => !isLastPage.value),

    // Computed helpers
    hasPrevious: computed(() => !isFirstPage.value),

    isFirstPage,

    isLastPage,

    // Data
    items: readonly(items),

    offset: readonly(offset),

    pageSize: currentPageSize.value,

    pending: readonly(pending),

    // Actions
    refresh,

    totalCount: readonly(totalCount),

    totalPages: pageCount,
  }
}
