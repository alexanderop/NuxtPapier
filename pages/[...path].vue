<script setup>
const route = useRoute()
const appConfig = useAppConfig()

// Skip system files and hidden directories
const systemPaths = ['.well-known', '_nuxt', '__', '.']
const shouldSkip = systemPaths.some(path => route.path.startsWith(`/${path}`))

if (shouldSkip) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Not found',
    fatal: true,
  })
}

const { data: page } = await useAsyncData(
  `page-${route.path}`,
  () => queryCollection('pages').path(route.path).first(),
  { watch: [() => route.path] },
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const pageTitle = `${page.value.title} - ${appConfig.site.title}`
const pageDescription = page.value.description || `${page.value.title} page on ${appConfig.site.title}`
const pageOgImage = 'ogImage' in page.value && page.value.ogImage ? page.value.ogImage : appConfig.site.ogImage

// Use enhanced SEO meta
useEnhancedSeoMeta({
  title: pageTitle,
  description: pageDescription,
  image: pageOgImage,
  type: 'website',
})

// Add website structured data
useWebsiteStructuredData()

// Add breadcrumbs for non-home pages
if (route.path !== '/') {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: page.value.title },
  ]

  useBreadcrumbStructuredData(breadcrumbItems)
}
</script>

<template>
  <div class="py-12">
    <!-- Breadcrumbs for non-home pages -->
    <BaseBreadcrumbs
      v-if="route.path !== '/'"
      :items="[
        { name: 'Home', url: '/' },
        { name: page.title },
      ]"
      class="mb-8"
    />

    <article class="prose-lg max-w-none prose dark:prose-invert">
      <ContentRenderer :value="page" />
    </article>
  </div>
</template>
