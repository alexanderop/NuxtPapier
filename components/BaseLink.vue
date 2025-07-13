<script setup lang="ts">
const {
  href,
  title,
  external = true,
} = defineProps<{
  /** The URL to link to */
  href: string
  /** Optional title attribute for accessibility */
  title?: string
  /** Whether to open the link in a new tab */
  external?: boolean
}>()
</script>

<template>
  <NuxtLink
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :title="title"
    class="group"
  >
    <slot />
  </NuxtLink>
</template>
