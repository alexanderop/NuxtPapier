<script setup lang="ts">
const {
  type = 'latest',
  limit = 3,
  showExcerpt = true,
  showDate = false,
} = defineProps<{
  type?: 'featured' | 'latest' | 'all'
  limit?: number
  showExcerpt?: boolean
  showDate?: boolean
}>()

const { transitionClasses } = useAnimations()

const { data: posts } = await useAsyncData(
  `blog-posts-${type}-${limit}`,
  async () => {
    let query = queryCollection('blog')

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
  },
)
</script>

<template>
  <div v-if="posts && posts.length > 0" class="my-8">
    <div class="space-y-4">
      <article
        v-for="(post, index) in posts"
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
