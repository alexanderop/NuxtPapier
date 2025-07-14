<script setup lang="ts">
const appConfig = useAppConfig()

const pageResult = await fromPromise(
  queryCollection('pages').path('/').first(),
  error => new Error(`Failed to fetch home page: ${error}`),
)

const page = pageResult.match(
  data => data,
  () => {
    throw createError({
      fatal: true,
      statusCode: 404,
      statusMessage: 'Home page not found',
    })
  },
)

if (!page) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: 'Home page not found',
  })
}

const { pageTitle, pageDescription } = usePageMeta(page, {
  fallbackDescription: appConfig.site.desc,
  isHomePage: true,
})

// Generate simple OG image for home page
defineOgImageComponent('Simple', {
  title: pageTitle ?? appConfig.site.title,
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
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
