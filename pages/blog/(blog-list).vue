<script setup lang="ts">
const appConfig = useAppConfig()

// SEO meta tags
const { pageTitle, pageDescription } = usePageMeta(
  { title: 'Blog' },
  {
    customSuffix: appConfig.site.title,
    fallbackDescription: appConfig.pages.blog?.description || `Latest blog posts from ${appConfig.site.title}`,
  },
)

// Generate simple OG image for blog list
defineOgImageComponent('Simple', {
  title: pageTitle || 'Blog',
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

// Add breadcrumb structured data
useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Blog' },
])

// Enable staggered animations
useStaggeredAnimation()
</script>

<template>
  <div class="py-12">
    <!-- Breadcrumbs -->
    <div class="animate mb-8">
      <Breadcrumbs
        :items="[
          { name: 'Home', url: '/' },
          { name: 'Blog' },
        ]"
      />
    </div>

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
      <BlogPosts
        type="all"
        :limit="100"
        show-date
        :show-excerpt="false"
      />
    </div>
  </div>
</template>
