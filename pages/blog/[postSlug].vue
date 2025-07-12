<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const postSlug = route.params.postSlug

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

// Get TOC links - Nuxt Content v2 structure
const tocLinks = computed(() => {
  // In Nuxt Content v2, toc is an object with a links array
  const toc = post.value?.body?.toc
  return toc?.links || []
})

// Format reading time
const readingTimeText = computed(() => {
  const minutes = post.value?.readingTime || 0
  return minutes === 1 ? '1 min read' : `${minutes} min read`
})

// Use blog layout
definePageMeta({
  layout: 'blog',
})

// Enable staggered animations
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

// Add article structured data
useArticleStructuredData({
  title: post.value.title,
  description: post.value.description,
  author: post.value.author,
  date: post.value.date,
  updatedAt: post.value.updatedAt,
  image: post.value.ogImage || post.value.image,
  tags: post.value.tags,
})

// Add breadcrumb structured data
useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: post.value.title },
])
</script>

<template>
  <div v-if="post" class="contents">
    <!-- Sidebar content -->
    <aside class="animate h-fit hidden top-24 sticky lg:block">
      <BaseTableOfContents :links="tocLinks" />
    </aside>

    <!-- Main content -->
    <article class="px-4 py-12 lg:px-0">
      <!-- Breadcrumbs -->
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
        <!-- Post metadata -->
        <div class="not-prose text-sm text-[var(--color-text-muted)] mb-8 flex flex-wrap gap-4 items-center">
          <span v-if="post.author">{{ post.author }}</span>
          <span v-if="post.date">{{ new Date(post.date).toLocaleDateString() }}</span>
          <span>{{ readingTimeText }}</span>
        </div>

        <ContentRenderer :value="post" />
      </div>

      <!-- Social share links -->
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
