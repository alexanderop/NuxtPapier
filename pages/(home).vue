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

useEnhancedSeoMeta({
  title: pageTitle,
  description: pageDescription,
  image: pageOgImage,
  type: 'website',
})

// Add structured data for the website
useWebsiteStructuredData()

// Enable staggered animations
useStaggeredAnimation()
</script>

<template>
  <div class="py-12">
    <article v-if="page" class="animate prose-lg max-w-none prose dark:prose-invert">
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>
