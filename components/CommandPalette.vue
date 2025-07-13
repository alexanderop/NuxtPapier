<script setup lang="ts">
const {
  query = '',
  searchResults = [],
  searchLoading = false,
  selectedIndex = 0,
  highlightFn,
  onClose,
  onSelect,
  onHover,
  onKeydown,
  onUpdateQuery,
} = defineProps<{
  /** Search query */
  query?: string
  /** Search results */
  searchResults?: readonly {
    id: string
    title: string
    blogTitle?: string
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
  /** Close handler */
  onClose: () => void
  /** Select handler */
  onSelect: (_index: number) => void
  /** Hover handler */
  onHover: (_index: number) => void
  /** Keydown handler */
  onKeydown: (_event: KeyboardEvent) => void
  /** Query update handler */
  onUpdateQuery: (_value: string) => void
}>()

const localQuery = computed({
  get: () => query,
  set: value => onUpdateQuery(value),
})
</script>

<template>
  <div
    class="border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] w-[600px] max-w-[90vw] shadow-2xl relative"
    @keydown="onKeydown"
  >
    <!-- Search Input -->
    <CommandPaletteInput
      v-model="localQuery"
      @close="onClose"
    />

    <!-- Results -->
    <template v-if="searchResults.length > 0">
      <div class="text-xs text-[var(--color-text-muted)] tracking-wider px-4 py-2 uppercase">
        Blog
      </div>
      <CommandPaletteResults
        :results="searchResults"
        :selected-index="selectedIndex"
        :query="query"
        :highlight-fn="highlightFn"
        @select="onSelect"
        @hover="onHover"
      />
    </template>

    <!-- No results -->
    <div v-if="query && searchResults.length === 0" class="text-[var(--color-text-muted)] px-4 py-8 text-center">
      No results found for "{{ query }}"
    </div>

    <!-- Loading state -->
    <div v-if="searchLoading" class="text-[var(--color-text-muted)] px-4 py-8 text-center">
      Searching...
    </div>
  </div>
</template>
