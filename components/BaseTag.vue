<script setup lang="ts">
const { tag, variant = 'default', clickable = true } = defineProps<{
  /** The tag text to display */
  tag: string
  /** The size variant of the tag */
  variant?: 'default' | 'small'
  /** Whether the tag should be clickable and link to the tag page */
  clickable?: boolean
}>()

const tagUrl = useTagUrl(tag)

const tagClasses = computed(() => {
  const baseClasses = 'inline-flex items-center rounded-full transition-colors'
  const variantClasses = {
    default: 'px-3 py-1 text-sm',
    small: 'px-2 py-0.5 text-xs',
  }
  const interactiveClasses = clickable
    ? 'hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] cursor-pointer'
    : ''

  return `${baseClasses} ${variantClasses[variant]} ${interactiveClasses} bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]`
})
</script>

<template>
  <component
    :is="clickable ? 'NuxtLink' : 'span'"
    :to="clickable ? tagUrl : undefined"
    :class="tagClasses"
  >
    {{ tag }}
  </component>
</template>
