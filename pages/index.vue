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
</script>

<template>
  <div class="py-12">
    <article v-if="page" class="prose-lg max-w-none prose dark:prose-invert">
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>
