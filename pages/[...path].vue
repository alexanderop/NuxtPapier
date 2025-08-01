<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(
  `page-${route.path}`,
  async () => {
    // Don't handle routes that have specific page components
    const excludedPaths = ['/posts/', '/tags/']
    const shouldExclude = excludedPaths.some(path => route.path.startsWith(path))

    if (shouldExclude) {
      throw createError({
        fatal: true,
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }

    const result = await queryCollection('pages').path(route.path).first()
    if (!result) {
      throw createError({
        fatal: true,
        statusCode: 404,
        statusMessage: 'Page not found',
      })
    }
    return result
  },
)

const { pageTitle, pageDescription } = usePageMeta(page.value || { title: '' })

// Generate simple OG image for dynamic pages
defineOgImageComponent('Simple', {
  title: pageTitle ?? page.value?.title,
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

useWebsiteStructuredData()

if (route.path !== '/') {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: page.value?.title || '' },
  ]
  useBreadcrumbStructuredData(breadcrumbItems)
}
</script>

<template>
  <BaseGridLayout variant="default">
    <div v-if="page">
      <Breadcrumbs
        v-if="route.path !== '/'"
        :items="[
          { name: 'Home', url: '/' },
          { name: page?.title || '' },
        ]"
        class="mb-8"
      />

      <article class="prose-lg max-w-none prose dark:prose-invert">
        <ContentRenderer :value="page" />
      </article>
    </div>
  </BaseGridLayout>
</template>
