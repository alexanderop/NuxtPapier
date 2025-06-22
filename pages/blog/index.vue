<script setup lang="ts">
const { data: blogPosts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <h2 class="text-3xl text-base font-bold mb-12">
      All Posts
    </h2>

    <div v-if="blogPosts && blogPosts.length > 0" class="space-y-12">
      <article
        v-for="article in blogPosts"
        :key="article.path"
        class="group pb-8 border-b border-base last:border-b-0"
      >
        <h3 class="mb-3">
          <NuxtLink
            :to="article.path"
            class="text-xl text-base font-semibold transition-colors duration-200 hover:text-primary-600 group-hover:underline"
          >
            {{ article.title }}
          </NuxtLink>
        </h3>
        <time class="text-sm text-muted mb-3 block">
          {{ formatDate(article.date) }}
        </time>
        <p class="text-muted leading-relaxed">
          {{ article.description }}
        </p>
      </article>
    </div>

    <div v-else class="py-16 text-center">
      <p class="text-lg text-muted">
        No blog posts found. Check back soon!
      </p>
    </div>
  </div>
</template>
