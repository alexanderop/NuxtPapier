export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Function to add security attributes to external links
    const secureExternalLinks = () => {
      const links = document.querySelectorAll('a[href^="http"]:not([href*="localhost"])')
      links.forEach((link) => {
        // Only add attributes if they don't already exist
        if (!link.hasAttribute('rel') || !link.getAttribute('rel')?.includes('noopener')) {
          const currentRel = link.getAttribute('rel') || ''
          const newRel = currentRel ? `${currentRel} noopener noreferrer` : 'noopener noreferrer'
          link.setAttribute('rel', newRel.trim())
        }

        // Set target="_blank" for external links if not already set
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank')
        }
      })
    }

    // Run on initial load
    secureExternalLinks()

    // Observe DOM changes to handle dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Debounce to avoid excessive calls
          setTimeout(secureExternalLinks, 100)
        }
      })
    })

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup on unmount
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        observer.disconnect()
      })
    }
  }
})
