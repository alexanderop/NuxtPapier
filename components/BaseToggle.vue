<script setup lang="ts">
const colorMode = useColorMode()

const modes = [
  { value: 'light', icon: 'i-heroicons-sun', label: 'Light mode' },
  { value: 'dark', icon: 'i-heroicons-moon', label: 'Dark mode' },
  { value: 'system', icon: 'i-heroicons-computer-desktop', label: 'System preference' },
]

const currentMode = computed(() => modes.find(mode => mode.value === colorMode.preference))

function cycleMode() {
  const currentIndex = modes.findIndex(mode => mode.value === colorMode.preference)
  const nextIndex = (currentIndex + 1) % modes.length
  colorMode.preference = modes[nextIndex].value
}
</script>

<template>
  <button
    type="button"
    :aria-label="`Switch to ${currentMode?.label}`"
    :title="currentMode?.label"
    @click="cycleMode"
  >
    <Icon
      v-if="currentMode"
      :name="currentMode.icon"
      class="h-5 w-5"
    />
  </button>
</template>
