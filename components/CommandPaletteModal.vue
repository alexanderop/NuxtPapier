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
    class="inset-0 fixed z-50 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <!-- Backdrop -->
    <div class="bg-black/60 inset-0 fixed backdrop-blur-sm dark:bg-black/80" />

    <!-- Modal Container -->
    <div class="px-4 pt-[10vh] flex min-h-screen items-start justify-center relative">
      <CommandPaletteContent
        v-model:query="localQuery"
        :search-results="searchResults"
        :search-loading="searchLoading"
        :selected-index="selectedIndex"
        :highlight-fn="highlightFn"
        @close="$emit('close')"
        @select="$emit('select', $event)"
        @hover="$emit('hover', $event)"
        @keydown="$emit('keydown', $event)"
      />
    </div>
  </div>
</template>
