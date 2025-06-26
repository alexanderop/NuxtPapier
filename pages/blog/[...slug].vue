<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// SEO meta tags with modern Nuxt SEO patterns
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
  ogType: 'article',
  articlePublishedTime: page.value.date || undefined,
  articleModifiedTime: page.value.date || undefined,
  articleAuthor: [siteConfig.author.name],
  articleSection: 'Blog',
  twitterTitle: page.value.title,
  twitterDescription: page.value.description,
  twitterCard: 'summary_large_image',
})

// OG Image generation - using screenshot
defineOgImageScreenshot()

// Structured data for SEO
defineArticle({
  headline: page.value.title,
  description: page.value.description,
  datePublished: page.value.date || new Date().toISOString(),
  dateModified: page.value.date || new Date().toISOString(),
  image: `${siteConfig.url}/og-image.png`,
  author: {
    name: siteConfig.author.name,
    url: siteConfig.author.url,
  },
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <article v-if="page">
      <!-- Article Header -->
      <header class="text-center mb-16">
        <h1 class="text-5xl sm:text-6xl lg:text-7xl text-text font-bold mb-6 leading-tight">
          {{ page?.title }}
        </h1>
        <div class="text-muted flex items-center justify-center gap-2 text-lg">
          <time>
            {{ page?.formattedDate }}
          </time>
          <span v-if="page?.readingTime">
            | {{ page?.readingTime }} min read
          </span>
        </div>
      </header>

      <!-- Separator Line -->
      <hr class="border-t border-border mb-16">

      <!-- Article Content -->
      <div class="prose">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>

    <!-- Navigation -->
    <nav class="mt-24 pt-8">
      <NuxtLink
        to="/blog"
        class="text-muted inline-flex transition-colors items-center hover:text-brand-500 text-lg"
      >
        <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </NuxtLink>
    </nav>
  </div>
</template>
