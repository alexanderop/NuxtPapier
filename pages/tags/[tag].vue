<script setup lang="ts">
const route = useRoute('/tags/[tag]')
const appConfig = useAppConfig()

const encodedTag = String(route.params.tag)
const tag = useTagFromRoute(encodedTag)

const {
  posts,
  currentPage,
  totalPages,
  hasPrevious,
  hasNext,
  goToPrevious,
  goToNext,
  totalCount,
  error,
  loading,
} = await usePostsByTag(tag)

const { pageTitle, pageDescription } = usePageMeta(
  { title: `Tag: ${tag}` },
  {
    customSuffix: appConfig.site.title,
    fallbackDescription: `Posts tagged with "${tag}" on ${appConfig.site.title}`,
  },
)

defineOgImageComponent('Simple', {
  title: pageTitle || `Tag: ${tag}`,
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Tags', url: '/tags' },
  { name: tag },
])

useStaggeredAnimation()
</script>

<template>
  <BaseGridLayout variant="default">
    <div class="animate mb-8">
      <Breadcrumbs
        :items="[
          { name: 'Home', url: '/' },
          { name: 'Tags', url: '/tags' },
          { name: tag },
        ]"
      />
    </div>

    <div class="mb-12">
      <h1 class="animate text-4xl font-bold mb-4">
        <span class="text-[var(--color-primary)]">#</span>{{ tag }}
      </h1>

      <p class="animate text-lg text-[var(--color-text-muted)]">
        {{ totalCount }} {{ totalCount === 1 ? 'post' : 'posts' }} tagged with "{{ tag }}"
      </p>
    </div>

    <div
      v-if="error"
      class="animate text-[var(--color-error)] mb-8"
    >
      {{ error.message }}
    </div>

    <div
      v-else-if="loading && !posts"
      class="animate text-[var(--color-text-muted)]"
    >
      Loading posts...
    </div>

    <div
      v-else
      class="animate"
    >
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
        No posts found for this tag.
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
  </BaseGridLayout>
</template>
