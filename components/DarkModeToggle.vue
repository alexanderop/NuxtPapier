<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    aria-label="Toggle dark mode"
    class="p-2 rounded-lg bg-surface transition-colors hover:bg-brand-200 dark:hover:bg-brand-800"
    @click="toggleDark()"
  >
    <Icon
      :name="isDark ? 'lucide:moon' : 'lucide:sun'"
      class="text-brand-600 h-5 w-5 dark:text-brand-400"
    />
  </button>
</template>
