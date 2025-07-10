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

// Use blog layout
definePageMeta({
  layout: 'blog',
})

// Enable staggered animations
useStaggeredAnimation()

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div v-if="post" class="contents">
    <!-- Sidebar content -->
    <aside class="animate hidden lg:block">
      <div class="py-12 pr-8 top-24 sticky">
        <BaseTableOfContents :links="tocLinks" />
      </div>
    </aside>

    <!-- Main content -->
    <article class="px-4 py-12 lg:px-0">
      <!-- Back to blog link -->
      <NuxtLink
        to="/blog"
        class="animate text-[var(--color-text-muted)] mb-8 inline-flex gap-2 transition-colors items-center hover:text-[var(--color-primary)]"
      >
        <Icon name="i-lucide-arrow-left" class="h-4 w-4" />
        <span>Back to Blog</span>
      </NuxtLink>

      <div class="animate prose-lg max-w-none prose dark:prose-invert">
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
