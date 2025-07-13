<script setup lang="ts">
const {
  results = [],
  selectedIndex = 0,
  query = '',
  highlightFn,
} = defineProps<{
  /** Search results */
  results?: readonly {
    id: string
    title: string
    blogTitle?: string
    heading?: string
    content?: string
    path: string
  }[]
  /** Selected result index */
  selectedIndex?: number
  /** Search query */
  query?: string
  /** Function to highlight search terms */
  highlightFn: (_text: string, _term: string) => string
}>()

defineEmits<{
  select: [index: number]
  hover: [index: number]
}>()
</script>

<template>
  <div class="pb-2 max-h-[60vh] overflow-y-auto">
    <button
      v-for="(result, index) in results"
      :key="result.id"
      type="button"
      class="text-sm px-4 py-2 text-left border-b border-[var(--color-border)] flex gap-2 w-full transition-colors items-center last:border-b-0 hover:bg-[var(--color-surface)]"
      :class="{ 'bg-[var(--color-primary)]/10': index === selectedIndex }"
      @click="$emit('select', index)"
      @mouseenter="$emit('hover', index)"
    >
      <BaseSearchResult
        :result="result"
        :query="query"
        :highlight-fn="highlightFn"
      />
    </button>
  </div>
</template>
