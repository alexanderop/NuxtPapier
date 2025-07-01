<script setup lang="ts">
const {
  noPadding = false,
  ariaHidden = true,
} = defineProps<{
  noPadding?: boolean
  ariaHidden?: boolean
}>()
</script>

<template>
  <div :class="[noPadding ? 'mx-auto max-w-app' : 'container-app']">
    <hr class="border-[var(--color-border)]" :aria-hidden="ariaHidden">
  </div>
</template>
