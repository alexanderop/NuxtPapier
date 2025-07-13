export function useClipboard() {
  const copied = ref(false)
  const supported = ref(false)

  onMounted(() => {
    supported.value = navigator && 'clipboard' in navigator
  })

  const copy = async (text: string) => {
    if (!supported.value) {
      console.warn('Clipboard API not supported')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      copied.value = true

      // Reset copied state after 2 seconds
      setTimeout(() => {
        copied.value = false
      }, 2000)

      return true
    }
    catch (error) {
      console.error('Failed to copy to clipboard:', error)
      return false
    }
  }

  return {
    copy,
    copied: readonly(copied),
    supported: readonly(supported),
  }
}
