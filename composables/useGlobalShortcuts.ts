export function useGlobalShortcuts() {
  const activeElement = useActiveElement()

  // Check if the active element is an input or textarea
  const isInputActive = computed(() => {
    const tagName = activeElement.value?.tagName
    return tagName === 'INPUT' || tagName === 'TEXTAREA'
  })

  const keys = useMagicKeys({
    passive: false,
    onEventFired: (e) => {
      // Prevent default behavior for our shortcuts
      if (keys.slash?.value && !isInputActive.value) {
        e.preventDefault()
      }
    },
  })

  // Search modal state
  const isSearchOpen = ref(false)

  // Open search with '/' key when not in input
  whenever(
    computed(() => keys.slash?.value && !isInputActive.value),
    () => {
      isSearchOpen.value = true
    },
  )

  // Close search with 'Escape' key
  whenever(computed(() => keys.escape?.value || false), () => {
    if (isSearchOpen.value) {
      isSearchOpen.value = false
    }
  })

  return {
    isSearchOpen,
  }
}
