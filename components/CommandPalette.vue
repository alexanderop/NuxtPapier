<script setup lang="ts">
const {
  query = '',
  searchResults = [],
  searchLoading = false,
  selectedIndex = 0,
  highlightFn,
  containerClass = 'max-w-[90vw] w-[600px]',
} = defineProps<{
  /** Search query */
  query?: string
  /** Search results */
  searchResults?: readonly {
    id: string
    title: string
    postTitle?: string
    heading?: string
    content?: string
    path: string
  }[]
  /** Loading state */
  searchLoading?: boolean
  /** Selected result index */
  selectedIndex?: number
  /** Function to highlight search terms */
  highlightFn: (_text: string, _term: string) => string
  /** Custom container CSS classes */
  containerClass?: string
}>()

const emit = defineEmits<{
  'close': []
  'select': [index: number]
  'hover': [index: number]
  'update:query': [value: string]
  'next': []
  'prev': []
}>()

const localQuery = computed({
  get: () => query,
  set: value => emit('update:query', value),
})

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

// Focus the container when component mounts
onMounted(() => {
  containerRef.value?.focus()
})

// Use VueUse's onKeyStroke for keyboard navigation
onKeyStroke(['ArrowDown', 'ArrowUp', 'Enter', 'Escape'], (e) => {
  e.preventDefault()

  switch (e.key) {
    case 'ArrowDown':
      emit('next')
      break
    case 'ArrowUp':
      emit('prev')
      break
    case 'Enter':
      emit('select', selectedIndex)
      break
    case 'Escape':
      emit('close')
      break
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] flex flex-col h-[500px] max-h-[70vh] shadow-2xl relative" :class="[
      containerClass,
    ]"
    role="combobox"
    aria-label="Command palette search"
    aria-expanded="true"
    aria-controls="command-results"
    aria-haspopup="listbox"
    tabindex="-1"
  >
    <!-- Search Input - Fixed at top -->
    <div class="flex-shrink-0">
      <CommandPaletteInput
        v-model="localQuery"
        @close="emit('close')"
      />
    </div>

    <!-- Results Container - Scrollable area -->
    <div id="command-results" class="flex-1 min-h-0 overflow-y-auto">
      <!-- Results -->
      <template v-if="searchResults.length > 0">
        <div class="text-xs text-[var(--color-text-muted)] tracking-wider px-4 py-2 bg-[var(--color-background)] uppercase top-0 sticky">
          Posts
        </div>
        <CommandPaletteResults
          :results="searchResults"
          :selected-index="selectedIndex"
          :query="query"
          :highlight-fn="highlightFn"
          @select="emit('select', $event)"
          @hover="emit('hover', $event)"
          @focus="emit('hover', $event)"
        />
      </template>

      <!-- Empty state placeholder to maintain height -->
      <div v-else class="flex h-full items-center justify-center">
        <!-- No results -->
        <div v-if="query && searchResults.length === 0 && !searchLoading" class="text-[var(--color-text-muted)] px-4 py-8 text-center">
          No results found for "{{ query }}"
        </div>

        <!-- Loading state -->
        <div v-else-if="searchLoading" class="text-[var(--color-text-muted)] px-4 py-8 text-center">
          Searching...
        </div>

        <!-- Initial state -->
        <div v-else class="text-[var(--color-text-muted)] px-4 py-8 text-center">
          Start typing to search...
        </div>
      </div>
    </div>
  </div>
</template>
