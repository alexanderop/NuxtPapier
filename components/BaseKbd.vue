<script setup lang="ts">
// Props interface
interface Props {
  keys: string | string[]
}

// Props destructuring
const { keys } = defineProps<Props>()

// Computed properties
const keyArray = computed(() => {
  return Array.isArray(keys) ? keys : [keys]
})
</script>

<template>
  <kbd
    v-if="keyArray.length === 1"
    class="text-xs text-muted px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-800"
  >
    {{ keyArray[0] }}
  </kbd>
  <span
    v-else
    class="inline-flex gap-0.5 items-center"
  >
    <kbd
      v-for="(key, index) in keyArray"
      :key="index"
      class="text-xs text-muted px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-800"
    >
      {{ key }}
    </kbd>
  </span>
</template>
