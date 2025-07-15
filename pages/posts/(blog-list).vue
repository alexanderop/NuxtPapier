<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

// Get page size from config
const pageSize = appConfig.site.pagination.postsPerPage ?? 10

// Fetch total count of posts
const { data: totalCount } = await useAsyncData(
  'posts-total-count',
  async () => {
    const result = await fromPromise(
      queryCollection('posts')
        .where('draft', '<>', true)
        .count(),
      error => new Error(`Failed to count posts: ${String(error)}`),
    )
    return result.match(
      count => count,
      () => 0,
    )
  },
)

// Setup pagination
const initialPage = Number.parseInt(String(route.query.page ?? '1')) || 1
const {
  currentPage,
  pageCount: totalPages,
  isFirstPage,
  isLastPage,
  prev: goToPrevious,
  next: goToNext,
} = useOffsetPagination({
  onPageChange({ currentPage }) {
    navigateTo({
      query: {
        ...route.query,
        page: currentPage > 1 ? currentPage : undefined,
      },
    })
  },
  page: initialPage,
  pageSize,
  total: totalCount.value ?? 0,
})

// Computed values for pagination state
const hasPrevious = computed(() => !isFirstPage.value)
const hasNext = computed(() => !isLastPage.value)
const offset = computed(() => (currentPage.value - 1) * pageSize)

// Fetch paginated posts
const { data: posts } = await useAsyncData(
  () => `posts-page-${currentPage.value}`,
  async () => {
    const result = await fromPromise(
      queryCollection('posts')
        .where('draft', '<>', true)
        .order('date', 'DESC')
        .skip(offset.value)
        .limit(pageSize)
        .all(),
      error => new Error(`Failed to fetch posts: ${String(error)}`),
    )
    return result.match(
      data => data,
      () => [],
    )
  },
  {
    watch: [currentPage],
  },
)

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
      <BlogPosts
        v-if="posts && posts.length > 0"
        :posts="[...posts]"
        type="custom"
        show-date
        :show-excerpt="false"
      />
      <div v-else class="text-[var(--color-text-muted)] py-8 text-center">
        No posts found.
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="animate mt-12">
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :has-previous="hasPrevious"
        :has-next="hasNext"
        :go-to-previous="goToPrevious"
        :go-to-next="goToNext"
      />
    </div>
  </div>
</template>
