import { useStorage } from '@vueuse/core'
import { watch } from 'vue'

export function useTheme() {
  const brandHue = useStorage('theme-brand-hue', 275)
  const chromaMultiplier = useStorage('theme-chroma-multiplier', 1.1)

  const updateTheme = () => {
    if (import.meta.client) {
      const root = document.documentElement
      root.style.setProperty('--brand-hue', brandHue.value.toString())
      root.style.setProperty('--chroma-multiplier', chromaMultiplier.value.toString())
    }
  }

  const resetTheme = () => {
    brandHue.value = 275
    chromaMultiplier.value = 1.1
  }

  // Apply theme immediately when composable is used
  updateTheme()

  // Watch for changes and update theme
  watch([brandHue, chromaMultiplier], updateTheme, { immediate: true })

  return {
    brandHue,
    chromaMultiplier,
    updateTheme,
    resetTheme,
  }
}
