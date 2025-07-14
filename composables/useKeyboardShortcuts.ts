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
    const importResult = await fromPromise(
      import('~/components/TheCommandPalette.vue'),
      error => (error instanceof Error ? error : new Error('Failed to import CommandPalette component')),
    )

    importResult.match(
      (module) => {
        modalStore.openModal((module).default as Component)
      },
      () => {
        // Import failed, handle silently
      },
    )
  }

  whenever(cmdK, openCommandPalette)
  whenever(ctrlK, openCommandPalette)

  return {
    keys,
  }
}
