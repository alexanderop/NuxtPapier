<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// Initialize blog post navigation
const { nextPost, prevPost } = useBlogPostNavigation(page)

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
  <div class="mx-auto px-4 py-16 max-w-4xl lg:px-8 sm:px-6">
    <article v-if="page">
      <!-- Article Header -->
      <header class="mb-16 text-center">
        <h1 class="text-5xl text-text leading-tight font-bold mb-6 lg:text-7xl sm:text-6xl">
          {{ page?.title }}
        </h1>
        <div class="text-lg text-muted flex gap-2 items-center justify-center">
          <time>
            {{ page?.formattedDate }}
          </time>
          <span v-if="page?.readingTime">
            | {{ page?.readingTime }} min read
          </span>
        </div>
      </header>

      <!-- Separator Line -->
      <hr class="mb-16 border-t border-border">

      <!-- Article Content -->
      <div class="prose">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </article>

    <!-- Navigation -->
    <nav class="mt-24 pt-8 border-t border-border">
      <div class="gap-6 grid grid-cols-1 sm:grid-cols-3">
        <!-- Previous Post -->
        <div class="text-left">
          <NuxtLink
            v-if="prevPost"
            :to="prevPost.path.startsWith('/blog') ? prevPost.path : `/blog${prevPost.path}`"
            class="group inline-flex flex-col gap-1"
          >
            <span class="text-sm text-muted flex gap-2 items-center">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
              <BaseKbd keys="h" class="opacity-50" />
            </span>
            <span class="text-body transition-colors group-hover:text-brand-500">
              {{ prevPost.title }}
            </span>
          </NuxtLink>
        </div>

        <!-- Back to Blog -->
        <div class="text-center">
          <NuxtLink
            to="/blog"
            class="group inline-flex flex-col gap-1"
          >
            <span class="text-sm text-muted flex gap-2 items-center justify-center">
              All posts
              <BaseKbd keys="b" class="opacity-50" />
            </span>
          </NuxtLink>
        </div>

        <!-- Next Post -->
        <div class="text-right">
          <NuxtLink
            v-if="nextPost"
            :to="nextPost.path.startsWith('/blog') ? nextPost.path : `/blog${nextPost.path}`"
            class="group text-right inline-flex flex-col gap-1"
          >
            <span class="text-sm text-muted flex gap-2 items-center justify-end">
              Next
              <BaseKbd keys="l" class="opacity-50" />
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span class="text-body transition-colors group-hover:text-brand-500">
              {{ nextPost.title }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>
