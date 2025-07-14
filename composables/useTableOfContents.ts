import { useIntersectionObserver, useMutationObserver, useScroll, watchDebounced } from '@vueuse/core'
import { trySafe, unwrapOr } from '~/utils/result'

function isElementVisible(element: HTMLElement, viewportHeight: number) {
  const rect = element.getBoundingClientRect()
  return rect.top < viewportHeight && rect.bottom > 0
}

function findVisibleHeadings(headings: HTMLElement[], viewportHeight: number) {
  return headings.filter(heading => isElementVisible(heading, viewportHeight))
}

function getLastHeadingId(headings: HTMLElement[]) {
  return headings.length > 0 ? headings[headings.length - 1].id : null
}

function calculateScrollOffset(element: HTMLElement, scrollY: number, offset: number) {
  const elementPosition = element.getBoundingClientRect().top
  return elementPosition + scrollY - offset
}

function getFirstIntersectingHeadingId(entries: IntersectionObserverEntry[]) {
  const visibleEntries = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio > 0)
  return visibleEntries.length > 0 ? visibleEntries[0].target.id : null
}

function getHeadingsFromDocument(selector: string): HTMLElement[] {
  const result = trySafe(() => Array.from(document.querySelectorAll<HTMLElement>(selector)))
  return unwrapOr(result, [])
}

// Constants
const SCROLL_CONFIG = {
  behavior: 'smooth' as const,
  offset: { bottom: 10 },
  throttle: 10,
}

const OBSERVER_CONFIG = {
  rootMargin: '-80px 0px -70% 0px',
  threshold: 0,
}

const HEADING_CONFIG = {
  scrollOffset: 80,
  selector: '.prose h2[id], .prose h3[id], .prose h4[id]',
}

const DEBOUNCE_DELAY = 50

export function useTableOfContents() {
  const activeId = ref<string>('')
  const headingElements = ref<HTMLElement[]>([])
  const observerCleanup = ref<(() => void) | null>(null)
  const isProgrammaticScroll = ref(false)

  const { y, arrivedState } = useScroll(
    typeof window !== 'undefined' ? window : undefined,
    SCROLL_CONFIG,
  )

  function updateActiveId(id: string | null) {
    if (id && id !== activeId.value)
      activeId.value = id
  }

  function activateLastHeading() {
    const lastId = getLastHeadingId(headingElements.value)
    if (lastId)
      updateActiveId(lastId)
  }

  function refreshHeadings() {
    const headings = getHeadingsFromDocument(HEADING_CONFIG.selector)
    headingElements.value = headings

    observerCleanup.value?.()

    if (headings.length === 0)
      return

    const { stop } = useIntersectionObserver(
      headingElements,
      (entries) => {
        const shouldSkip = arrivedState.bottom || isProgrammaticScroll.value
        if (shouldSkip) {
          if (arrivedState.bottom)
            activateLastHeading()
          return
        }

        const activeHeadingId = getFirstIntersectingHeadingId(entries)
        if (activeHeadingId)
          updateActiveId(activeHeadingId)
      },
      OBSERVER_CONFIG,
    )

    observerCleanup.value = stop

    const visibleHeadings = findVisibleHeadings(headings, window.innerHeight)
    if (visibleHeadings.length > 0)
      updateActiveId(visibleHeadings[0].id)
  }

  function scrollToHeading(id: string) {
    if (!import.meta.client)
      return

    const elementResult = trySafe(() => document.getElementById(id))
    const element = unwrapOr(elementResult, null)

    if (!element)
      return

    isProgrammaticScroll.value = true
    const offsetPosition = calculateScrollOffset(element, window.scrollY, HEADING_CONFIG.scrollOffset)
    y.value = offsetPosition

    setTimeout(() => {
      isProgrammaticScroll.value = false
    }, 500)
  }

  // Set up lifecycle hooks
  if (import.meta.client) {
    // Watch for bottom arrival state changes
    watchDebounced(
      () => arrivedState.bottom,
      (isAtBottom) => {
        if (isAtBottom && !isProgrammaticScroll.value)
          activateLastHeading()
      },
      { debounce: DEBOUNCE_DELAY },
    )

    onMounted(() => {
      refreshHeadings()

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
      observerCleanup.value?.()
    })
  }

  return {
    activeId: readonly(activeId),
    scrollToHeading,
  }
}
