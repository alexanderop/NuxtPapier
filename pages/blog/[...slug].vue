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

// OG Image generation
defineOgImage({
  component: 'BlogPost',
  props: {
    title: page.value.title,
    description: page.value.description,
    date: page.value.date,
    readingTime: page.value.readingTime,
  },
})

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
  <div>
    <article v-if="page">
      <!-- Article Header -->
      <header class="mb-8">
        <h1 class="text-3xl text-heading font-bold mb-4">
          {{ page?.title }}
        </h1>
        <div class="text-muted flex items-center">
          <time class="text-sm">
            {{ page?.formattedDate }}
          </time>
          <span v-if="page?.readingTime" class="text-sm">
            • {{ page?.readingTime }} min read
          </span>
        </div>
      </header>

      <!-- Article Content -->
      <div class="max-w-none prose">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>

    <!-- Navigation -->
    <nav class="mt-16 pt-8">
      <NuxtLink
        to="/blog"
        class="text-sm text-muted inline-flex transition-colors items-center hover:text-brand-500"
      >
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </NuxtLink>
    </nav>
  </div>
</template>
