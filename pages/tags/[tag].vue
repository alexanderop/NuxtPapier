<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute('/tags/[tag]')
const tagParam = Array.isArray(route.params.tag) ? route.params.tag[0] : route.params.tag
const tag = decodeURIComponent(tagParam)

const { data: postsResult } = await useAsyncData(
  `tag-posts-${tag}`,
  async () => {
    const result = await fromPromise(
      queryCollection('posts')
        .where('draft', '<>', true)
        .order('date', 'DESC')
        .all(),
      error => new Error(`Failed to fetch posts: ${error}`),
    )

    return result
  },
)

const isPostsError = computed(() => postsResult.value?.isErr() ?? false)
const postsError = computed(() => (postsResult.value?.isErr() ? postsResult.value.error : null))

const filteredPosts = computed(() => {
  if (!postsResult.value || postsResult.value.isErr()) {
    return []
  }

  const allPosts = postsResult.value.value
  return allPosts.filter(post =>
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag),
  )
})

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
  <div class="py-12">
    <!-- Breadcrumbs -->
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
        #{{ tag }}
      </h1>
      <p class="animate text-lg text-[var(--color-text-muted)]">
        {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post' : 'posts' }} tagged with "{{ tag }}"
      </p>
    </div>

    <!-- Display posts -->
    <div class="animate">
      <div v-if="isPostsError" class="text-red-500 py-8 text-center">
        Error loading posts: {{ postsError?.message }}
      </div>
      <BlogPosts
        v-else-if="filteredPosts.length > 0"
        :posts="[...filteredPosts]"
        type="custom"
        show-date
        :show-excerpt="false"
      />
      <div v-else class="text-[var(--color-text-muted)] py-8 text-center">
        No posts found with this tag.
      </div>
    </div>
  </div>
</template>
