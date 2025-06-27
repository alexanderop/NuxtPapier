import type { ShortcutsConfig } from './defineShortcuts'
import { defineShortcuts } from './defineShortcuts'

export function useGlobalShortcuts() {
  const router = useRouter()
  const isDark = useDark()

  // Search modal state
  const isSearchOpen = ref(false)

  // Help modal state
  const isHelpOpen = ref(false)
  
  // Theme customizer state
  const isThemeCustomizerOpen = ref(false)

  // Shortcuts configuration
  const shortcuts = computed<ShortcutsConfig>(() => ({
    // Search shortcuts
    'slash': () => {
      isSearchOpen.value = true
    },
    'meta_k': () => {
      isSearchOpen.value = true
    },

    // Navigation shortcuts
    'g-h': () => {
      router.push('/')
    },
    'g-b': () => {
      router.push('/blog')
    },
    'g-s': () => {
      isThemeCustomizerOpen.value = true
    },

    // Theme toggle
    'meta_d': () => {
      isDark.value = !isDark.value
    },

    // Help
    'shift_slash': () => {
      isHelpOpen.value = true
    },

    // Close modals
    'escape': () => {
      if (isSearchOpen.value) {
        isSearchOpen.value = false
      }
      if (isHelpOpen.value) {
        isHelpOpen.value = false
      }
      if (isThemeCustomizerOpen.value) {
        isThemeCustomizerOpen.value = false
      }
    },
  }))

  // Initialize shortcuts
  defineShortcuts(shortcuts)

  return {
    isSearchOpen,
    isHelpOpen,
    isThemeCustomizerOpen,
  }
}
