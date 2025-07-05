<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

const slug = route.params.slug

const { data: post } = await useAsyncData(
  `blog-post-${slug}`,
  () => queryCollection('blog').path(`/blog/${slug}`).first(),
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

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="py-12">
    <article v-if="post" class="mx-auto max-w-3xl">
      <!-- Back to blog link -->
      <NuxtLink
        to="/blog"
        class="text-[var(--color-text-muted)] mb-8 inline-flex gap-2 transition-colors items-center hover:text-[var(--color-primary)]"
      >
        <Icon name="i-lucide-arrow-left" class="h-4 w-4" />
        <span>Back to Blog</span>
      </NuxtLink>

      <div class="prose-lg max-w-none prose dark:prose-invert">
        <ContentRenderer :value="post" />
      </div>

      <!-- Social share links -->
      <BaseShareLinks
        :title="post.title"
        :description="post.description"
        variant="inline"
      />
    </article>
  </div>
</template>
