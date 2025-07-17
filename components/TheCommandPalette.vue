<script setup lang="ts">
const palette = useCommandPalette()
const search = useSearch()
const modalStore = useModalStore()

const query = ref('')

// Debounced query value (300ms delay)
const debouncedQuery = refDebounced(query, 300)

// Sync debounced query with search composable
watchEffect(() => {
  search.search(debouncedQuery.value)
})

// Reset selected when results change
watchEffect(() => {
  if (search.results.value) {
    palette.reset()
  }
})

function handleClose() {
  palette.close()
  search.clear()
  query.value = ''
  modalStore.closeTopModal()
}

async function handleSelect(index?: number) {
  const i = index ?? palette.selected.value
  const item = search.results.value[i]
  if (item) {
    // Parse path and hash from the item path
    const [path, hash] = item.path.split('#')

    // Navigate to the page first
    try {
      await navigateTo(path)
    }
    catch {
      // Handle navigation failure silently
      return
    }

    // Close the palette
    handleClose()

    // If there's a hash, scroll to it after navigation
    if (hash) {
      // Wait for the page to fully render
      await nextTick()

      // Implement retry logic for dynamic content
      const scrollToAnchor = async (attempts = 0): Promise<boolean> => {
        const element = document.getElementById(hash)

        if (!element) {
          // Retry for lazy-loaded content
          if (attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 100))
            return scrollToAnchor(attempts + 1)
          }
          return false
        }

        // Use the same 80px offset as the table of contents
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({
          behavior: 'smooth',
          top: y,
        })
        return true
      }

      await scrollToAnchor()
    }
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(text: string): string {
  try {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
  catch {
    return text // fallback to original text if DOM operation fails
  }
}

function highlightSearchTerm(text: string, term: string) {
  if (!term)
    return escapeHtml(text)

  // First escape the HTML entities in the input text
  const escapedText = escapeHtml(text)
  const escapedTerm = escapeRegExp(term)
  const regex = new RegExp(`(${escapedTerm})`, 'gi')

  // Apply highlighting only to the escaped text
  return escapedText.replace(regex, '<mark class="bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-0.5 rounded">$1</mark>')
}

// Handle navigation
function handleNext() {
  palette.next(search.results.value.length)
}

function handlePrev() {
  palette.prev(search.results.value.length)
}

// Initialize the command palette state
onMounted(() => {
  palette.open()
})

// Clean up the command palette state
onUnmounted(() => {
  palette.close()
})
</script>

<template>
  <CommandPaletteModal
    v-if="palette.isOpen.value"
    :query="query"
    :search-results="search.results.value"
    :search-loading="search.loading.value"
    :selected-index="palette.selected.value"
    :highlight-fn="highlightSearchTerm"
    @close="handleClose"
    @select="handleSelect"
    @hover="palette.select"
    @next="handleNext"
    @prev="handlePrev"
    @update:query="(value: string) => query = value"
  />
</template>
