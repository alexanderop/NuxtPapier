<script setup lang="ts">
// ❌ Old pattern - ESLint will error with: vue35/no-with-defaults
// const props = withDefaults(
//   defineProps<{
//     title?: string
//     count?: number
//     isActive?: boolean
//   }>(),
//   {
//     title: 'Default Title',
//     count: 0,
//     isActive: false,
//   },
// )

// ✅ New Vue 3.5+ pattern - Reactive Props Destructure
const {
  title = 'Default Title',
  count = 0,
  isActive = false,
} = defineProps<{
  title?: string
  count?: number
  isActive?: boolean
}>()
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <p>Active: {{ isActive }}</p>
  </div>
</template>
