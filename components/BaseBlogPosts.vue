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
    const query = queryCollection('blog')

    // Filter based on type
    if (type === 'featured') {
      // Get featured posts
      const allPosts = await query.all()
      return allPosts
        .filter((post: any) => post.featured === true && post.draft !== true)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
    }
    else {
      // Get latest posts (excluding drafts)
      const allPosts = await query.all()
      return allPosts
        .filter((post: any) => post.draft !== true)
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
    }
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
          <p v-if="showExcerpt && post.description" class="text-[var(--color-secondary)] leading-relaxed">
            {{ post.description }}
          </p>
        </div>
      </article>
    </div>
  </div>
  <div v-else class="text-gray-500 py-8 text-center">
    No {{ type }} posts found.
  </div>
</template>
