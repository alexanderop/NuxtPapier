export function useKeyboardShortcuts() {
  const modalStore = useModalStore()

  async function handleKeyDown(e: KeyboardEvent) {
    // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      const { default: TheCommandPalette } = await import('~/components/TheCommandPalette.vue')
      modalStore.openModal(TheCommandPalette)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  return {
    handleKeyDown,
  }
}
