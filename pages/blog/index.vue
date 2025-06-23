<script setup lang="ts">
const { data: blogPosts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
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
  if (!blogPosts.value) return []
  
  const grouped = blogPosts.value.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof blogPosts.value>)
  
  // Convert to array and sort by year descending
  return Object.entries(grouped)
    .map(([year, posts]) => ({ year: parseInt(year), posts }))
    .sort((a, b) => b.year - a.year)
})
</script>

<template>
  <div>
    <div v-if="postsByYear.length > 0">
      <div v-for="yearGroup in postsByYear" :key="yearGroup.year">
        <h2>{{ yearGroup.year }}</h2>
        <div>
          <article
            v-for="article in yearGroup.posts"
            :key="article.path"
          >
            <time>
              {{ formatDate(article.date) }}
            </time>
            <NuxtLink
              :to="article.path"
            >
              {{ article.title }}
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>

    <div v-else>
      <p>
        No posts yet.
      </p>
    </div>
  </div>
</template>
