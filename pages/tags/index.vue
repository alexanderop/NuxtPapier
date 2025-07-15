<script setup lang="ts">
const appConfig = useAppConfig()

// Use asyncData with neverthrow pattern
const { data: postsResult } = await useAsyncData(
  'all-tags',
  async () => {
    const result = await fromPromise(
      queryCollection('posts')
        .where('draft', '<>', true)
        .select('tags')
        .all(),
      error => new Error(`Failed to fetch tags: ${error}`),
    )

    // Serialize the result for SSR
    if (result.isOk()) {
      return { isOk: true, value: result.value }
    }
    return { error: result.error.message, isOk: false }
  },
)

// Handle error state
const isTagsError = computed(() => postsResult.value?.isOk === false ?? false)
const tagsError = computed(() => (postsResult.value?.isOk === false ? postsResult.value.error : null))

// Count posts per tag
const tagCounts = computed(() => {
  if (!postsResult.value || !postsResult.value.isOk) {
    return []
  }

  const posts = postsResult.value.value
  const counts = new Map<string, number>()

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    }
  })

  // Convert to sorted array
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .map(([tag, count]) => ({ count, tag }))
})

// SEO meta tags
const { pageTitle, pageDescription } = usePageMeta(
  { title: 'Tags' },
  {
    customSuffix: appConfig.site.title,
    fallbackDescription: `Browse all tags on ${appConfig.site.title}`,
  },
)

// Generate simple OG image
defineOgImageComponent('Simple', {
  title: pageTitle || 'Tags',
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

// Add breadcrumb structured data
useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Tags' },
])

// Enable staggered animations
useStaggeredAnimation()
</script>

<template>
  <div class="py-12">
    <!-- Breadcrumbs -->
    <div class="animate mb-8">
      <Breadcrumbs
        :items="[
          { name: 'Home', url: '/' },
          { name: 'Tags' },
        ]"
      />
    </div>

    <div class="mb-12">
      <h1 class="animate text-4xl font-bold mb-4">
        Tags
      </h1>
      <p class="animate text-lg text-[var(--color-text-muted)]">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Tag cloud -->
    <div class="animate">
      <div v-if="isTagsError" class="text-red-500 py-8 text-center">
        Error loading tags: {{ tagsError?.message }}
      </div>
      <div v-else-if="tagCounts.length > 0" class="flex flex-wrap gap-4">
        <NuxtLink
          v-for="{ tag, count } in tagCounts"
          :key="tag"
          :to="`/tags/${tag}`"
          class="text-base text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
        >
          #{{ tag }} ({{ count }})
        </NuxtLink>
      </div>
      <div v-else class="text-[var(--color-text-muted)] py-8 text-center">
        No tags found.
      </div>
    </div>
  </div>
</template>
