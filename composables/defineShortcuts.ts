// code from https://ui.nuxt.com/composables/define-shortcuts
import type { MaybeRef } from 'vue'
import { useActiveElement, useDebounceFn, useEventListener } from '@vueuse/core'
import { computed, ref, toValue } from 'vue'
import { useKbd } from './useKbd'

type Handler = (e?: KeyboardEvent) => void

export interface ShortcutConfig {
  handler: Handler
  usingInput?: string | boolean
}

export interface ShortcutsConfig {
  [key: string]: ShortcutConfig | Handler | false | null | undefined
}

export interface ShortcutsOptions {
  chainDelay?: number
}

interface Shortcut {
  handler: Handler
  enabled: boolean
  chained: boolean
  key: string
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  altKey: boolean
}

const chainedShortcutRegex = /^[^-]+-[^-]+$/
const combinedShortcutRegex = /^[^_]+_[^_]+$/

export function extractShortcuts(items: Array<any> | Array<Array<any>>) {
  const shortcuts: Record<string, Handler> = {}

  function traverse(items: Array<any>) {
    for (const item of items) {
      if (item.kbds?.length && (item.onSelect || item.onClick)) {
        const shortcutKey = item.kbds.join('_')
        shortcuts[shortcutKey] = item.onSelect || item.onClick
      }
      if (item.children) {
        traverse(item.children.flat())
      }
      if (item.items) {
        traverse(item.items.flat())
      }
    }
  }

  traverse(items.flat())

  return shortcuts
}

export function defineShortcuts(config: MaybeRef<ShortcutsConfig>, options: ShortcutsOptions = {}) {
  const chainedInputs = ref<Array<string>>([])
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length)
  }
  const debouncedClearChainedInput = useDebounceFn(clearChainedInput, options.chainDelay ?? 800)

  const { macOS } = useKbd()
  const activeElement = useActiveElement()

  const usingInput = computed(() => {
    const tagName = activeElement.value?.tagName
    const contentEditable = activeElement.value?.contentEditable

    const usingInput = !!(tagName === 'INPUT' || tagName === 'TEXTAREA' || contentEditable === 'true' || contentEditable === 'plaintext-only')

    if (usingInput) {
      return ((activeElement.value as HTMLInputElement)?.name as string) || true
    }

    return false
  })

  const shortcutsData = computed<Array<Shortcut>>(() => {
    return Object.entries(toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null
      }

      let shortcut: Partial<Shortcut>

      if (key.includes('-') && key !== '-' && !key.includes('_') && !key.match(chainedShortcutRegex)?.length) {
        console.warn(`[Shortcut] Invalid key: "${key}"`)
      }

      if (key.includes('_') && key !== '_' && !key.match(combinedShortcutRegex)?.length) {
        console.warn(`[Shortcut] Invalid key: "${key}"`)
      }

      const chained = key.includes('-') && key !== '-' && !key.includes('_')
      if (chained) {
        shortcut = {
          key: key.toLowerCase(),
          metaKey: false,
          ctrlKey: false,
          shiftKey: false,
          altKey: false,
        }
      }
      else {
        const keySplit = key.toLowerCase().split('_').map(k => k)
        shortcut = {
          key: keySplit.filter(k => !['meta', 'command', 'ctrl', 'shift', 'alt', 'option'].includes(k)).join('_'),
          metaKey: keySplit.includes('meta') || keySplit.includes('command'),
          ctrlKey: keySplit.includes('ctrl'),
          shiftKey: keySplit.includes('shift'),
          altKey: keySplit.includes('alt') || keySplit.includes('option'),
        }
      }
      shortcut.chained = chained

      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false
        shortcut.ctrlKey = true
      }

      if (typeof shortcutConfig === 'function') {
        shortcut.handler = shortcutConfig
      }
      else if (typeof shortcutConfig === 'object') {
        shortcut = { ...shortcut, handler: shortcutConfig.handler }
      }

      if (!shortcut.handler) {
        console.warn('[Shortcut] Invalid value')
        return null
      }

      let enabled = true
      if (!(shortcutConfig as ShortcutConfig).usingInput) {
        enabled = !usingInput.value
      }
      else if (typeof (shortcutConfig as ShortcutConfig).usingInput === 'string') {
        enabled = usingInput.value === (shortcutConfig as ShortcutConfig).usingInput
      }
      shortcut.enabled = enabled

      return shortcut as Shortcut
    }).filter(Boolean) as Array<Shortcut>
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (!e.key) {
      return
    }

    const alphabeticalKey = /^[a-z]$/i.test(e.key)

    let chainedKey
    chainedInputs.value.push(e.key)

    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join('-')

      for (const shortcut of shortcutsData.value.filter(s => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue
        }

        if (shortcut.enabled) {
          e.preventDefault()
          shortcut.handler(e)
        }
        clearChainedInput()
        return
      }
    }

    for (const shortcut of shortcutsData.value.filter(s => !s.chained)) {
      if (e.key.toLowerCase() !== shortcut.key) {
        continue
      }
      if (e.metaKey !== shortcut.metaKey) {
        continue
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue
      }
      if (alphabeticalKey && e.shiftKey !== shortcut.shiftKey) {
        continue
      }

      if (shortcut.enabled) {
        e.preventDefault()
        shortcut.handler()
      }
      clearChainedInput()
      return
    }

    debouncedClearChainedInput()
  }

  return useEventListener('keydown', onKeyDown)
}
