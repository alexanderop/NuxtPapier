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
      <header>
        <h1>
          {{ page?.title }}
        </h1>
        <div>
          <time>
            {{ page?.formattedDate }}
          </time>
          <span v-if="page?.readingTime">
            • {{ page?.readingTime }} min read
          </span>
        </div>
      </header>

      <!-- Article Content -->
      <div>
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>

    <!-- Navigation -->
    <nav>
      <NuxtLink
        to="/blog"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </NuxtLink>
    </nav>
  </div>
</template>
