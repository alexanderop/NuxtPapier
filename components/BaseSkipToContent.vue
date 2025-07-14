<script setup lang="ts">
const {
  href = '#main-content',
  text = 'Skip to content',
} = defineProps<{
  /** Target element ID to skip to */
  href?: string
  /** Text to display in the skip link */
  text?: string
}>()
</script>

<template>
  <a
    :href="href"
    class="text-[var(--color-primary)] px-3 py-2 bg-[var(--color-background)] transition-all start-16 absolute z-50 backdrop-blur-lg -top-full focus:top-4"
  >
    {{ text }}
  </a>
</template>
