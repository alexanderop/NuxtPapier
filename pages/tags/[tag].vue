<script setup lang="ts">
const route = useRoute()
const tag = computed(() => route.params.tag as string)

const { pending, data: posts } = await useAsyncData(
  `tag-posts-${tag.value}`,
  async () => {
    // Since tags is an array, we need to filter client-side
    // Nuxt Content doesn't have a built-in array contains operator
    const allPosts = await queryCollection('blog')
      .where('status', '=', 'published')
      .order('date', 'DESC')
      .all()

    return allPosts.filter(post =>
      post.tags && Array.isArray(post.tags) && post.tags.includes(tag.value),
    )
  },
)

useSeoMeta({
  title: `Tag: ${tag.value}`,
  description: `All posts tagged with "${tag.value}"`,
})
</script>

<template>
  <div class="container-main py-8">
    <div class="mx-auto max-w-4xl">
      <div class="mb-8">
        <NuxtLink
          to="/tags"
          class="text-muted mb-4 inline-flex gap-2 transition-colors items-center hover:text-brand-500"
        >
          <BaseIcon name="ph:arrow-left" size="sm" />
          All tags
        </NuxtLink>

        <h1 class="text-4xl text-heading font-semibold mb-2">
          Tag: {{ tag }}
        </h1>

        <p class="text-muted">
          {{ posts?.length || 0 }} post{{ posts?.length !== 1 ? 's' : '' }} tagged with "{{ tag }}"
        </p>
      </div>

      <div v-if="pending" class="text-muted">
        Loading posts...
      </div>

      <div v-else-if="!posts || posts.length === 0" class="text-muted">
        No posts found for this tag.
      </div>

      <div v-else>
        <BlogPostList :posts="posts" />
      </div>
    </div>
  </div>
</template>
