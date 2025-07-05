<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

// Extract slug from route
const slug = route.params.slug

// Fetch the blog post by slug
const { data: post } = await useAsyncData(
  `blog-post-${slug}`,
  () => queryCollection('blog').path(`/blog/${slug}`).first(),
)

// Handle 404 if post not found
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
    fatal: true,
  })
}

// SEO meta tags
const pageTitle = `${post.value.title} - ${appConfig.site.title}`
const pageDescription = post.value.description || `Read "${post.value.title}" on ${appConfig.site.title}`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: post.value.ogImage || post.value.image || appConfig.site.ogImage,
  twitterCard: 'summary_large_image',
})

// Format date
function formatDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="py-12">
    <article class="mx-auto max-w-3xl">
      <!-- Post Header -->
      <header class="mb-12">
        <!-- Back to Blog Link -->
        <NuxtLink
          to="/blog"
          class="text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 hover:text-primary-700 mb-8 inline-flex gap-1.5 transition-colors items-center"
        >
          <Icon name="mdi:arrow-left" class="h-4 w-4" />
          Back to Blog
        </NuxtLink>

        <!-- Post Title -->
        <h1 class="text-4xl font-bold mb-6">
          {{ post.title }}
        </h1>

        <!-- Post Meta -->
        <div class="text-sm text-gray-500 mb-6 flex flex-wrap gap-6 dark:text-gray-400">
          <!-- Date -->
          <time v-if="post.date" :datetime="post.date" class="flex gap-1.5 items-center">
            <Icon name="mdi:calendar" class="h-4 w-4" />
            {{ formatDate(post.date) }}
          </time>

          <!-- Author -->
          <span v-if="post.author" class="flex gap-1.5 items-center">
            <Icon name="mdi:account" class="h-4 w-4" />
            {{ post.author }}
          </span>

          <!-- Reading Time (if available) -->
          <span v-if="post.readingTime" class="flex gap-1.5 items-center">
            <Icon name="mdi:clock-outline" class="h-4 w-4" />
            {{ post.readingTime }} min read
          </span>
        </div>

        <!-- Tags -->
        <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="text-xs text-gray-700 px-3 py-1 rounded-full bg-gray-100 dark:text-gray-300 dark:bg-gray-800"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <!-- Featured Image -->
      <div v-if="post.image" class="mb-12 -mx-4 sm:-mx-8">
        <NuxtImg
          :src="post.image"
          :alt="post.title"
          class="rounded-lg h-auto w-full"
          loading="lazy"
        />
      </div>

      <!-- Post Content -->
      <div class="prose-lg max-w-none prose dark:prose-invert">
        <ContentRenderer :value="post" />
      </div>

      <!-- Post Footer -->
      <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <!-- Edit Post Link (if configured) -->
        <div v-if="appConfig.site.editPost?.enabled && appConfig.site.editPost.url" class="mb-8">
          <a
            :href="`${appConfig.site.editPost.url}${post._file}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex gap-1.5 transition-colors items-center"
          >
            <Icon name="mdi:pencil" class="h-4 w-4" />
            {{ appConfig.site.editPost.text || 'Suggest changes' }}
          </a>
        </div>

        <!-- Navigation to Other Posts -->
        <div class="flex justify-between">
          <NuxtLink
            to="/blog"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex gap-1.5 transition-colors items-center"
          >
            <Icon name="mdi:arrow-left" class="h-4 w-4" />
            All Posts
          </NuxtLink>
        </div>
      </footer>
    </article>
  </div>
</template>
