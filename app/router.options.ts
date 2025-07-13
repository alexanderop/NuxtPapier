import type { RouterConfig } from '@nuxt/schema'

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
          const element = document.querySelector(to.hash)
          if (element) {
            // Use the same 80px offset as the table of contents
            const yOffset = -80
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

            window.scrollTo({
              top: y,
              behavior: 'smooth',
            })

            resolve({})
            return
          }
        }

        // Handle cross-page anchor navigation
        if (to.hash) {
          // Retry logic for dynamic content
          let retries = 0
          const maxRetries = 50

          const findElement = () => {
            const element = document.querySelector(to.hash)

            if (element) {
              // Check if element is visible
              const rect = element.getBoundingClientRect()
              if (rect.height > 0) {
                // Use the same 80px offset as the table of contents
                const yOffset = -80
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

                window.scrollTo({
                  top: y,
                  behavior: 'smooth',
                })

                resolve({})
                return
              }
            }

            if (retries < maxRetries) {
              retries++
              setTimeout(findElement, 100)
            }
            else {
              resolve({ top: 0 })
            }
          }

          findElement()
          return
        }

        // Default: scroll to top
        resolve({ top: 0, behavior: 'smooth' })
      })
    })
  },
}
