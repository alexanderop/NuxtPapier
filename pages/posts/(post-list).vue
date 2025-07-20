<script setup lang="ts">
const appConfig = useAppConfig()

const {
  posts,
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  goToPrevious,
  goToNext,
} = await usePaginatedPosts()

const { pageTitle, pageDescription } = usePageMeta(
  { title: 'Posts' },
  {
    customSuffix: appConfig.site.title,
    fallbackDescription: appConfig.pages.posts?.description || `Latest posts from ${appConfig.site.title}`,
  },
)

defineOgImageComponent('Simple', {
  title: pageTitle || 'Posts',
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Posts' },
])

useStaggeredAnimation()
</script>

<template>
  <div>
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

    <div class="animate">
      <BlogPosts
        v-if="posts && posts.length > 0"
        :posts="[...posts]"
        type="custom"
        show-date
        :show-excerpt="false"
      />

      <div
        v-else
        class="text-[var(--color-text-muted)] py-8 text-center"
      >
        No posts found.
      </div>
    </div>

    <div
      v-if="totalPages > 1"
      class="animate mt-12"
    >
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
