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
}>()

const emit = defineEmits<{
  'update:query': [value: string]
  'close': []
  'select': [index: number]
  'hover': [index: number]
  'next': []
  'prev': []
}>()

const localQuery = computed({
  get: () => query,
  set: value => emit('update:query', value),
})
</script>

<template>
  <BaseModal
    position="command-palette"
    @close="$emit('close')"
  >
    <CommandPalette
      v-model:query="localQuery"
      :search-results="searchResults"
      :search-loading="searchLoading"
      :selected-index="selectedIndex"
      :highlight-fn="highlightFn"
      container-class="w-[600px] max-w-[90vw] mx-auto"
      @close="$emit('close')"
      @select="$emit('select', $event)"
      @hover="$emit('hover', $event)"
      @focus="$emit('hover', $event)"
      @next="$emit('next')"
      @prev="$emit('prev')"
    />
  </BaseModal>
</template>
