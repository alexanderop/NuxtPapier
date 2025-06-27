<script setup lang="ts">
import { useKbd } from '~/composables/useKbd'

// Props interface
interface Props {
  keys: string | string[]
}

// Props destructuring
const { keys } = defineProps<Props>()

// Composables
const { getKbdKey } = useKbd()

// Computed properties
const keyArray = computed(() => {
  return Array.isArray(keys) ? keys : [keys]
})

const formattedKeys = computed(() => {
  return keyArray.value.map((key) => {
    // Handle space separately for chained shortcuts
    if (key === ' ') {
      return key
    }
    return getKbdKey(key.toLowerCase()) || key
  })
})
</script>

<template>
  <kbd
    v-if="formattedKeys.length === 1"
    class="text-xs text-muted px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-800"
  >
    {{ formattedKeys[0] }}
  </kbd>
  <span
    v-else
    class="inline-flex gap-0.5 items-center"
  >
    <kbd
      v-for="(key, index) in formattedKeys"
      :key="index"
      class="text-xs text-muted px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-800"
    >
      {{ key }}
    </kbd>
  </span>
</template>
