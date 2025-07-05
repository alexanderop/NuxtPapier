<script setup lang="ts">
const colorMode = useColorMode()

const isDarkMode = computed(() => colorMode.preference === 'dark')

function toggleMode() {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark'
}

const buttonText = computed(() => isDarkMode.value ? 'Light Mode' : 'Dark Mode')
</script>

<template>
  <button
    type="button"
    :aria-label="`Switch to ${buttonText}`"
    :title="`Switch to ${buttonText}`"
    class="text-sm hover:text-[var(--color-primary)] transition-colors"
    @click="toggleMode"
  >
    {{ buttonText }}
  </button>
</template>
