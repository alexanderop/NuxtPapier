import type { Page } from '@playwright/test'

export async function waitForHydration(page: Page) {
  // Wait for the page to not be the Nuxt loading page
  await page.waitForFunction(
    () => !document.title.includes('Starting Nuxt'),
    { timeout: 30000 },
  )

  // Wait a bit for the actual page to start loading
  await page.waitForTimeout(500)

  // Then wait for hydration
  await page.waitForFunction(() => {
    const nuxtApp = (window as any).__NUXT__
    return nuxtApp && nuxtApp.isHydrating === false
  }, { timeout: 10000 })
}

export async function toggleTheme(page: Page) {
  await page.keyboard.press('Shift+Alt+D')
  await page.waitForTimeout(300) // Wait for theme transition
}

export async function openCommandPalette(page: Page) {
  const isMac = process.platform === 'darwin'
  await page.keyboard.press(isMac ? 'Meta+K' : 'Control+K')
  await page.waitForSelector('[role="dialog"]', { state: 'visible' })
}

export async function closeCommandPalette(page: Page) {
  await page.keyboard.press('Escape')
  await page.waitForSelector('[role="dialog"]', { state: 'hidden' })
}

export async function expectMetaTag(page: Page, property: string, content: string) {
  const metaContent = await page.getAttribute(`meta[property="${property}"]`, 'content')
  return metaContent === content
}

export async function checkAccessibility(page: Page, selector = 'body') {
  // Basic accessibility checks
  const violations = await page.evaluate((sel) => {
    const element = document.querySelector(sel)
    if (!element)
      return []

    const issues: string[] = []

    // Check for images without alt text
    const images = element.querySelectorAll('img:not([alt])')
    if (images.length > 0) {
      issues.push(`${images.length} images without alt text`)
    }

    // Check for buttons without accessible text
    const buttons = element.querySelectorAll('button')
    buttons.forEach((btn) => {
      const text = btn.textContent?.trim()
      const ariaLabel = btn.getAttribute('aria-label')
      if (!text && !ariaLabel) {
        issues.push('Button without accessible text')
      }
    })

    // Check for links without accessible text
    const links = element.querySelectorAll('a')
    links.forEach((link) => {
      const text = link.textContent?.trim()
      const ariaLabel = link.getAttribute('aria-label')
      if (!text && !ariaLabel) {
        issues.push('Link without accessible text')
      }
    })

    return issues
  }, selector)

  return violations
}
