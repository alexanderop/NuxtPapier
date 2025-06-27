import type { ShortcutsConfig } from './defineShortcuts'

interface BlogPost {
  path: string
  title: string
  date: string
  [key: string]: any
}

export function useBlogShortcuts(posts: Ref<BlogPost[] | null>) {
  const router = useRouter()
  const route = useRoute()
  const shortcutManager = useShortcutManager()

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

  // Register/unregister shortcuts based on route
  watchEffect(() => {
    if (route.path === '/blog') {
      shortcutManager.registerShortcuts('blog-index', blogIndexShortcuts.value)
    }
  })

  // Cleanup on unmount
  onBeforeUnmount(() => {
    shortcutManager.unregisterShortcuts('blog-index')
  })

  return {
    navigateToPost,
  }
}

// For individual blog post pages
export function useBlogPostNavigation(currentPost: Ref<any>) {
  const router = useRouter()
  const route = useRoute()
  const shortcutManager = useShortcutManager()

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

  // Register/unregister shortcuts based on route
  watchEffect(() => {
    if (route.path.startsWith('/blog/')) {
      shortcutManager.registerShortcuts('blog-post', blogPostShortcuts.value)
    }
  })

  // Cleanup on unmount
  onBeforeUnmount(() => {
    shortcutManager.unregisterShortcuts('blog-post')
  })

  return {
    nextPost: computed(() => navigationData.value.next),
    prevPost: computed(() => navigationData.value.prev),
  }
}
