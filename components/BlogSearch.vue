<script setup lang="ts">
import Fuse from 'fuse.js'

const isOpen = defineModel<boolean>()
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')
const searchResults = useTemplateRef<HTMLDivElement>('searchResults')

const { query, selectedIndex, results, navigateToResult, highlightText } = useSearch()

function useSearch() {
  const query = ref('')
  const selectedIndex = ref(0)

  // Fetch search data
  const { data: searchData } = useAsyncData('search-data', () =>
    queryCollectionSearchSections('blog'))

  // Initialize Fuse.js
  const fuse = computed(() => {
    if (!searchData.value)
      return null
    return new Fuse(searchData.value, {
      keys: ['title', 'content'],
      threshold: 0.3,
      includeScore: true,
    })
  })

  // Compute search results
  const results = computed(() => {
    if (!query.value || !fuse.value)
      return []
    return fuse.value.search(query.value).slice(0, 8)
  })

  // Navigate to result
  async function navigateToResult(path: string) {
    isOpen.value = false
    const route = useRoute()
    
    // Check if path contains a hash (section anchor)
    if (path.includes('#')) {
      const hashIndex = path.lastIndexOf('#')
      const pagePath = path.substring(0, hashIndex)
      const hash = path.substring(hashIndex + 1)
      
      // Extract just the path portion (remove /blog prefix if present)
      const cleanPath = pagePath.replace(/^\/blog/, '')
      const fullPath = `/blog${cleanPath}`
      
      // Check if we're already on the same page
      if (route.path === fullPath) {
        // Just scroll to the section
        await nextTick()
        await scrollToElement(hash)
      } else {
        // Navigate to the page with hash in URL
        await navigateTo(`${fullPath}#${hash}`)
        
        // Wait for route change and content to load
        await nextTick()
        
        // Wait for navigation to complete and content to render
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Try to scroll to the element
        const element = document.getElementById(hash)
        if (element) {
          await scrollToElement(hash)
        } else {
          // If element not found immediately, wait for dynamic content
          const observer = new MutationObserver((mutations, obs) => {
            const targetElement = document.getElementById(hash)
            if (targetElement) {
              obs.disconnect()
              scrollToElement(hash)
            }
          })
          
          // Observe the entire document for changes
          observer.observe(document.body, {
            childList: true,
            subtree: true
          })
          
          // Disconnect observer after timeout
          setTimeout(() => {
            observer.disconnect()
            console.warn(`Element with ID "${hash}" not found`)
          }, 2000)
        }
      }
    } else {
      // No hash, just navigate to the page
      const fullPath = path.startsWith('/blog') ? path : `/blog${path}`
      await navigateTo(fullPath)
    }
  }
  
  // Helper function for smooth scrolling
  async function scrollToElement(elementId: string) {
    // Small delay to ensure layout is complete
    await nextTick()
    
    const element = document.getElementById(elementId)
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`)
      return
    }
    
    // Calculate the target position with offset for header
    const rect = element.getBoundingClientRect()
    const absoluteTop = rect.top + window.pageYOffset
    const targetY = Math.max(0, absoluteTop - 120) // 120px offset for header with min 0
    
    // Use native smooth scrolling
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    })
    
    // Add visual feedback by briefly highlighting the element
    element.classList.add('highlight-target')
    setTimeout(() => {
      element.classList.remove('highlight-target')
    }, 2000)
    element.classList.add('search-highlight')
    setTimeout(() => {
      element.classList.remove('search-highlight')
    }, 2000)
  }

  // Scroll selected item into view
  function scrollToSelected() {
    nextTick(() => {
      const items = searchResults.value?.querySelectorAll('[data-search-item]')
      if (items && items[selectedIndex.value]) {
        const selectedItem = items[selectedIndex.value] as HTMLElement
        if (selectedItem && searchResults.value) {
          // Calculate relative position within the container
          const itemTop = selectedItem.offsetTop - searchResults.value.offsetTop
          const itemBottom = itemTop + selectedItem.offsetHeight
          const containerHeight = searchResults.value.offsetHeight
          const scrollTop = searchResults.value.scrollTop
          
          // Only scroll if item is outside visible area
          if (itemTop < scrollTop) {
            searchResults.value.scrollTo({
              top: itemTop,
              behavior: 'smooth'
            })
          } else if (itemBottom > scrollTop + containerHeight) {
            searchResults.value.scrollTo({
              top: itemBottom - containerHeight,
              behavior: 'smooth'
            })
          }
        }
      }
    })
  }

  // Reset when modal opens/closes
  watch(isOpen, (newValue) => {
    if (newValue) {
      query.value = ''
      selectedIndex.value = 0
      nextTick(() => {
        searchInput.value?.focus()
      })
    }
  })

  // Keyboard navigation
  onKeyStroke('ArrowDown', (e) => {
    if (!isOpen.value || !results.value.length)
      return
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
    scrollToSelected()
  })

  onKeyStroke('ArrowUp', (e) => {
    if (!isOpen.value || !results.value.length)
      return
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    scrollToSelected()
  })

  onKeyStroke('Enter', () => {
    if (!isOpen.value || !results.value.length)
      return
    const selected = results.value[selectedIndex.value]
    if (selected) {
      navigateToResult(selected.item.id)
    }
  })

  // Reset selected index when results change
  watch(results, () => {
    selectedIndex.value = 0
  })

  // Highlight matching text
  function highlightText(text: string, searchQuery: string): string {
    if (!searchQuery || !text) return text
    
    // Escape special regex characters in the search query
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escapedQuery})`, 'gi')
    
    return text.replace(regex, '<mark>$1</mark>')
  }

  return {
    query,
    selectedIndex,
    results,
    navigateToResult,
    highlightText,
  }
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    isOpen.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="search">
      <div
        v-if="isOpen"
        class="search-overlay"
        @click="handleBackdropClick"
      >
        <div class="search-container">
          <div class="search-header">
            <Icon name="ph:magnifying-glass" class="search-icon" />
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              placeholder="Search blog posts..."
              class="search-input"
              @keydown.escape="isOpen = false"
            >
            <kbd class="search-hint">ESC</kbd>
          </div>

          <div
            v-if="results.length > 0"
            ref="searchResults"
            class="search-results"
          >
            <button
              v-for="(result, index) in results"
              :key="result.item.id"
              :data-search-item="index"
              class="search-result" :class="[{ 'search-result-active': index === selectedIndex }]"
              @click="navigateToResult(result.item.id)"
              @mouseenter="selectedIndex = index"
            >
              <div class="search-result-content">
                <h3 class="search-result-title" v-html="highlightText(result.item.title, query)" />
                <p class="search-result-text" v-html="highlightText(`${result.item.content?.slice(0, 150)}...`, query)" />
              </div>
              <Icon
                v-if="index === selectedIndex"
                name="ph:arrow-right"
                class="search-result-arrow"
              />
            </button>
          </div>

          <div v-else-if="query && results.length === 0" class="search-empty">
            <p class="text-muted">
              No results found for "{{ query }}"
            </p>
          </div>

          <div v-else class="search-footer">
            <span class="search-footer-hint">
              <kbd>↑</kbd> <kbd>↓</kbd> to navigate
            </span>
            <span class="search-footer-hint">
              <kbd>Enter</kbd> to select
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4;
}

.search-container {
  @apply w-full max-w-2xl bg-surface rounded-lg shadow-2xl overflow-hidden;
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
  @apply text-xs bg-brand-100 dark:bg-brand-800 text-muted px-2 py-1 rounded;
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

.search-footer-hint kbd {
  @apply bg-brand-100 dark:bg-brand-800 px-1.5 py-0.5 rounded text-xs;
}

/* Transitions */
.search-enter-active,
.search-leave-active {
  transition: opacity 0.2s ease;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
}

.search-enter-active .search-container,
.search-leave-active .search-container {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.search-enter-from .search-container,
.search-leave-to .search-container {
  transform: translateY(-20px);
  opacity: 0;
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
