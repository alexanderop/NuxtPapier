import type { ShortcutsConfig } from './defineShortcuts'

export function useGlobalShortcuts() {
  const router = useRouter()
  const isDark = useDark()
  const shortcutManager = useShortcutManager()

  // Search modal state
  const isSearchOpen = ref(false)

  // Help modal state
  const isHelpOpen = ref(false)

  // Theme customizer state
  const isThemeCustomizerOpen = ref(false)

  // Blog quick jump state
  const isBlogQuickJumpOpen = ref(false)

  // Shortcuts configuration
  const shortcuts = computed<ShortcutsConfig>(() => ({
    // Search shortcuts
    '/': () => {
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
    'g-j': () => {
      isBlogQuickJumpOpen.value = true
    },
    'g-r': async () => {
      // Navigate to most recent blog post
      const data = await queryCollection('blog')
        .order('date', 'DESC')
        .limit(1)
        .orWhere(query =>
          query
            .where('draft', '<>', true)
            .where('draft', 'IS NULL'),
        )
        .first()

      if (data) {
        const path = data.path.startsWith('/blog') ? data.path : `/blog${data.path}`
        router.push(path)
      }
    },

    // Theme toggle
    'meta_d': () => {
      isDark.value = !isDark.value
    },

    // Help - using ? directly is more reliable than shift_slash
    '?': () => {
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
      if (isBlogQuickJumpOpen.value) {
        isBlogQuickJumpOpen.value = false
      }
    },

    // Global scrolling
    'j': () => {
      window.scrollBy({ top: 100, behavior: 'smooth' })
    },
    'k': () => {
      window.scrollBy({ top: -100, behavior: 'smooth' })
    },
  }))

  // Register global shortcuts with the manager
  shortcutManager.registerShortcuts('global', shortcuts)

  return {
    isSearchOpen,
    isHelpOpen,
    isThemeCustomizerOpen,
    isBlogQuickJumpOpen,
  }
}
