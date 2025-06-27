import type { ShortcutsConfig } from './defineShortcuts'
import { defineShortcuts } from './defineShortcuts'

let shortcutManagerInstance: ReturnType<typeof createShortcutManager> | null = null

function createShortcutManager() {
  const registeredShortcuts = reactive<Record<string, ShortcutsConfig>>({})
  let cleanupFn: (() => void) | null = null

  const mergedShortcuts = computed(() => {
    const merged: ShortcutsConfig = {}

    Object.values(registeredShortcuts).forEach((shortcuts) => {
      Object.entries(shortcuts).forEach(([key, config]) => {
        if (config) {
          merged[key] = config
        }
      })
    })

    return merged
  })

  function registerShortcuts(id: string, shortcuts: MaybeRef<ShortcutsConfig>) {
    registeredShortcuts[id] = toValue(shortcuts)
    updateShortcuts()
  }

  function unregisterShortcuts(id: string) {
    delete registeredShortcuts[id]
    updateShortcuts()
  }

  function updateShortcuts() {
    if (cleanupFn) {
      cleanupFn()
      cleanupFn = null
    }

    if (Object.keys(mergedShortcuts.value).length > 0) {
      cleanupFn = defineShortcuts(mergedShortcuts)
    }
  }

  watch(mergedShortcuts, () => {
    updateShortcuts()
  }, { deep: true })

  updateShortcuts()

  return {
    registerShortcuts,
    unregisterShortcuts,
  }
}

export function useShortcutManager() {
  if (!shortcutManagerInstance) {
    shortcutManagerInstance = createShortcutManager()
  }

  return shortcutManagerInstance
}
