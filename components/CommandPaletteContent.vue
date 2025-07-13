<script setup lang="ts">
const {
  query = '',
  searchResults = [],
  searchLoading = false,
  selectedIndex = 0,
  highlightFn,
} = defineProps<{
  /** Search query */
  query?: string
  /** Search results */
  searchResults?: Array<{
    id: string
    title: string
    blogTitle?: string
    heading?: string
    content?: string
    path: string
  }>
  /** Loading state */
  searchLoading?: boolean
  /** Selected result index */
  selectedIndex?: number
  /** Function to highlight search terms */
  highlightFn: (_text: string, _term: string) => string
}>()

const emit = defineEmits<{
  'update:query': [value: string]
  'close': []
  'select': [index: number]
  'hover': [index: number]
  'keydown': [event: KeyboardEvent]
}>()

const localQuery = computed({
  get: () => query,
  set: value => emit('update:query', value),
})
</script>

<template>
  <div
    class="border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] max-w-2xl w-full shadow-2xl relative"
    @keydown="$emit('keydown', $event)"
  >
    <!-- Search Input -->
    <CommandPaletteInput
      v-model="localQuery"
      @close="$emit('close')"
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
        @select="$emit('select', $event)"
        @hover="$emit('hover', $event)"
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
