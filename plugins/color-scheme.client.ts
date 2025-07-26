const STORAGE_KEY = 'nuxt-color-mode'
const THEME_ATTR = 'data-theme'

type ColorModePreference = 'light' | 'dark' | 'system'

export default defineNuxtPlugin(() => {
  // Initialize color mode state
  const initializeColorMode = () => {
    const stored = localStorage.getItem(STORAGE_KEY) ?? 'system'
    const isValidPreference = (val: string): val is ColorModePreference => {
      return ['light', 'dark', 'system'].includes(val)
    }
    const validStored: ColorModePreference = isValidPreference(stored) ? stored : 'system'
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const value = validStored === 'system' ? system : validStored

    return { preference: validStored, value }
  }

  // Set initial theme immediately to prevent flash
  if (import.meta.client) {
    const initial = initializeColorMode()
    document.documentElement.setAttribute(THEME_ATTR, initial.value)
  }

  // Create reactive state
  const state = useState<{ preference: ColorModePreference, value: string }>('color-mode', () => {
    if (import.meta.client) {
      return initializeColorMode()
    }
    return { preference: 'system', value: 'light' }
  })

  // Helper to update color mode
  const setColorMode = (pref: 'light' | 'dark' | 'system') => {
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const value = pref === 'system' ? system : pref

    state.value = { preference: pref, value }

    document.documentElement.setAttribute(THEME_ATTR, value)
    localStorage.setItem(STORAGE_KEY, pref)
  }

  // Keep HTML data-theme attribute in sync
  watchEffect(() => {
    if (import.meta.client) {
      document.documentElement.setAttribute(THEME_ATTR, state.value.value)
    }
  })

  // Keep data-theme attribute reactive
  watchEffect(() => {
    useHead({
      htmlAttrs: {
        'data-theme': state.value.value,
      },
    })
  })

  // Listen for system preference changes
  if (import.meta.client) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (state.value.preference === 'system') {
        const newValue = e.matches ? 'dark' : 'light'
        state.value = { ...state.value, value: newValue }
        document.documentElement.setAttribute(THEME_ATTR, newValue)
      }
    })

    // Listen for storage changes to sync between tabs
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY && e.newValue !== null) {
        if (e.newValue === 'light' || e.newValue === 'dark' || e.newValue === 'system') {
          setColorMode(e.newValue)
        }
      }
    })
  }

  // Create refs for reactive values
  const preference = computed({
    get: (): ColorModePreference => state.value.preference,
    set: (val: ColorModePreference) => setColorMode(val),
  })

  const value = computed(() => state.value.value)

  // Create a composable-like object to match the original API
  const colorMode = {
    preference,
    value,
  }

  return {
    provide: {
      $colorMode: colorMode,
      colorMode,
      // Also provide a useColorMode function for compatibility
      useColorMode: () => colorMode,
    },
  }
})
