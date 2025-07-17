<script setup lang="ts">
const route = useRoute()

let page
try {
  page = await queryCollection('pages').path(route.path).first()
}
catch {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

if (!page) {
  throw createError({
    fatal: true,
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

const { pageTitle, pageDescription } = usePageMeta(page)

// Generate simple OG image for dynamic pages
defineOgImageComponent('Simple', {
  title: pageTitle ?? page.title,
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
    { name: page.title },
  ]
  useBreadcrumbStructuredData(breadcrumbItems)
}
</script>

<template>
  <div v-if="page" class="py-12">
    <Breadcrumbs
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
