export default defineNuxtPlugin((nuxtApp) => {
  const { copy } = useClipboard()

  // Function to add anchor links to headings
  const addHeadingAnchors = () => {
    // Find all headings in prose content
    const headings = document.querySelectorAll('.prose h1[id], .prose h2[id], .prose h3[id], .prose h4[id], .prose h5[id], .prose h6[id]')

    headings.forEach((heading) => {
      // Skip if anchor already exists
      if (heading.querySelector('.heading-link'))
        return

      const id = heading.getAttribute('id')
      if (!id)
        return

      // Create anchor link
      const anchor = document.createElement('a')
      anchor.href = `#${id}`
      anchor.className = 'heading-link'
      anchor.innerHTML = '#'
      anchor.setAttribute('aria-label', `Copy link to ${heading.textContent}`)

      // Handle click to copy link
      anchor.addEventListener('click', async (e) => {
        e.preventDefault()

        const url = `${window.location.origin}${window.location.pathname}#${id}`
        const success = await copy(url)

        if (success) {
          anchor.classList.add('copied')
          setTimeout(() => {
            anchor.classList.remove('copied')
          }, 2000)
        }
      })

      heading.appendChild(anchor)
    })
  }

  // Add anchors after page navigation
  nuxtApp.hook('page:finish', () => {
    setTimeout(addHeadingAnchors, 100)
  })

  // Also add anchors on mount for initial load
  nuxtApp.hook('app:mounted', () => {
    setTimeout(addHeadingAnchors, 100)
  })
})
