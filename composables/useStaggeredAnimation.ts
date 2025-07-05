export function useStaggeredAnimation() {
  const animateElements = () => {
    const elements = document.querySelectorAll('.animate')
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('show')
      }, index * 100)
    })
  }

  onMounted(() => {
    // Small delay to ensure page transition completes first
    setTimeout(animateElements, 100)
  })

  // Re-run on route updates
  const route = useRoute()
  watch(() => route.path, () => {
    // Reset animations
    const elements = document.querySelectorAll('.animate')
    elements.forEach((element) => {
      element.classList.remove('show')
    })
    // Re-animate after a small delay
    setTimeout(animateElements, 100)
  })
}
