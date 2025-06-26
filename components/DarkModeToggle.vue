<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

// Configure dark mode with dark as default
const isDark = useDark({
  initialValue: 'dark', // Set dark mode as default
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <BaseButton
    variant="ghost"
    :icon="isDark ? 'lucide:moon' : 'lucide:sun'"
    icon-only
    aria-label="Toggle dark mode"
    @click="toggleDark()"
  />
</template>
