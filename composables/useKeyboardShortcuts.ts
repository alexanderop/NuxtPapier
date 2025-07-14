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

  const openCommandPalette = async () => {
    const { default: TheCommandPalette } = await import('~/components/TheCommandPalette.vue')
    modalStore.openModal(TheCommandPalette)
  }

  whenever(cmdK, openCommandPalette)
  whenever(ctrlK, openCommandPalette)

  return {
    keys,
  }
}
