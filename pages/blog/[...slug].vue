<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// SEO meta tags
const pageTitle = `${page.value.title} | ${siteConfig.name}`
const pageUrl = `${siteConfig.url}${route.path}`

useSeoMeta({
  title: pageTitle,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
  ogUrl: pageUrl,
  ogType: 'article',
  articlePublishedTime: page.value.date || undefined,
  articleAuthor: [siteConfig.author.name],
  twitterTitle: page.value.title,
  twitterDescription: page.value.description,
})
</script>

<template>
  <div>
    <article v-if="page">
      <!-- Article Header -->
      <header class="mb-8 animate-immediate" data-animate="fade-up">
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
      <div class="max-w-none prose animate" data-animate="fade" data-delay="200">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>

    <!-- Navigation -->
    <nav class="mt-16 pt-8 animate" data-animate="fade-up" data-delay="300">
      <NuxtLink
        to="/blog"
        class="text-sm text-muted inline-flex transition-colors items-center hover:text-brand-500 group"
      >
        <svg class="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </NuxtLink>
    </nav>
  </div>
</template>
