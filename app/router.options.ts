import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router'

const SCROLL_OFFSET_FOR_FIXED_HEADER = -80
const ELEMENT_VISIBILITY_TIMEOUT = 5000

// Helper functions using Result pattern
function findElement(selector: string): Result<Element, Error> {
  const element = document.querySelector(selector)
  return element ? ok(element) : err(new Error(`Element not found: ${selector}`))
}

function getVisibleElement(selector: string): Result<Element, Error> {
  const elementResult = findElement(selector)
  if (elementResult.isErr())
    return elementResult

  const element = elementResult.value
  const rect = element.getBoundingClientRect()
  const style = window.getComputedStyle(element)
  const isVisible = rect.height > 0
    && rect.width > 0
    && style.opacity !== '0'
    && style.visibility !== 'hidden'
  return isVisible
    ? ok(element)
    : err(new Error(`Element not visible: ${selector}`))
}

function scrollToElement(element: Element, offset: number = SCROLL_OFFSET_FOR_FIXED_HEADER): Result<void, Error> {
  const rect = element.getBoundingClientRect()
  const y = rect.top + window.pageYOffset + offset

  window.scrollTo({
    behavior: 'smooth',
    top: y,
  })

  return ok(undefined)
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
          const elementResult = findElement(to.hash)
          elementResult.match(
            (element) => {
              scrollToElement(element)
              resolve({})
            },
            () => {
              // Element not found, continue to next navigation logic
            },
          )
          if (elementResult.isOk())
            return
        }

        // Handle cross-page anchor navigation
        if (to.hash) {
          // Retry logic for element visibility
          const startTime = Date.now()

          const retryElementSearch = async (): Promise<void> => {
            while (Date.now() - startTime < ELEMENT_VISIBILITY_TIMEOUT) {
              const elementResult = getVisibleElement(to.hash)

              const found = elementResult.match(
                (element) => {
                  scrollToElement(element)
                  resolve({})
                  return true
                },
                () => false,
              )

              if (found)
                return

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
