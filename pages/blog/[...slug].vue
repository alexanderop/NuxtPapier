<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// SEO meta tags
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <div>
    <article v-if="page">
      <!-- Article Header -->
      <header class="article-header">
        <h1 class="article-title">
          {{ page?.title }}
        </h1>
        <time class="article-date">
          {{ page?.formattedDate }}
        </time>
        <span class="article-reading-time">
          {{ page?.readingTime }} min read
        </span>
      </header>

      <!-- Article Content -->
      <div class="prose">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>

    <!-- Navigation -->
    <nav class="mt-16 pt-8 border-t border-base">
      <NuxtLink
        to="/blog"
        class="text-sm text-muted inline-flex transition-colors duration-200 items-center hover:text-base"
      >
        <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </NuxtLink>
    </nav>
  </div>
</template>
