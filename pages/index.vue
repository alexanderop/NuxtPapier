<script setup lang="ts">
const appConfig = useAppConfig()

const { data: page } = await useAsyncData(
  'home-page',
  () => queryCollection('pages').path('/').first(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Home page not found',
    fatal: true,
  })
}

const pageTitle = appConfig.site.title
const pageDescription = page.value.description || appConfig.site.desc
const pageOgImage = (page.value as any).ogImage || appConfig.site.ogImage

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageOgImage,
  twitterCard: 'summary_large_image',
})

// Enable staggered animations
useStaggeredAnimation()
</script>

<template>
  <div class="py-12">
    <article v-if="page" class="prose-lg animate prose dark:prose-invert max-w-none">
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>
