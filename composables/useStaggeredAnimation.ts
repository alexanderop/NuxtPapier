interface StaggeredAnimationOptions {
  /** CSS selector for elements to animate */
  selector?: string
  /** Delay between each element animation in ms */
  staggerDelay?: number
  /** Initial delay before starting animations in ms */
  initialDelay?: number
  /** CSS class to add for animation */
  animationClass?: string
}

export function useStaggeredAnimation(options: StaggeredAnimationOptions = {}) {
  // Configuration with defaults
  const {
    selector = '.animate',
    staggerDelay = 100,
    initialDelay = 100,
    animationClass = 'show',
  } = options

  // Primary State
  const isAnimating = ref(false)
  const animatedCount = ref(0)

  // State Metadata
  const error = ref<Error | null>(null)

  // Computed Properties
  const isComplete = computed(() =>
    animatedCount.value > 0 && !isAnimating.value,
  )

  // Methods
  const animateElements = () => {
    const result = fromThrowable(() => {
      error.value = null
      isAnimating.value = true
      animatedCount.value = 0

      const elements = document.querySelectorAll(selector)

      if (elements.length === 0) {
        isAnimating.value = false
        return
      }

      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add(animationClass)
          animatedCount.value++

          // Mark animation complete after last element
          if (animatedCount.value === elements.length) {
            isAnimating.value = false
          }
        }, index * staggerDelay)
      })
    })()

    result.match(
      () => {
        // Animation succeeded
      },
      (err) => {
        error.value = err instanceof Error ? err : new Error('Animation failed')
        isAnimating.value = false
      },
    )
  }

  const resetAnimations = () => {
    const result = fromThrowable(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => {
        element.classList.remove(animationClass)
      })
      animatedCount.value = 0
    })()

    result.match(
      () => {
        // Reset succeeded
      },
      (err) => {
        error.value = err instanceof Error ? err : new Error('Reset failed')
      },
    )
  }

  const replay = () => {
    resetAnimations()
    setTimeout(animateElements, initialDelay)
  }

  // Lifecycle Hooks
  onMounted(() => {
    setTimeout(animateElements, initialDelay)
  })

  // Watchers
  const route = useRoute()
  watchEffect(() => {
    if (route.path) {
      replay()
    }
  })

  // Return public API
  return {

    animatedCount: readonly(animatedCount),

    error: readonly(error),
    // State
    isAnimating: readonly(isAnimating),
    // Computed
    isComplete,
    // Methods
    replay,
    resetAnimations,
  }
}
