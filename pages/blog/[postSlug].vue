<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const { postSlug } = route.params

const { data: post } = await useAsyncData(
  `blog-post-${postSlug}`,
  () => queryCollection('blog').path(`/blog/${postSlug}`).first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
    fatal: true,
  })
}

const pageTitle = `${post.value.title} - ${appConfig.site.title}`
const pageDescription = post.value.description || `Read "${post.value.title}" on ${appConfig.site.title}`

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
useEnhancedSeoMeta({
  title: pageTitle,
  description: pageDescription,
  image: post.value.ogImage || post.value.image,
  type: 'article',
  author: post.value.author || appConfig.site.author,
  publishedTime: post.value.date,
  modifiedTime: post.value.updatedAt || post.value.date,
  tags: post.value.tags || [],
})

useArticleStructuredData({
  title: post.value.title,
  description: post.value.description,
  author: post.value.author,
  date: post.value.date,
  updatedAt: post.value.updatedAt,
  image: post.value.ogImage || post.value.image,
  tags: post.value.tags,
})

useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: post.value.title },
])
</script>

<template>
  <div v-if="post" class="contents">
    <aside class="animate h-fit hidden top-24 sticky lg:block">
      <BaseTableOfContents :links="tocLinks" />
    </aside>

    <article class="px-4 py-12 lg:px-0">
      <div class="animate mb-6">
        <BaseBreadcrumbs
          :items="[
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
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

      <div class="animate">
        <BaseShareLinks
          :title="post.title"
          :description="post.description"
          variant="inline"
        />
      </div>
    </article>
  </div>
</template>
