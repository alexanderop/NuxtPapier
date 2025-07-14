function calculateScrollOffset(element: HTMLElement, scrollY: number, offset: number) {
  const elementPosition = element.getBoundingClientRect().top
  return elementPosition + scrollY - offset
}

function getHeadingsFromDocument(selector: string): HTMLElement[] {
  const result = fromThrowable(() =>
    Array.from(document.querySelectorAll<HTMLElement>(selector)),
  )()

  return result.match(
    elements => elements,
    () => [],
  )
}

// Constants
const SCROLL_CONFIG = {
  behavior: 'smooth' as const,
  offset: { bottom: 10 },
  throttle: 10,
}

const HEADING_CONFIG = {
  scrollOffset: 80,
  selector: '.prose h2[id], .prose h3[id], .prose h4[id]',
}

const PROGRAMMATIC_SCROLL_TIMEOUT = 800 // Slightly longer than typical smooth scroll

/**
 * Composable for managing table of contents functionality
 *
 * Tracks the active heading in a document based on scroll position and provides
 * smooth scrolling to specific headings. Automatically updates when content changes.
 *
 * Uses Intersection Observer API for performant scroll tracking without heavy scroll handlers.
 *
 * @example
 * ```vue
 * <script setup>
 * const { activeId, scrollToHeading } = useTableOfContents()
 * </script>
 *
 * <template>
 *   <nav>
 *     <a
 *       v-for="heading in headings"
 *       :key="heading.id"
 *       :class="{ active: activeId === heading.id }"
 *       @click="scrollToHeading(heading.id)"
 *     >
 *       {{ heading.text }}
 *     </a>
 *   </nav>
 * </template>
 * ```
 *
 * @returns Table of contents controls
 * @returns.activeId - Currently active heading ID (readonly)
 * @returns.scrollToHeading - Function to scroll to a heading by ID
 */
export function useTableOfContents() {
  // Primary State
  const activeId = ref<string>('')

  if (!isClient) {
    return {
      activeId: readonly(activeId),
      scrollToHeading: () => {},
    }
  }

  // State
  const headingElements = ref<HTMLElement[]>([])
  const observer = ref<IntersectionObserver | null>(null)
  const isProgrammaticScroll = ref(false)
  const visibleHeadings = ref<Set<string>>(new Set())

  // VueUse scroll helper
  const { y } = useScroll(window, SCROLL_CONFIG)

  // Methods
  function updateActiveHeading() {
    if (isProgrammaticScroll.value || headingElements.value.length === 0)
      return

    // Check if we're at the bottom of the page
    const scrollTop = window.scrollY
    const { scrollHeight } = document.documentElement
    const clientHeight = window.innerHeight
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10

    if (isAtBottom && headingElements.value.length > 0) {
      // At bottom - activate the last heading
      const lastHeading = headingElements.value[headingElements.value.length - 1]
      activeId.value = lastHeading.id
      return
    }

    // Not at bottom - find the best heading to highlight
    let selectedHeading: HTMLElement | null = null

    // Find the heading that's most appropriate to highlight
    for (const heading of headingElements.value) {
      if (visibleHeadings.value.has(heading.id)) {
        const rect = heading.getBoundingClientRect()
        // If heading is in the top portion of the viewport, select it
        if (rect.top < window.innerHeight * 0.3) {
          selectedHeading = heading
        }
      }
    }

    // If we found a heading, activate it
    if (selectedHeading) {
      activeId.value = selectedHeading.id
    }
    else if (visibleHeadings.value.size > 0) {
      // If no heading is in the top portion but some are visible,
      // activate the first visible one
      const firstVisible = headingElements.value.find(h => visibleHeadings.value.has(h.id))
      if (firstVisible) {
        activeId.value = firstVisible.id
      }
    }
  }

  function createObserver() {
    // Clean up existing observer
    if (observer.value) {
      observer.value.disconnect()
    }

    // Create observer that tracks all visible sections
    observer.value = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.value)
          return

        entries.forEach((entry) => {
          const { id } = entry.target

          if (entry.intersectionRatio > 0) {
            visibleHeadings.value.add(id)
          }
          else {
            visibleHeadings.value.delete(id)
          }
        })

        // Update which heading should be active
        updateActiveHeading()
      },
      {
        // Small negative bottom margin to trigger slightly before heading is fully out of view
        rootMargin: '0px 0px -10% 0px',
        threshold: [0, 0.1],
      },
    )

    // Observe all headings
    headingElements.value.forEach((heading) => {
      observer.value?.observe(heading)
    })
  }

  function refreshHeadings() {
    const headings = getHeadingsFromDocument(HEADING_CONFIG.selector)
    headingElements.value = headings

    if (headings.length === 0)
      return

    // Recreate observer with new headings
    createObserver()

    // Initial check
    updateActiveHeading()
  }

  function scrollToHeading(id: string) {
    const elementResult = fromThrowable(() => document.getElementById(id))()

    elementResult.match(
      (element) => {
        if (!element)
          return

        isProgrammaticScroll.value = true
        activeId.value = id // Immediately update the active ID

        const offsetPosition = calculateScrollOffset(
          element,
          window.scrollY,
          HEADING_CONFIG.scrollOffset,
        )

        y.value = offsetPosition

        setTimeout(() => {
          isProgrammaticScroll.value = false
        }, PROGRAMMATIC_SCROLL_TIMEOUT)
      },
      () => {
        // Element not found or error occurred
      },
    )
  }

  // Watch for scroll to update active heading (for bottom detection)
  watchThrottled(
    y,
    () => {
      updateActiveHeading()
    },
    { throttle: 50 },
  )

  // Lifecycle Hooks
  onMounted(() => {
    refreshHeadings()

    // Watch for DOM changes
    useMutationObserver(
      document.body,
      () => {
        refreshHeadings()
      },
      {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
      },
    )
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  // Return public API
  return {
    activeId: readonly(activeId),
    scrollToHeading,
  }
}
