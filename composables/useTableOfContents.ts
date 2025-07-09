export interface TocLink {
  id: string
  text: string
  depth?: number
  children?: TocLink[]
}

export function useTableOfContents() {
  const activeId = ref<string>('')
  const observer = shallowRef<IntersectionObserver | null>(null)

  function observeHeadings() {
    if (import.meta.client) {
      // Track visible headings
      const visibleHeadings = new Map<string, number>()

      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          if (entry.isIntersecting) {
            // Add to visible headings with its position
            visibleHeadings.set(id, entry.target.getBoundingClientRect().top)
          }
          else {
            // Remove from visible headings
            visibleHeadings.delete(id)
          }
        })

        // Find the heading closest to the top of the viewport
        if (visibleHeadings.size > 0) {
          let closestId = ''
          let closestDistance = Infinity

          visibleHeadings.forEach((top, id) => {
            const distance = Math.abs(top)
            if (distance < closestDistance) {
              closestDistance = distance
              closestId = id
            }
          })

          if (closestId) {
            activeId.value = closestId
          }
        }
      }

      observer.value = new IntersectionObserver(callback, {
        rootMargin: '-80px 0px -50% 0px',
        threshold: [0, 0.5, 1],
      })

      // Wait for content to render
      nextTick(() => {
        const headings = document.querySelectorAll('.prose h2[id], .prose h3[id], .prose h4[id]')
        headings.forEach(heading => observer.value?.observe(heading))
      })
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
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  onMounted(() => {
    observeHeadings()
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    activeId: readonly(activeId),
    scrollToHeading,
  }
}
