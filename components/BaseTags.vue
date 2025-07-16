<script setup lang="ts">
interface Props {
  /** Array of tag strings to display */
  tags: string[]
  /** The size variant of the tags */
  variant?: 'default' | 'small'
  /** Whether the tags should be clickable and link to tag pages */
  clickable?: boolean
  /** Maximum number of tags to display before showing +N more */
  limit?: number
}

const { tags, variant = 'default', clickable = true, limit } = defineProps<Props>()

const displayedTags = computed(() => {
  if (!limit || tags.length <= limit) {
    return tags
  }
  return tags.slice(0, limit)
})

const hasMore = computed(() => limit && tags.length > limit)
const moreCount = computed(() => tags.length - (limit || 0))
</script>

<template>
  <div class="flex flex-wrap gap-2 items-center">
    <BaseTag
      v-for="tag in displayedTags"
      :key="tag"
      :tag="tag"
      :variant="variant"
      :clickable="clickable"
    />
    <span
      v-if="hasMore"
      class="text-sm text-[var(--color-text-muted)]"
    >
      +{{ moreCount }} more
    </span>
  </div>
</template>
