<script setup lang="ts">
const {
  open = false,
} = defineProps<{
  open?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

// Use composables
const palette = useCommandPalette()
const search = useSearch()

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
  emit('close')
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

function highlightSearchTerm(text: string, term: string) {
  if (!term)
    return text

  const escapedTerm = escapeRegExp(term)
  const regex = new RegExp(`(${escapedTerm})`, 'gi')
  return text.replace(regex, '<mark class="bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-0.5 rounded">$1</mark>')
}

// Focus management
const modal = ref<HTMLElement>()

onMounted(() => {
  if (open && modal.value) {
    const input = modal.value.querySelector('input')
    input?.focus()
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

watch(() => open, (newOpen) => {
  document.body.style.overflow = newOpen ? 'hidden' : ''

  if (newOpen) {
    palette.open()
    nextTick(() => {
      const input = modal.value?.querySelector('input')
      input?.focus()
    })
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="inset-0 fixed z-50 overflow-y-auto"
        @click.self="handleClose"
      >
        <!-- Backdrop -->
        <div class="bg-black/60 inset-0 fixed backdrop-blur-sm dark:bg-black/80" />

        <!-- Modal -->
        <div class="px-4 pt-[10vh] flex min-h-screen items-start justify-center relative">
          <div
            ref="modal"
            class="border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] max-w-2xl w-full shadow-2xl relative"
            @keydown="handleKeyDown"
          >
            <!-- Search Input -->
            <div class="border-b border-[var(--color-border)] flex items-center">
              <Icon
                name="i-heroicons-magnifying-glass"
                class="text-[var(--color-text-muted)] ml-4 h-5 w-5"
              />
              <input
                v-model="q"
                type="text"
                placeholder="Type to search..."
                class="text-[var(--color-text)] px-4 py-4 bg-transparent flex-1 placeholder:text-[var(--color-text-muted)] focus:outline-none"
              >
              <button
                type="button"
                class="text-[var(--color-text-muted)] p-4 transition-colors hover:text-[var(--color-text)]"
                @click="handleClose"
              >
                <Icon name="i-heroicons-x-mark" class="h-5 w-5" />
              </button>
            </div>

            <!-- Results -->
            <div v-if="search.results.value.length > 0" class="max-h-[60vh] overflow-y-auto">
              <div class="text-xs text-[var(--color-text-muted)] tracking-wider px-4 py-2 uppercase">
                Blog
              </div>
              <div class="pb-2">
                <button
                  v-for="(result, index) in search.results.value"
                  :key="result.id"
                  type="button"
                  class="text-sm px-4 py-2 text-left border-b border-[var(--color-border)] flex gap-2 w-full transition-colors items-center last:border-b-0 hover:bg-[var(--color-surface)]"
                  :class="{ 'bg-[var(--color-primary)]/10': index === palette.selected.value }"
                  @click="handleSelect(index)"
                  @mouseenter="palette.select(index)"
                >
                  <!-- Blog Title -->
                  <span class="text-[var(--color-text)] font-medium shrink-0">
                    {{ result.blogTitle || result.title }}
                  </span>

                  <!-- Separator -->
                  <span class="text-[var(--color-text-muted)]">&gt;</span>

                  <!-- Heading (if exists) -->
                  <template v-if="result.heading">
                    <span class="text-[var(--color-text)] shrink-0">
                      {{ result.heading }}
                    </span>
                    <span class="text-[var(--color-text-muted)]">&gt;</span>
                  </template>

                  <!-- Content preview -->
                  <span class="text-[var(--color-text-muted)] truncate" v-html="highlightSearchTerm(result.content || '', q)" />
                </button>
              </div>
            </div>

            <!-- No results -->
            <div v-if="q && search.results.value.length === 0" class="text-[var(--color-text-muted)] px-4 py-8 text-center">
              No results found for "{{ q }}"
            </div>

            <!-- Loading state -->
            <div v-if="search.loading.value" class="text-[var(--color-text-muted)] px-4 py-8 text-center">
              Searching...
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
