<script setup lang="ts">
// Use composables
const palette = useCommandPalette()
const search = useSearch()
const modalStore = useModalStore()

// Local query state for v-model
const q = ref('')

// Sync local query with search composable
watch(q, (v) => {
  search.search(v)
})

// Reset selected when results change
watch(search.results, () => {
  palette.reset()
})

// Handle keyboard navigation
function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      palette.next(search.results.value.length)
      break
    case 'ArrowUp':
      e.preventDefault()
      palette.prev()
      break
    case 'Enter':
      e.preventDefault()
      handleSelect()
      break
    case 'Escape':
      e.preventDefault()
      handleClose()
      break
  }
}

function handleClose() {
  palette.close()
  search.clear()
  q.value = ''
  modalStore.closeTopModal()
}

async function handleSelect(index?: number) {
  const i = index ?? palette.selected.value
  const item = search.results.value[i]
  if (item) {
    // Parse path and hash from the item path
    const [path, hash] = item.path.split('#')

    // Navigate to the page first
    await navigateTo(path)

    // Close the palette
    handleClose()

    // If there's a hash, scroll to it after navigation
    if (hash) {
      // Wait for the page to fully render
      await nextTick()

      // Implement retry logic for dynamic content
      const scrollToAnchor = async (attempts = 0) => {
        const element = document.getElementById(hash)

        if (element) {
          // Use the same 80px offset as the table of contents
          const yOffset = -80
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

          window.scrollTo({
            top: y,
            behavior: 'smooth',
          })
          return true
        }

        // Retry for lazy-loaded content
        if (attempts < 20) {
          await new Promise(resolve => setTimeout(resolve, 100))
          return scrollToAnchor(attempts + 1)
        }

        return false
      }

      await scrollToAnchor()
    }
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
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
  <CommandPalette
    :query="q"
    :search-results="search.results.value"
    :search-loading="search.loading.value"
    :selected-index="palette.selected.value"
    :highlight-fn="highlightSearchTerm"
    @close="handleClose"
    @select="handleSelect"
    @hover="palette.select"
    @keydown="handleKeyDown"
    @update:query="(value: string) => q = value"
  />
</template>
