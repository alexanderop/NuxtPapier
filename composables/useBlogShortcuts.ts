import type { ShortcutsConfig } from './defineShortcuts'
import { defineShortcuts } from './defineShortcuts'

interface BlogPost {
  path: string
  title: string
  date: string
  [key: string]: any
}

export function useBlogShortcuts(posts: Ref<BlogPost[] | null>) {
  const router = useRouter()
  const route = useRoute()

  // State for keyboard navigation
  const highlightedIndex = ref(-1)
  const flatPosts = computed(() => {
    if (!posts.value)
      return []
    return posts.value
  })

  // Navigate to a specific post by index
  function navigateToPost(index: number) {
    const post = flatPosts.value[index]
    if (post) {
      const path = post.path.startsWith('/blog') ? post.path : `/blog${post.path}`
      router.push(path)
    }
  }

  // Highlight navigation
  function highlightNext() {
    if (flatPosts.value.length === 0)
      return
    highlightedIndex.value = Math.min(highlightedIndex.value + 1, flatPosts.value.length - 1)
    scrollToHighlighted()
  }

  function highlightPrevious() {
    if (flatPosts.value.length === 0)
      return
    highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
    scrollToHighlighted()
  }

  function navigateToHighlighted() {
    if (highlightedIndex.value >= 0 && highlightedIndex.value < flatPosts.value.length) {
      navigateToPost(highlightedIndex.value)
    }
  }

  function scrollToHighlighted() {
    nextTick(() => {
      const element = document.querySelector(`[data-post-index="${highlightedIndex.value}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    })
  }

  // Reset highlight when posts change
  watch(posts, () => {
    highlightedIndex.value = -1
  })

  // Shortcuts configuration for blog index
  const blogIndexShortcuts = computed<ShortcutsConfig>(() => {
    const shortcuts: ShortcutsConfig = {}

    // Number keys 1-9 for direct navigation
    for (let i = 1; i <= 9; i++) {
      shortcuts[i.toString()] = () => {
        navigateToPost(i - 1)
      }
    }


    return shortcuts
  })

  // Initialize shortcuts only on blog index page
  if (route.path === '/blog') {
    defineShortcuts(blogIndexShortcuts)
  }

  return {
    navigateToPost,
  }
}

// For individual blog post pages
export function useBlogPostNavigation(currentPost: Ref<any>) {
  const router = useRouter()

  // Fetch all posts to determine next/prev
  const { data: allPosts } = useAsyncData('all-blog-posts', () => {
    return queryCollection('blog')
      .order('date', 'DESC')
      .orWhere(query =>
        query
          .where('draft', '<>', true)
          .where('draft', 'IS NULL'),
      )
      .all()
  })

  // Compute next and previous posts
  const navigationData = computed(() => {
    if (!allPosts.value || !currentPost.value) {
      return { next: null, prev: null, currentIndex: -1 }
    }

    const currentIndex = allPosts.value.findIndex(
      post => post.path === currentPost.value.path,
    )

    return {
      next: currentIndex < allPosts.value.length - 1 ? allPosts.value[currentIndex + 1] : null,
      prev: currentIndex > 0 ? allPosts.value[currentIndex - 1] : null,
      currentIndex,
    }
  })

  // Navigation functions
  function navigateToNext() {
    if (navigationData.value.next) {
      const path = navigationData.value.next.path.startsWith('/blog')
        ? navigationData.value.next.path
        : `/blog${navigationData.value.next.path}`
      router.push(path)
    }
  }

  function navigateToPrev() {
    if (navigationData.value.prev) {
      const path = navigationData.value.prev.path.startsWith('/blog')
        ? navigationData.value.prev.path
        : `/blog${navigationData.value.prev.path}`
      router.push(path)
    }
  }

  function navigateToBlogIndex() {
    router.push('/blog')
  }

  // Shortcuts for blog post pages
  const blogPostShortcuts = computed<ShortcutsConfig>(() => ({
    l: navigateToNext,
    h: navigateToPrev,
    b: navigateToBlogIndex,
  }))

  // Initialize shortcuts only on blog post pages
  const route = useRoute()
  if (route.path.startsWith('/blog/')) {
    defineShortcuts(blogPostShortcuts)
  }

  return {
    nextPost: computed(() => navigationData.value.next),
    prevPost: computed(() => navigationData.value.prev),
  }
}
