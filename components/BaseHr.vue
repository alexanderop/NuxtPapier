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
  <div class="max-w-app mx-auto" :class="[noPadding ? 'px-0' : 'px-4']">
    <hr class="border-border" :aria-hidden="ariaHidden">
  </div>
</template>
