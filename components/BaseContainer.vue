<script setup lang="ts">
const {
  noPadding = false,
  maxWidth = 'max-w-7xl',
} = defineProps<{
  noPadding?: boolean
  maxWidth?: string
}>()
</script>

<template>
  <div class="mx-auto" :class="[noPadding ? '' : 'px-4', maxWidth]">
    <slot />
  </div>
</template>
