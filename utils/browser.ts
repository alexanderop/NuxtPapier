/**
 * Check if code is running in a browser environment
 * @returns true if running in browser, false if running on server (Node.js)
 */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * Safe browser globals that return undefined on server
 * These prevent "window is not defined" errors during SSR
 */
export const defaultWindow = isClient ? window : undefined as Window | undefined
export const defaultDocument = isClient ? window.document : undefined as Document | undefined
export const defaultNavigator = isClient ? window.navigator : undefined as Navigator | undefined
export const defaultLocation = isClient ? window.location : undefined as Location | undefined

/**
 * Create a no-op function for server-side
 * @returns Empty function
 */
export function noop() {
  return () => {}
}
