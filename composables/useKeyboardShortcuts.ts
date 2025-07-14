import { useMagicKeys, whenever } from '@vueuse/core'

export function useKeyboardShortcuts() {
  const modalStore = useModalStore()
  const keys = useMagicKeys({
    onEventFired(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && e.type === 'keydown')
        e.preventDefault()
    },
    passive: false,
  })

  const cmdK = keys['cmd+k']
  const ctrlK = keys['ctrl+k']

  whenever(cmdK, async () => {
    const { default: TheCommandPalette } = await import('~/components/TheCommandPalette.vue')
    modalStore.openModal(TheCommandPalette)
  })

  whenever(ctrlK, async () => {
    const { default: TheCommandPalette } = await import('~/components/TheCommandPalette.vue')
    modalStore.openModal(TheCommandPalette)
  })

  return {
    keys,
  }
}
