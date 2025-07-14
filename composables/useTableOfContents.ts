import { useEventListener, useIntersectionObserver, useTimeout, whenever } from '@vueuse/core'

export function useTableOfContents() {
  const activeId = ref<string>('')
  const headingElements = ref<HTMLElement[]>([])

  function checkIfAtBottom() {
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10
    if (isAtBottom && headingElements.value.length > 0) {
      const lastHeading = headingElements.value[headingElements.value.length - 1]
      activeId.value = lastHeading.id
    }
  }

  function setupObserver() {
    const headings = document.querySelectorAll<HTMLElement>('.prose h2[id], .prose h3[id], .prose h4[id]')
    headingElements.value = Array.from(headings)

    // Use a single observer for all headings
    useIntersectionObserver(
      headingElements,
      (entries) => {
        // Skip if we're at the bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10
        if (isAtBottom)
          return

        // Find the first intersecting heading
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0)
            activeId.value = entry.target.id
        })
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      },
    )

    // Set initial active heading
    if (headings.length > 0) {
      const visibleHeadings = Array.from(headings).filter((heading) => {
        const rect = heading.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })
      if (visibleHeadings.length > 0)
        activeId.value = visibleHeadings[0].id
    }
  }

  function scrollToHeading(id: string) {
    if (!import.meta.client)
      return

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

  // Add scroll listener for bottom detection
  if (import.meta.client) {
    useEventListener('scroll', checkIfAtBottom, { passive: true })

    // Use timeout to wait for content to render
    const ready = useTimeout(100)
    whenever(ready, setupObserver)
  }

  return {
    activeId: readonly(activeId),
    scrollToHeading,
  }
}
