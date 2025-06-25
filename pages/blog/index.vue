<script setup lang="ts">
const { data: blogPosts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .orWhere(query =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .all()
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// Group posts by year
const postsByYear = computed(() => {
  if (!blogPosts.value)
    return []

  const grouped = blogPosts.value.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year])
      acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof blogPosts.value>)

  // Convert to array and sort by year descending
  return Object.entries(grouped)
    .map(([year, posts]) => ({ year: Number.parseInt(year), posts }))
    .sort((a, b) => b.year - a.year)
})
</script>

<template>
  <div>
    <div v-if="postsByYear.length > 0" class="space-y-8">
      <div v-for="yearGroup in postsByYear" :key="yearGroup.year">
        <h2 class="text-lg text-heading font-semibold mb-2">
          {{ yearGroup.year }}
        </h2>
        <div class="space-y-1">
          <article
            v-for="article in yearGroup.posts"
            :key="article.path"
            class="flex gap-4"
          >
            <time class="text-sm text-muted">
              {{ formatDate(article.date) }}
            </time>
            <NuxtLink
              :to="article.path.startsWith('/blog') ? article.path : `/blog${article.path}`"
              class="text-body transition-colors hover:text-brand-500"
            >
              {{ article.title }}
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-muted">
        No posts yet.
      </p>
    </div>
  </div>
</template>
