
// eslint-disable-next-line no-restricted-imports
import TheCommandPalette from '~/components/TheCommandPalette.vue'

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

  const openCommandPalette = () => {
    // eslint-disable-next-line ts/no-unsafe-argument
    modalStore.openModal(TheCommandPalette)
  }

  whenever(cmdK, openCommandPalette)
  whenever(ctrlK, openCommandPalette)

  return {
    keys,
  }
}
