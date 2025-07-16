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
    selected.value = (selected.value + 1) % max
  }

  function prev(max: number) {
    selected.value = selected.value === 0 ? max - 1 : selected.value - 1
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
