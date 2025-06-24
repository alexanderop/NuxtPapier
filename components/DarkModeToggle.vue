<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
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
