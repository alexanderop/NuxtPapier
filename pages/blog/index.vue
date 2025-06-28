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

// Initialize blog shortcuts only on client side
if (import.meta.client) {
  useBlogShortcuts(blogPosts as Ref<any[] | null>)
}

// Get flat index for a post
function getPostIndex(yearIndex: number, postIndex: number): number {
  let index = 0
  for (let i = 0; i < yearIndex; i++) {
    index += postsByYear.value[i]?.posts.length || 0
  }
  return index + postIndex
}

// SEO meta for blog index
useSeoMeta({
  title: 'Blog',
  description: 'All blog posts and articles',
  ogTitle: 'Blog',
  ogDescription: 'All blog posts and articles',
})
</script>

<template>
  <div>
    <div v-if="postsByYear.length > 0" class="space-y-8">
      <div v-for="(yearGroup, yearIndex) in postsByYear" :key="yearGroup.year">
        <h2 class="text-lg text-heading font-semibold mb-2">
          {{ yearGroup.year }}
        </h2>
        <div class="space-y-1">
          <article
            v-for="(article, postIndex) in yearGroup.posts"
            :key="article.path"
            :data-post-index="getPostIndex(yearIndex, postIndex)"
            class="px-2 py-1 rounded flex gap-4 transition-colors -mx-2 hover:bg-brand-50 dark:hover:bg-brand-950"
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
            <span
              v-if="getPostIndex(yearIndex, postIndex) < 9"
              class="text-xs text-muted ml-auto opacity-50"
            >
              <BaseKbd :keys="[(getPostIndex(yearIndex, postIndex) + 1).toString()]" />
            </span>
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
