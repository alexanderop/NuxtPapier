<script setup lang="ts">
const appConfig = useAppConfig()

// Use the paginated collection composable
const {
  items: posts,
  totalPages,
  currentPage,
  hasPrevious,
  hasNext,
  goToPrevious,
  goToNext,
  pending,
  error,
} = usePaginatedCollection({
  collection: 'posts',
  order: ['date', 'DESC'],
  where: [['draft', '<>', true]],
})

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
        :posts="posts"
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
