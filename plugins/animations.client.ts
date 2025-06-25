export default defineNuxtPlugin(() => {
  if (import.meta.server)
    return

  const initAnimations = () => {
    // Set up Intersection Observer for scroll-triggered animations
    const animateElements = document.querySelectorAll('.animate')

    if (animateElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add show class when element comes into view
            entry.target.classList.add('show')

            // Stop observing after animation
            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element fully enters viewport
      })

      // Observe all animate elements
      animateElements.forEach((el) => {
        observer.observe(el)
      })
    }

    // Staggered page-load reveal for immediate animations
    const immediateAnimations = document.querySelectorAll('.animate-immediate')
    immediateAnimations.forEach((el, i) => {
      setTimeout(() => el.classList.add('show'), i * 150) // 150ms cascade
    })

    // Scroll flag for sticky header & back-to-top
    const onScroll = () => {
      document.documentElement.classList.toggle('scrolled', window.scrollY > 50)
    }
    onScroll() // Run once on init
    window.addEventListener('scroll', onScroll, { passive: true })

    // Smooth scroll back to top
    const backToTopButton = document.getElementById('back-to-top')
    if (backToTopButton) {
      backToTopButton.addEventListener('click', (e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }

    // Handle staggered animations for lists
    const staggeredGroups = document.querySelectorAll('[data-stagger]')
    staggeredGroups.forEach((group) => {
      const children = group.querySelectorAll('.animate')
      const staggerDelay = Number.parseInt(group.getAttribute('data-stagger') || '100')

      children.forEach((child, index) => {
        if (child instanceof HTMLElement) {
          child.style.transitionDelay = `${index * staggerDelay}ms`
        }
      })
    })

    // Clean up function
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }

  // Initialize on app mounted
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations)
  }
  else {
    initAnimations()
  }

  // Re-initialize on route change for client-side navigation
  const router = useRouter()
  router.afterEach(() => {
    // Small delay to ensure DOM is updated
    setTimeout(initAnimations, 50)
  })
})
