<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

// Pagination configuration
const PAGE_SIZE = 5
const currentPage = computed(() => {
  const page = Number.parseInt(route.query.page as string) || 1
  return page > 0 ? page : 1
})

// Fetch paginated posts
const { data: postsData, refresh } = await useAsyncData(
  () => `posts-page-${currentPage.value}`,
  async () => {
    const skip = (currentPage.value - 1) * PAGE_SIZE

    // Get paginated posts
    const postsResult = await fromPromise(
      queryCollection('posts')
        .where('draft', '<>', true)
        .order('date', 'DESC')
        .skip(skip)
        .limit(PAGE_SIZE)
        .all(),
      error => new Error(`Failed to fetch posts: ${error}`),
    )

    // Get total count for pagination
    const totalResult = await fromPromise(
      queryCollection('posts')
        .where('draft', '<>', true)
        .count(),
      error => new Error(`Failed to count posts: ${error}`),
    )

    return {
      posts: postsResult.match(data => data, () => []),
      total: totalResult.match(data => data, () => 0),
    }
  },
  {
    watch: [currentPage],
  },
)

// Pagination calculations
const totalPages = computed(() => Math.ceil((postsData.value?.total || 0) / PAGE_SIZE))
const hasPrevious = computed(() => currentPage.value > 1)
const hasNext = computed(() => currentPage.value < totalPages.value)

// Navigation functions
function goToPrevious() {
  if (hasPrevious.value) {
    navigateTo({ query: { page: currentPage.value - 1 } })
  }
}

function goToNext() {
  if (hasNext.value) {
    navigateTo({ query: { page: currentPage.value + 1 } })
  }
}

// SEO meta tags
const { pageTitle, pageDescription } = usePageMeta(
  { title: 'Posts' },
  {
    customSuffix: appConfig.site.title,
    fallbackDescription: appConfig.pages.posts?.description || `Latest posts from ${appConfig.site.title}`,
  },
)

// Generate simple OG image for blog list
defineOgImageComponent('Simple', {
  title: pageTitle || 'Posts',
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

// Add breadcrumb structured data
useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Posts' },
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
          { name: 'Posts' },
        ]"
      />
    </div>

    <div class="mb-12">
      <h1 class="animate text-4xl font-bold mb-4">
        Posts
      </h1>
      <p class="animate text-lg text-[var(--color-text-muted)]">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Display paginated posts -->
    <div class="animate">
      <div v-if="postsData?.posts && postsData.posts.length > 0" class="my-8">
        <div class="space-y-4">
          <article
            v-for="(post, index) in postsData.posts"
            :key="`post-${index}`"
            class="group animate"
          >
            <!-- Post Content -->
            <div class="flex gap-4 items-baseline justify-between">
              <!-- Title -->
              <h3 class="text-lg leading-tight flex-1">
                <NuxtLink
                  :href="`${post.path}`"
                  class="text-[var(--color-text)] transition-colors duration-200 dark:text-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  {{ post.title }}
                </NuxtLink>
              </h3>

              <!-- Date -->
              <div class="text-sm text-[var(--color-text-muted)] whitespace-nowrap">
                {{ new Date(post.date).toLocaleDateString() }}
              </div>
            </div>
          </article>
        </div>
      </div>
      <div v-else class="text-[var(--color-text-muted)] py-8 text-center">
        No posts found.
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="animate mt-12 flex items-center justify-between">
      <!-- Previous Button -->
      <button
        :disabled="!hasPrevious"
        class="px-4 py-2 border rounded-md transition-colors duration-200" :class="[
          hasPrevious
            ? 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
            : 'border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed',
        ]"
        @click="goToPrevious"
      >
        ← Previous
      </button>

      <!-- Page Info -->
      <span class="text-sm text-[var(--color-text-muted)]">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <!-- Next Button -->
      <button
        :disabled="!hasNext"
        class="px-4 py-2 border rounded-md transition-colors duration-200" :class="[
          hasNext
            ? 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
            : 'border-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed',
        ]"
        @click="goToNext"
      >
        Next →
      </button>
    </div>
  </div>
</template>
