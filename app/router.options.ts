import type { RouterConfig } from '@nuxt/schema'

// Helper functions using Result pattern
function findElement(selector: string): Result<Element> {
  const element = document.querySelector(selector)
  return element ? ok(element) : err(new Error(`Element not found: ${selector}`))
}

function getVisibleElement(selector: string): Result<Element> {
  const elementResult = findElement(selector)
  if (!isOk(elementResult))
    return elementResult

  const rect = elementResult.value.getBoundingClientRect()
  return rect.height > 0
    ? ok(elementResult.value)
    : err(new Error(`Element not visible: ${selector}`))
}

function scrollToElement(element: Element, offset: number = -80): Result<void> {
  const rect = element.getBoundingClientRect()
  const y = rect.top + window.pageYOffset + offset

  window.scrollTo({
    behavior: 'smooth',
    top: y,
  })

  return ok(undefined)
}

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
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
          if (isOk(elementResult)) {
            scrollToElement(elementResult.value)
            resolve({})
            return
          }
        }

        // Handle cross-page anchor navigation
        if (to.hash) {
          // Use VueUse's until for cleaner retry logic
          const elementRef = ref<Result<Element>>(err(new Error('Element not found')))
          const isVisible = computed(() => {
            const result = getVisibleElement(to.hash)
            elementRef.value = result
            return isOk(result)
          })

          const waitResult = await until(isVisible).toBe(true, { timeout: 5000 }).then(() => ok(undefined)).catch(() => err(new Error('Timeout waiting for element')))

          if (isOk(waitResult)) {
            const elementResult = unref(elementRef)
            if (isOk(elementResult)) {
              scrollToElement(elementResult.value)
              resolve({})
              return
            }
          }

          // Timeout or error - scroll to top
          resolve({ top: 0 })
          return
        }

        // Default: scroll to top
        resolve({ behavior: 'smooth', top: 0 })
      })
    })
  },
}
