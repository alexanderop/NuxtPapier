<script setup lang="ts">
const {
  type = 'latest',
  limit = 3,
  showExcerpt = true,
  showDate = false,
  posts,
} = defineProps<{
  /** Type of posts to display: featured, latest, all, or custom posts */
  type?: 'featured' | 'latest' | 'all' | 'custom'
  /** Maximum number of posts to display */
  limit?: number
  /** Whether to show the post excerpt/description */
  showExcerpt?: boolean
  /** Whether to show the post date */
  showDate?: boolean
  /** Custom posts array when type is 'custom' */
  posts?: any[]
}>()

const { transitionClasses } = useAnimations()

const postsData = ref<any[]>([])

const displayPosts = computed(() => {
  if (type === 'custom' && posts) {
    return posts
  }
  return postsData.value
})

if (type !== 'custom') {
  const postsResult = await fromPromise(
    (async () => {
      let query = queryCollection('posts')

      if (type === 'featured') {
        // For featured posts, only show posts marked as featured
        query = query.where('featured', '=', true)
      }
      else if (type === 'latest') {
        // For latest posts, exclude drafts and featured posts
        query = query
          .where('draft', '<>', true)
          .where('featured', '<>', true)
      }
      else if (type === 'all') {
        // For all posts, only exclude drafts
        query = query.where('draft', '<>', true)
      }

      return await query
        .order('date', 'DESC')
        .limit(limit)
        .all()
    })(),
    error => new Error(`Failed to fetch posts: ${error}`),
  )

  postsData.value = postsResult.match(
    data => data,
    () => [], // fallback to empty array if query fails
  )
}
</script>

<template>
  <div v-if="displayPosts && displayPosts.length > 0" class="my-8">
    <div class="space-y-4">
      <article
        v-for="(post, index) in displayPosts"
        :key="`post-${index}`"
        class="group animate"
      >
        <!-- Post Content -->
        <div class="flex gap-4 items-baseline justify-between">
          <!-- Title -->
          <h3 class="text-lg leading-tight flex-1">
            <NuxtLink
              :href="`${post.path}`"
              class="text-[var(--color-text)] dark:text-[var(--color-primary)] hover:text-[var(--color-primary)]" :class="[transitionClasses]"
            >
              {{ post.title }}
            </NuxtLink>
          </h3>

          <!-- Date -->
          <div v-if="showDate && post.date" class="text-sm text-[var(--color-text-muted)] whitespace-nowrap">
            {{ new Date(post.date).toLocaleDateString() }}
          </div>
        </div>

        <!-- Excerpt -->
        <p v-if="showExcerpt && post.description" class="text-[var(--color-text-muted)] leading-relaxed mt-2">
          {{ post.description }}
        </p>
      </article>
    </div>
  </div>
  <div v-else class="text-[var(--color-text-muted)] py-8 text-center">
    No {{ type }} posts found.
  </div>
</template>
