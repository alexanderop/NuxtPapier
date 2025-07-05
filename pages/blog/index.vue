<script setup lang="ts">
const appConfig = useAppConfig()

// SEO meta tags
const pageTitle = `Blog - ${appConfig.site.title}`
const pageDescription = appConfig.pages.blog?.description || `Latest blog posts from ${appConfig.site.title}`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: appConfig.pages.blog?.ogImage || appConfig.site.ogImage,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold mb-4">
        Blog
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Use BaseBlogPosts component to display all posts -->
    <BaseBlogPosts
      type="latest"
      :limit="100"
      :show-excerpt="true"
    />
  </div>
</template>
