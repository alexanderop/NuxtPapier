import type { ShortcutsConfig } from './defineShortcuts'

export function useBlogShortcuts(posts: Ref<any[] | null>) {
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
      router.push(post.path)
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

  // Use Nuxt Content's built-in surroundings API
  const { data: surroundings } = useAsyncData(
    `surround-${currentPost.value?.path}`,
    async () => {
      if (!currentPost.value?.path)
        return [null, null] as [null, null]

      const result = await queryCollectionItemSurroundings('blog', currentPost.value.path, {
        fields: ['title', 'path'],
      })
        .orWhere(query =>
          query
            .where('draft', '<>', true)
            .where('draft', 'IS NULL'),
        )
        .order('date', 'DESC')

      return result as Array<{ path: string, title: string } | null>
    },
  )

  // Navigation functions
  function navigateToNext() {
    const nextPost = surroundings.value?.[1]
    if (nextPost) {
      router.push(nextPost.path)
    }
  }

  function navigateToPrev() {
    const prevPost = surroundings.value?.[0]
    if (prevPost) {
      router.push(prevPost.path)
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
    prevPost: computed(() => surroundings.value?.[0] || null),
    nextPost: computed(() => surroundings.value?.[1] || null),
  }
}
