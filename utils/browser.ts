/**
 * Check if code is running in a browser environment
 * @returns true if running in browser, false if running on server (Node.js)
 */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * Safe browser globals that return undefined on server
 * These prevent "window is not defined" errors during SSR
 */
export const defaultWindow: Window | undefined = isClient ? window : undefined
export const defaultDocument: Document | undefined = isClient ? window.document : undefined
export const defaultNavigator: Navigator | undefined = isClient ? window.navigator : undefined
export const defaultLocation: Location | undefined = isClient ? window.location : undefined

/**
 * Create a no-op function for server-side
 * @returns Empty function
 */
export function noop() {
  return () => {}
}
