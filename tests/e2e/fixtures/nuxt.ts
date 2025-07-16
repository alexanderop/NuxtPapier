import { test as base } from '@playwright/test'
import { waitForHydration } from '../utils/helpers'

export const test = base.extend({
  nuxtPage: async ({ page }, use) => {
    // Navigate to home and wait for Nuxt to be ready
    await page.goto('/')
    await waitForHydration(page)

    await use(page)
  },

  page: async ({ page }, use) => {
    // Add common page setup here
    page.on('pageerror', (error) => {
      console.error('Page error:', error)
    })

    // Log console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Console error:', msg.text())
      }
    })

    await use(page)
  },
})

export { expect } from '@playwright/test'
