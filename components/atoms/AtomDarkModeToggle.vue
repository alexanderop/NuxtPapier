<script setup lang="ts">
const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="text-muted p-2 rounded-lg bg-surface h-10 w-10 transition-all relative hover:bg-gray-200 dark:hover:bg-gray-700"
    aria-label="Toggle dark mode"
    @click="toggleColorMode"
  >
    <Icon
      :name="colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'"
      class="h-5 w-5"
    />
  </button>
</template>
