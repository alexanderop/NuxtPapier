<script setup lang="ts">
import Fuse from 'fuse.js'

const isOpen = defineModel<boolean>({ required: true })
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')
const modalContainer = useTemplateRef<HTMLDivElement>('modalContainer')

// Lock body scroll when modal is open (client-side only)
onMounted(() => {
  const scrollLock = useScrollLock(document.body)
  watch(isOpen, (value) => {
    scrollLock.value = value
  })
})

// Click outside to close
onClickOutside(modalContainer, () => {
  if (isOpen.value) {
    isOpen.value = false
  }
})

// Auto-focus management
watch(isOpen, (value) => {
  if (value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Composable for pure search logic with Fuse.js
function useSearchResults() {
  const query = ref('')
  const isSearching = ref(false)

  // Fetch search data
  const { data: searchData } = useAsyncData('search-data', () =>
    queryCollection('blog')
      .orWhere(query =>
        query
          .where('draft', '<>', true)
          .where('draft', 'IS NULL'),
      )
      .all())

  // Initialize Fuse.js
  const fuse = computed(() => {
    if (!searchData.value)
      return null
    return new Fuse(searchData.value, {
      keys: ['title', 'description'],
      threshold: 0.3,
      includeScore: true,
    })
  })

  // Debounced search results computation
  const results = ref<any[]>([])
  const debouncedSearch = useDebounceFn(() => {
    if (!query.value || !fuse.value) {
      results.value = []
      isSearching.value = false
      return
    }
    results.value = fuse.value.search(query.value).slice(0, 8)
    isSearching.value = false
  }, 300)

  // Watch query changes with debouncing
  watch(query, () => {
    isSearching.value = true
    debouncedSearch()
  })

  // Highlight matching text
  function highlightText(text: string, searchQuery: string): string {
    if (!searchQuery || !text)
      return text

    // Escape special regex characters in the search query
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')

    return text.replace(regex, '<mark>$1</mark>')
  }

  return {
    query,
    results,
    isSearching,
    highlightText,
  }
}

// Composable for keyboard navigation and selection
function useSearchNavigation(results: Ref<any[]>, onSelect: (path: string) => void) {
  const selectedIndex = ref(0)

  // Reset selected index when results change
  watch(results, () => {
    selectedIndex.value = 0
  })

  function navigateUp() {
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  }

  function navigateDown() {
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  }

  function selectCurrent() {
    const selected = results.value[selectedIndex.value]
    if (selected) {
      // Nuxt Content v3 uses 'path' property
      const path = selected.item.path
      if (path) {
        onSelect(path)
      }
    }
  }

  return {
    selectedIndex,
    navigateUp,
    navigateDown,
    selectCurrent,
  }
}

// Composable for section scrolling with element detection
function useScrollToSection() {
  async function scrollToSection(elementId: string) {
    // Small delay to ensure layout is complete
    await nextTick()

    const element = document.getElementById(elementId)
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`)
      return
    }

    // Use VueUse's scrollIntoView for smooth scrolling
    const { y } = useWindowScroll()
    const rect = element.getBoundingClientRect()
    const absoluteTop = rect.top + y.value
    const targetY = Math.max(0, absoluteTop - 120) // 120px offset for header

    // Smooth scroll to target position
    y.value = targetY

    // Add visual feedback
    element.classList.add('search-highlight')
    setTimeout(() => {
      element.classList.remove('search-highlight')
    }, 2000)
  }

  // Wait for element with intersection observer
  async function waitForElement(elementId: string, timeout = 2000): Promise<HTMLElement | null> {
    const existingElement = document.getElementById(elementId)
    if (existingElement)
      return existingElement

    return new Promise((resolve) => {
      let observer: MutationObserver

      const timeoutId = setTimeout(() => {
        observer?.disconnect()
        console.warn(`Element with ID "${elementId}" not found after ${timeout}ms`)
        resolve(null)
      }, timeout)

      observer = new MutationObserver((_, obs) => {
        const element = document.getElementById(elementId)
        if (element) {
          clearTimeout(timeoutId)
          obs.disconnect()
          resolve(element)
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })
    })
  }

  return {
    scrollToSection,
    waitForElement,
  }
}

// Initialize composables
const { query, results, highlightText } = useSearchResults()
const { scrollToSection, waitForElement } = useScrollToSection()

// Navigate to result handler
async function navigateToResult(path: string) {
  isOpen.value = false
  const route = useRoute()

  // Check if path contains a hash (section anchor)
  if (path.includes('#')) {
    const hashIndex = path.lastIndexOf('#')
    const pagePath = path.substring(0, hashIndex)
    const hash = path.substring(hashIndex + 1)

    // Remove .md extension - path should already be properly formatted
    const cleanPath = pagePath.replace(/\.md$/, '')

    // Check if we're already on the same page
    if (route.path === cleanPath) {
      // Just scroll to the section
      await scrollToSection(hash)
    }
    else {
      // Navigate to the page with hash in URL
      await navigateTo(`${cleanPath}#${hash}`)

      // Wait for element to appear and scroll
      const element = await waitForElement(hash)
      if (element) {
        await scrollToSection(hash)
      }
    }
  }
  else {
    // No hash, just navigate to the page
    // Remove .md extension - path should already be properly formatted
    const cleanPath = path.replace(/\.md$/, '')
    await navigateTo(cleanPath)
  }
}

const { selectedIndex, navigateUp, navigateDown, selectCurrent } = useSearchNavigation(results, navigateToResult)

// Virtual list for performance with large result sets
const itemHeight = 80 // Approximate height of each search result item
const { list, containerProps, wrapperProps } = useVirtualList(
  results,
  {
    itemHeight,
    overscan: 5,
  },
)

// Scroll selected item into view (handled by virtual list)
function scrollToSelected() {
  // Virtual list handles scrolling automatically
  // We can use the containerProps ref if needed for custom scrolling
}

// Watch selected index changes to scroll
watch(selectedIndex, scrollToSelected)

// Reset when modal opens/closes
watch(isOpen, (newValue) => {
  if (newValue) {
    query.value = ''
  }
})

// Keyboard navigation
onKeyStroke('ArrowDown', (e) => {
  if (!isOpen.value || !results.value.length)
    return
  e.preventDefault()
  navigateDown()
})

onKeyStroke('ArrowUp', (e) => {
  if (!isOpen.value || !results.value.length)
    return
  e.preventDefault()
  navigateUp()
})

onKeyStroke('Enter', () => {
  if (!isOpen.value || !results.value.length)
    return
  selectCurrent()
})
</script>

<template>
  <BaseModal v-model="isOpen" position="center">
    <div ref="modalContainer" class="search-container">
      <div class="search-header">
        <BaseIcon name="ph:magnifying-glass" class="search-icon" />
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Search blog posts..."
          class="search-input"
          @keydown.escape="isOpen = false"
        >
        <BaseKbd keys="ESC" class="search-hint" />
      </div>

      <div
        v-if="results.length > 0"
        v-bind="containerProps"
        class="search-results"
      >
        <div v-bind="wrapperProps">
          <button
            v-for="{ data: result, index } in list"
            :key="result.item.path"
            :data-search-item="index"
            class="search-result" :class="[{ 'search-result-active': index === selectedIndex }]"
            @click="navigateToResult(result.item.path)"
            @mouseenter="selectedIndex = index"
          >
            <div class="search-result-content">
              <h3 class="search-result-title" v-html="highlightText(result.item.title, query)" />
              <p class="search-result-text" v-html="highlightText(`${result.item.description?.slice(0, 150) || ''}...`, query)" />
            </div>
            <BaseIcon
              v-if="index === selectedIndex"
              name="ph:arrow-right"
              class="search-result-arrow"
            />
          </button>
        </div>
      </div>

      <div v-else-if="query && results.length === 0" class="search-empty">
        <p class="text-muted">
          No results found for "{{ query }}"
        </p>
      </div>

      <div v-else class="search-footer">
        <span class="search-footer-hint">
          <BaseKbd :keys="['↑', '↓']" /> to navigate
        </span>
        <span class="search-footer-hint">
          <BaseKbd keys="Enter" /> to select
        </span>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
.search-container {
  @apply w-full;
}

.search-header {
  @apply flex items-center gap-3 p-4 border-b border-border;
}

.search-icon {
  @apply w-5 h-5 text-muted flex-shrink-0;
}

.search-input {
  @apply flex-1 bg-transparent outline-none text-text placeholder-muted;
}

.search-hint {
  @apply ml-2;
}

.search-results {
  @apply max-h-96 overflow-y-auto;
}

.search-result {
  @apply w-full text-left px-4 py-3 hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors flex items-center justify-between gap-3;
}

.search-result-active {
  @apply bg-brand-50 dark:bg-brand-900;
}

.search-result-content {
  @apply flex-1 min-w-0;
}

.search-result-title {
  @apply text-text font-medium truncate;
}

.search-result-text {
  @apply text-sm text-muted line-clamp-2 mt-1;
}

.search-result-arrow {
  @apply w-4 h-4 text-muted flex-shrink-0;
}

.search-empty {
  @apply px-4 py-8 text-center;
}

.search-footer {
  @apply flex items-center justify-center gap-4 px-4 py-3 border-t border-border text-xs text-muted;
}

.search-footer-hint {
  @apply flex items-center gap-1;
}

/* Highlighted search matches */
.search-result-title :deep(mark),
.search-result-text :deep(mark) {
  background-color: oklch(var(--brand-400) / 0.3);
  color: inherit;
  padding: 0 0.125rem;
  border-radius: 0.125rem;
  font-weight: 600;
}

.dark .search-result-title :deep(mark),
.dark .search-result-text :deep(mark) {
  background-color: oklch(var(--brand-600) / 0.3);
}

.search-result-active .search-result-title :deep(mark),
.search-result-active .search-result-text :deep(mark) {
  background-color: oklch(var(--brand-500) / 0.4);
}

/* Highlight animation for scrolled-to elements */
:global(.search-highlight) {
  animation: highlight-fade 2s ease-out;
}

@keyframes highlight-fade {
  0% {
    background-color: oklch(var(--brand-400) / 0.3);
    outline: 2px solid oklch(var(--brand-500) / 0.5);
    outline-offset: 4px;
  }
  100% {
    background-color: transparent;
    outline: 2px solid transparent;
    outline-offset: 4px;
  }
}
</style>
