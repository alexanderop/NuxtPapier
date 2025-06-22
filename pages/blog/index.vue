<script setup>
// Fetch all blog posts
const { data: blogPosts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all())

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="mb-12 pb-6 border-b border-gray-200">
      <h1 class="text-4xl text-gray-900 font-bold mb-3">
        NuxtPapier
      </h1>
      <nav class="flex gap-6">
        <NuxtLink
          to="/"
          class="text-gray-600 font-medium transition-colors duration-200 hover:text-gray-900"
          :class="{ 'text-gray-900 font-semibold': $route.path === '/' }"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="text-gray-600 font-medium transition-colors duration-200 hover:text-gray-900"
          :class="{ 'text-gray-900 font-semibold': $route.path.startsWith('/blog') }"
        >
          Blog
        </NuxtLink>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="max-w-3xl">
      <h2 class="text-3xl text-gray-900 font-bold mb-12">
        All Posts
      </h2>

      <div v-if="blogPosts && blogPosts.length > 0" class="space-y-12">
        <article
          v-for="article in blogPosts"
          :key="article._path"
          class="group pb-8 border-b border-gray-100 last:border-b-0"
        >
          <h3 class="mb-3">
            <NuxtLink
              :to="article.path"
              class="text-xl text-gray-900 font-semibold transition-colors duration-200 hover:text-primary-600 group-hover:underline"
            >
              {{ article.title }}
            </NuxtLink>
          </h3>
          <time class="text-sm text-gray-500 mb-3 block">
            {{ formatDate(article.date) }}
          </time>
          <p class="text-gray-600 leading-relaxed">
            {{ article.description }}
          </p>
        </article>
      </div>

      <div v-else class="py-16 text-center">
        <p class="text-lg text-gray-500">
          No blog posts found. Check back soon!
        </p>
      </div>
    </main>
  </div>
</template>
