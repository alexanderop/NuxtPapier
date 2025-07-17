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

// Initialize the command palette state
onMounted(() => {
  palette.open()
})

// Handle navigation
function handleNext() {
  palette.next(search.results.value.length)
}

function handlePrev() {
  palette.prev(search.results.value.length)
}

// Clean up the command palette state
onUnmounted(() => {
  palette.close()
})
</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    v-if="palette.isOpen.value"
    class="pt-[10vh] flex items-start inset-0 justify-center fixed z-50"
    role="dialog"
    aria-modal="true"
    aria-label="Search posts"
    tabindex="-1"
    @keydown.esc="handleClose"
  >
    <!-- Backdrop -->
    <div
      class="bg-black/50 inset-0 fixed"
      role="button"
      tabindex="0"
      aria-label="Close dialog"
      @click="handleClose"
      @keydown.enter="handleClose"
      @keydown.space="handleClose"
    />

    <!-- Panel -->
    <div class="max-w-2xl w-full relative">
      <!-- Search Input -->
      <div class="relative">
        <div class="pl-4 flex pointer-events-none items-center inset-y-0 left-0 absolute">
          <Icon name="iconamoon:search" class="text-muted-foreground size-5" />
        </div>
        <input
          v-model="query"
          type="text"
          class="text-foreground placeholder:text-muted-foreground pl-11 pr-4 outline-none border-0 rounded-t-lg bg-background h-14 w-full shadow-lg"
          placeholder="Search posts..."
          aria-label="Search posts"
          @keydown.down.prevent="handleNext"
          @keydown.up.prevent="handlePrev"
          @keydown.enter="handleSelect()"
          @keydown.esc="handleClose"
        >
      </div>

      <!-- Results -->
      <ul
        v-if="search.results.value.length > 0"
        class="py-2 rounded-b-lg bg-background max-h-[60vh] shadow-lg overflow-y-auto"
      >
        <li
          v-for="(result, index) in search.results.value"
          :key="result.id"
        >
          <a
            :href="result.path"
            class="px-4 py-3 flex gap-3 cursor-pointer transition-colors items-start"
            :class="{
              'bg-muted': palette.selected.value === index,
            }"
            @click.prevent="handleSelect(index)"
            @mouseenter="palette.select(index)"
            @focus="palette.select(index)"
          >
            <Icon
              name="lets-icons:file-dock-duotone"
              class="text-muted-foreground mt-0.5 shrink-0 size-5"
            />
            <div class="flex-1 min-w-0">
              <!-- Blog Title -->
              <div
                v-if="result.blogTitle"
                class="text-foreground text-sm font-medium"
                v-html="highlightSearchTerm(result.blogTitle, query)"
              />

              <!-- Heading (if it's different from blog title) -->
              <div
                v-if="result.heading"
                class="text-muted-foreground text-sm mt-0.5"
                v-html="highlightSearchTerm(result.heading, query)"
              />

              <!-- Content snippet -->
              <div
                v-if="result.content"
                class="text-muted-foreground text-xs mt-1 line-clamp-2"
                v-html="highlightSearchTerm(result.content, query)"
              />

              <!-- Category -->
              <div class="text-muted-foreground text-xs mt-1">
                {{ result.category }}
              </div>
            </div>
          </a>
        </li>
      </ul>

      <!-- No Results -->
      <div
        v-else-if="query && !search.loading.value"
        class="p-8 text-center rounded-b-lg bg-background shadow-lg"
      >
        <Icon name="iconamoon:search" class="text-muted-foreground mx-auto size-12" />
        <p class="text-muted-foreground text-sm mt-2">
          No results found for "{{ query }}"
        </p>
      </div>

      <!-- Loading -->
      <div
        v-else-if="search.loading.value"
        class="p-8 text-center rounded-b-lg bg-background shadow-lg"
      >
        <Icon name="svg-spinners:3-dots-fade" class="text-muted-foreground mx-auto size-8" />
      </div>
    </div>
  </div>
</template>
