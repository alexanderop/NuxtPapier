<script setup lang="ts">
const appConfig = useAppConfig()

const { data: page } = await useAsyncData(
  'home-page',
  async () => {
    const result = await queryCollection('pages').path('/').first()
    if (!result) {
      throw createError({
        fatal: true,
        statusCode: 404,
        statusMessage: 'Home page not found',
      })
    }
    return result
  },
)

const { pageTitle, pageDescription } = usePageMeta(page.value || { title: '' }, {
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
  <div>
    <article
      v-if="page"
      class="animate prose-lg max-w-none prose dark:prose-invert"
    >
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>
