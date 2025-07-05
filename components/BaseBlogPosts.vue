<script setup lang="ts">
const {
  type = 'latest',
  limit = 3,
  showExcerpt = true,
} = defineProps<{
  type?: 'featured' | 'latest'
  limit?: number
  showExcerpt?: boolean
}>()

const { data: posts } = await useAsyncData(
  `blog-posts-${type}-${limit}`,
  async () => {
    let query = queryCollection('blog')

    if (type === 'featured') {
      // For featured posts, only show posts marked as featured
      query = query.where('featured', '=', true)
    }
    else {
      // For latest posts, exclude drafts and featured posts
      query = query
        .where('draft', '<>', true)
        .where('featured', '<>', true)
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
    <div class="space-y-8">
      <article
        v-for="(post, index) in posts"
        :key="`post-${index}`"
        class="group"
      >
        <!-- Post Content -->
        <div class="space-y-2">
          <!-- Title -->
          <h3 class="text-xl leading-tight">
            <NuxtLink
              :href="`${post.path}`"
              class="text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
            >
              {{ post.title }}
            </NuxtLink>
          </h3>

          <!-- Excerpt -->
          <p v-if="showExcerpt && post.description" class="text-[var(--color-text-muted)] leading-relaxed">
            {{ post.description }}
          </p>
        </div>
      </article>
    </div>
  </div>
  <div v-else class="text-[var(--color-text-muted)] py-8 text-center">
    No {{ type }} posts found.
  </div>
</template>
