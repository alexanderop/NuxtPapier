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
  twitterCard: 'summary_large_image',
})

// Enable staggered animations
useStaggeredAnimation()
</script>

<template>
  <div class="py-12">
    <div class="mb-12">
      <h1 class="animate text-4xl font-bold mb-4">
        Blog
      </h1>
      <p class="animate text-lg text-[var(--color-text-muted)]">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Use BaseBlogPosts component to display all posts -->
    <div class="animate">
      <BaseBlogPosts
        type="all"
        :limit="100"
        :show-date="true"
        :show-excerpt="true"
      />
    </div>
  </div>
</template>
