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

const { pageTitle, pageDescription } = usePageMeta(page.value, {
  isHomePage: true,
  fallbackDescription: appConfig.site.desc,
})

// Generate simple OG image for home page
defineOgImageComponent('Simple', {
  title: pageTitle || appConfig.site.title,
})

useEnhancedSeoMeta({
  title: pageTitle,
  description: pageDescription,
  type: 'website',
})

useWebsiteStructuredData()
useStaggeredAnimation()
</script>

<template>
  <div class="py-12">
    <article v-if="page" class="animate prose-lg max-w-none prose dark:prose-invert">
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>
