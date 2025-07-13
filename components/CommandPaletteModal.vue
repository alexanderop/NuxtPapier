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
  <BaseModal
    :z-index="50"
    content-class="pt-[10vh] items-start"
    @close="$emit('close')"
  >
    <CommandPalette
      v-model:query="localQuery"
      :search-results="searchResults"
      :search-loading="searchLoading"
      :selected-index="selectedIndex"
      :highlight-fn="highlightFn"
      container-class="max-w-2xl w-full"
      @close="$emit('close')"
      @select="$emit('select', $event)"
      @hover="$emit('hover', $event)"
      @keydown="$emit('keydown', $event)"
    />
  </BaseModal>
</template>
