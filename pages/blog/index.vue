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
      <div
        v-for="(yearGroup, yearIndex) in postsByYear"
        :key="yearGroup.year"
        class="animate"
        data-animate="fade-up"
        :style="{ transitionDelay: `${yearIndex * 100}ms` }"
      >
        <h2 class="text-lg text-heading font-semibold mb-2">
          {{ yearGroup.year }}
        </h2>
        <div class="space-y-1" data-stagger="50">
          <article
            v-for="(article, articleIndex) in yearGroup.posts"
            :key="article.path"
            class="animate flex gap-4"
            data-animate="fade-left"
            :style="{ transitionDelay: `${(yearIndex * 100) + (articleIndex * 50)}ms` }"
          >
            <time class="text-sm text-muted">
              {{ formatDate(article.date) }}
            </time>
            <NuxtLink
              :to="article.path.startsWith('/blog') ? article.path : `/blog${article.path}`"
              class="hover-arrow text-body transition-colors hover:text-brand-500 pr-6"
            >
              <span>{{ article.title }}</span>
              <svg viewBox="0 0 24 24" class="h-4 w-4 -right-6 top-1/2 absolute fill-none stroke-2 stroke-current -translate-y-1/2">
                <line x1="5" y1="12" x2="19" y2="12" class="arrow-shaft" />
                <polyline points="12 5 19 12 12 19" class="arrow-head" />
              </svg>
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>

    <div v-else class="animate" data-animate="fade">
      <p class="text-muted">
        No posts yet.
      </p>
    </div>
  </div>
</template>
