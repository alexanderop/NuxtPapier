import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

const SCROLL_OFFSET_FOR_FIXED_HEADER = -80
const ELEMENT_VISIBILITY_TIMEOUT = 5000

// Helper functions
function findElement(selector: string): Element | null {
  return document.querySelector(selector)
}

function getVisibleElement(selector: string): Element | null {
  const element = findElement(selector)
  if (!element)
    return null

  const rect = element.getBoundingClientRect()
  const style = window.getComputedStyle(element)
  const isVisible = rect.height > 0
    && rect.width > 0
    && style.opacity !== '0'
    && style.visibility !== 'hidden'

  return isVisible ? element : null
}

function scrollToElement(element: Element, offset: number = SCROLL_OFFSET_FOR_FIXED_HEADER): void {
  const rect = element.getBoundingClientRect()
  const y = rect.top + window.pageYOffset + offset

  window.scrollTo({
    behavior: 'smooth',
    top: y,
  })
}

interface ScrollPosition {
  left?: number
  top?: number
}

export default {
  async scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, savedPosition: ScrollPosition | null) {
    return new Promise((resolve) => {
      const nuxtApp = useNuxtApp()

      // Hook into page lifecycle for proper timing
      nuxtApp.hooks.hookOnce('page:finish', async () => {
        await nextTick()

        // Handle browser back/forward
        if (savedPosition) {
          resolve(savedPosition)
          return
        }

        // Handle same-page anchor navigation
        if (to.path === from.path && to.hash) {
          const element = findElement(to.hash)
          if (element) {
            scrollToElement(element)
            resolve({})
            return
          }
        }

        // Handle cross-page anchor navigation
        if (to.hash) {
          // Retry logic for element visibility
          const startTime = Date.now()

          const retryElementSearch = async (): Promise<void> => {
            while (Date.now() - startTime < ELEMENT_VISIBILITY_TIMEOUT) {
              const element = getVisibleElement(to.hash)

              if (element) {
                scrollToElement(element)
                resolve({})
                return
              }

              // Wait a bit before retrying
              await new Promise(resolve => setTimeout(resolve, 100))
            }

            // Timeout - scroll to top
            resolve({ top: 0 })
          }

          retryElementSearch()
          return
        }

        // Default: scroll to top
        resolve({ behavior: 'smooth', top: 0 })
      })
    })
  },
}
