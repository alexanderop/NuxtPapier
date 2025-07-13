export interface SearchResult {
  id: string
  title: string
  path: string
  category: string
  content?: string
  breadcrumb?: string[]
  blogTitle?: string
  heading?: string
}

// Extract the return type from queryCollectionSearchSections
type SearchSectionsResult = Awaited<ReturnType<typeof queryCollectionSearchSections>>
type SearchSection = SearchSectionsResult[number]

export function useSearch() {
  // State
  const query = ref('')
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const sections = ref<SearchSection[]>([])

  // Load sections on mount
  onMounted(async () => {
    loading.value = true
    error.value = null

    // Query search sections from blog collection
    const result = await queryCollectionSearchSections('blog')
      .then(data => ({ data, success: true as const }))
      .catch(err => ({
        error: err instanceof Error ? err : new Error('Failed to load search data'),
        success: false as const,
      }))

    if (!result.success) {
      error.value = result.error
    }
    if (result.success) {
      sections.value = result.data
    }

    loading.value = false
  })

  // Helper to get content snippet around search term
  function getContentSnippet(content: string, searchTerm: string, maxLength = 150): string {
    const lowerContent = content.toLowerCase()
    const lowerTerm = searchTerm.toLowerCase()
    const index = lowerContent.indexOf(lowerTerm)

    if (index === -1)
      return `${content.slice(0, maxLength)}...`

    // Get surrounding context
    const start = Math.max(0, index - 50)
    const end = Math.min(content.length, index + searchTerm.length + 100)

    const snippet = [
      start > 0 ? '...' : '',
      content.slice(start, end),
      end < content.length ? '...' : '',
    ].join('')

    return snippet
  }

  // Computed results with filtering and transformation
  const results = computed(() => {
    if (!query.value || sections.value.length === 0)
      return []

    const q = query.value.toLowerCase()

    // Filter sections by title and content
    const filtered = sections.value
      .filter(section =>
        section.title.toLowerCase().includes(q)
        || section.content.toLowerCase().includes(q),
      )
      .map((section) => {
        // Section IDs are already in the format: /blog/slug or /blog/slug#anchor
        // Just use them directly as the path
        const path = section.id

        // Extract blog title and heading
        const blogTitle = section.titles.length > 0 ? section.titles[0] : section.title
        const isHeading = section.title !== blogTitle
        const heading = isHeading ? section.title : undefined

        return {
          blogTitle,
          breadcrumb: section.titles.length > 0 ? section.titles : [section.title],
          category: 'Blog',
          content: getContentSnippet(section.content, query.value),
          heading,
          id: section.id,
          path,
          title: section.title,
        }
      })
      .slice(0, 15) // Limit results

    return filtered
  })

  // Methods
  function search(q: string) {
    query.value = q
    error.value = null
  }

  function clear() {
    query.value = ''
    error.value = null
  }

  // Return readonly state and methods
  return {

    clear,

    error: readonly(error),

    loading: readonly(loading),
    // State
    query: readonly(query),

    results: readonly(results),
    // Methods
    search,
  }
}
