<script setup lang="ts">
const { tags } = defineProps<{
  /** Array of tag names to display */
  tags: string[]
}>()
</script>

<template>
  <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-3">
    <NuxtLink
      v-for="tag in tags"
      :key="tag"
      :to="`/tags/${encodeURIComponent(tag)}`"
      class="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
    >
      #{{ tag }}
    </NuxtLink>
  </div>
</template>
