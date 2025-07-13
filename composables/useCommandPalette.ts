// Global state for command palette
const isOpen = ref(false)
const selected = ref(0)

export function useCommandPalette() {
  // Methods
  function open() {
    isOpen.value = true
  }

  function close() {
    selected.value = 0
    isOpen.value = false
  }

  function next(max: number) {
    selected.value = Math.min(selected.value + 1, max - 1)
  }

  function prev() {
    selected.value = Math.max(selected.value - 1, 0)
  }

  function reset() {
    selected.value = 0
  }

  function select(index: number) {
    selected.value = index
  }

  // Return state and methods
  return {

    close,

    // State
    isOpen: readonly(isOpen),

    next,
    // Methods
    open,
    prev,
    reset,
    select,
    selected: readonly(selected),
  }
}
