import { expect, test } from './fixtures/nuxt'

test.describe('Critical Functionality Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/NuxtPapier/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigation menu works', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()

    const blogLink = nav.locator('a[href="/posts"]')
    await blogLink.click()
    await expect(page).toHaveURL('/posts')
  })

  test('blog posts list displays', async ({ page }) => {
    await page.goto('/posts')
    const articles = page.locator('article')
    await expect(articles.first()).toBeVisible()
    await expect(articles.first().locator('h2, h3')).toBeVisible()
  })

  test('individual blog post renders', async ({ page }) => {
    await page.goto('/posts')
    await page.locator('article').first().locator('a').first().click()
    await expect(page.locator('h1, h2').first()).toBeVisible()
    await expect(page.locator('.prose, [class*="prose"]').first()).toBeVisible()
  })

  test('theme toggle works', async ({ page }) => {
    await page.goto('/')
    const themeToggle = page.locator('button[aria-label*="Switch to" i]')

    const htmlElement = page.locator('html')
    const initialTheme = await htmlElement.getAttribute('data-theme') || ''

    await themeToggle.click()

    // Wait for theme change to complete
    await page.waitForTimeout(500)

    const newTheme = await htmlElement.getAttribute('data-theme') || ''
    expect(newTheme).not.toBe(initialTheme)
  })

  test('mobile menu works', async ({ page }) => {
    await page.setViewportSize({ height: 667, width: 375 })
    await page.goto('/')

    const menuToggle = page.locator('button[aria-label*="Menu" i]')
    await menuToggle.click()

    // Wait for menu to open and check the menu items list
    const menuItems = page.locator('#menu-items')
    await expect(menuItems).not.toHaveClass(/hidden/)
    await expect(page.locator('#menu-items a[href="/tags"]')).toBeVisible()
    await expect(page.locator('#menu-items a[href="/posts"]')).toBeVisible()
    await expect(page.locator('#menu-items a[href="/about"]')).toBeVisible()
  })

  test('404 page handles errors', async ({ page }) => {
    const response = await page.goto('/non-existent-page')
    expect(response?.status()).toBe(404)
    await expect(page.locator('h1')).toContainText(/404|not found/i)
  })

  test('SEO meta tags present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
  })

  test('RSS feed accessible', async ({ page }) => {
    const response = await page.goto('/rss.xml')
    expect(response?.status()).toBe(200)
    expect(response?.headers()['content-type']).toContain('xml')
  })

  test('tags functionality', async ({ page }) => {
    await page.goto('/tags')
    const tags = page.locator('a[href*="/tags/"]')
    await expect(tags.first()).toBeVisible()

    await tags.first().click()
    await expect(page).toHaveURL(/\/tags\/[^/]+$/)
    await expect(page.locator('article').first()).toBeVisible()
  })
})
