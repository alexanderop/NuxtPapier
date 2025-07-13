export interface TocLink {
  id: string
  text: string
  depth?: number
  children?: TocLink[]
}

export function useTableOfContents() {
  const activeId = ref<string>('')
  const observer = shallowRef<IntersectionObserver | null>(null)
  const checkScroll = ref<(() => void) | null>(null)

  function observeHeadings() {
    if (import.meta.client) {
      // Track all headings and their positions
      const headingElements: Element[] = []

      const callback: IntersectionObserverCallback = (entries) => {
        // Check if we're at the bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10

        if (isAtBottom && headingElements.length > 0) {
          // If at bottom, highlight the last heading
          const lastHeading = headingElements[headingElements.length - 1]
          activeId.value = lastHeading.id
          return
        }

        // Otherwise, find the first visible heading or the one closest to the top
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            activeId.value = entry.target.id
          }
        })
      }

      // Create scroll handler
      checkScroll.value = () => {
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10

        if (isAtBottom && headingElements.length > 0) {
          const lastHeading = headingElements[headingElements.length - 1]
          activeId.value = lastHeading.id
        }
      }

      observer.value = new IntersectionObserver(callback, {
        rootMargin: '-80px 0px -70% 0px',
        threshold: [0],
      })

      // Wait for content to render with a small delay
      setTimeout(() => {
        const headings = document.querySelectorAll('.prose h2[id], .prose h3[id], .prose h4[id]')
        headings.forEach((heading) => {
          headingElements.push(heading)
          observer.value?.observe(heading)
        })

        // Add scroll listener for bottom detection
        if (checkScroll.value) {
          window.addEventListener('scroll', checkScroll.value, { passive: true })
        }

        // Set initial active heading
        if (headings.length > 0) {
          const visibleHeadings = Array.from(headings).filter((heading) => {
            const rect = heading.getBoundingClientRect()
            return rect.top < window.innerHeight && rect.bottom > 0
          })
          if (visibleHeadings.length > 0) {
            activeId.value = visibleHeadings[0].id
          }
        }
      }, 100)
    }
  }

  function scrollToHeading(id: string) {
    if (import.meta.client) {
      const element = document.getElementById(id)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - offset

        window.scrollTo({
          behavior: 'smooth',
          top: offsetPosition,
        })
      }
    }
  }

  onMounted(() => {
    observeHeadings()
  })

  onUnmounted(() => {
    observer.value?.disconnect()
    if (checkScroll.value) {
      window.removeEventListener('scroll', checkScroll.value)
    }
  })

  return {
    activeId: readonly(activeId),
    scrollToHeading,
  }
}
