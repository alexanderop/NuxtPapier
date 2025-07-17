<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const { postSlug } = route.params

const { data: post } = await useAsyncData(
  `post-${postSlug}`,
  async () => {
    const result = await queryCollection('posts').path(`/posts/${postSlug}`).first()
    if (!result) {
      throw createError({
        fatal: true,
        statusCode: 404,
        statusMessage: 'Post not found',
      })
    }
    return result
  },
)

if (!post.value) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: 'Post not found',
  })
}

const { pageTitle, pageDescription } = usePageMeta(post.value, { isBlogPost: true })

const tocLinks = computed(() => {
  const toc = post.value?.body?.toc
  return toc?.links || []
})

const readingTimeText = computed(() => {
  const minutes = post.value?.readingTime || 0
  return minutes === 1 ? '1 min read' : `${minutes} min read`
})

definePageMeta({
  layout: 'blog',
})
useStaggeredAnimation()

// Generate dynamic OG image for the blog post
defineOgImageComponent('BlogPost', {
  author: post.value.author ?? appConfig.site.author,
  date: post.value.date,
  description: post.value.description,
  siteName: appConfig.site.title,
  title: post.value.title,
})

useEnhancedSeoMeta({
  author: post.value.author ?? appConfig.site.author,
  description: pageDescription,
  modifiedTime: post.value.updatedAt ?? post.value.date,
  publishedTime: post.value.date,
  tags: post.value.tags ?? [],
  title: pageTitle,
  type: 'article',
})

useArticleStructuredData({
  author: post.value.author,
  date: post.value.date,
  description: post.value.description,
  image: post.value.ogImage ?? post.value.image,
  tags: post.value.tags,
  title: post.value.title,
  updatedAt: post.value.updatedAt,
})

useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Posts', url: '/posts' },
  { name: post.value.title },
])
</script>

<template>
  <div v-if="post" class="contents">
    <aside class="animate h-fit hidden top-24 sticky lg:block">
      <TableOfContents :links="tocLinks" />
    </aside>

    <article class="px-4 py-12 lg:px-0">
      <div class="animate mb-6">
        <Breadcrumbs
          :items="[
            { name: 'Home', url: '/' },
            { name: 'Posts', url: '/posts' },
            { name: post.title },
          ]"
        />
      </div>

      <div class="animate prose-lg max-w-none prose dark:prose-invert">
        <div class="not-prose text-sm text-[var(--color-text-muted)] mb-8 flex flex-wrap gap-4 items-center">
          <span v-if="post.author">{{ post.author }}</span>
          <span v-if="post.date">{{ new Date(post.date).toLocaleDateString() }}</span>
          <span>{{ readingTimeText }}</span>
        </div>

        <ContentRenderer :value="post" />
      </div>

      <div v-if="post.tags && post.tags.length > 0" class="animate my-8">
        <div class="flex gap-2 items-center">
          <span class="text-sm text-[var(--color-text-muted)]">Tags:</span>
          <BaseTags :tags="post.tags" />
        </div>
      </div>

      <div class="animate">
        <ShareLinks
          :title="post.title"
          :description="post.description"
          variant="inline"
        />
      </div>
    </article>
  </div>
</template>
