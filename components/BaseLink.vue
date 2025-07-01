<script setup lang="ts">
const {
  href,
  title,
  external = true,
} = defineProps<{
  href: string
  title?: string
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
