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
  <div class="mx-auto max-w-7xl" :class="[noPadding ? 'px-0' : 'px-4']">
    <hr class="border-[var(--color-border)]" :aria-hidden="ariaHidden">
  </div>
</template>
