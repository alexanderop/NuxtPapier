<script setup lang="ts">
interface ColorMode {
  preference: WritableComputedRef<'light' | 'dark' | 'system', 'light' | 'dark' | 'system'>
  value: ComputedRef<string>
}

// Handle SSR - colorMode is only available on client
const nuxtApp = useNuxtApp()
const colorMode: ColorMode | undefined = nuxtApp.$colorMode

const isDarkMode = computed(() => {
  if (!colorMode)
    return false
  return colorMode.preference.value === 'dark'
})

function toggleMode() {
  if (!colorMode)
    return
  colorMode.preference.value = isDarkMode.value ? 'light' : 'dark'
}

const buttonText = computed(() => (isDarkMode.value ? 'Light Mode' : 'Dark Mode'))
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      :aria-label="`Switch to ${buttonText}`"
      :title="`Switch to ${buttonText}`"
      class="text-sm transition-colors hover:text-[var(--color-primary)]"
      @click="toggleMode"
    >
      {{ buttonText }}
    </button>
  </ClientOnly>
</template>
