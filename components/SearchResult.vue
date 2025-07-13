<script setup lang="ts">
const {
  result,
  query,
  highlightFn,
} = defineProps<{
  /** Search result object */
  result: {
    id: string
    title: string
    blogTitle?: string
    heading?: string
    content?: string
    path: string
  }
  /** Search query */
  query: string
  /** Function to highlight search terms */
  highlightFn: (_text: string, _term: string) => string
}>()
</script>

<template>
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
  <span class="text-[var(--color-text-muted)] truncate" v-html="highlightFn(result.content || '', query)" />
</template>
