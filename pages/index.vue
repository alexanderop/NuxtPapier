<script setup>
// Fetch recent blog posts
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
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
      <!-- Introduction -->
      <section class="mb-16">
        <h2 class="text-2xl text-gray-900 font-semibold mb-4">
          Welcome to my blog
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed">
          This is a minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.
        </p>
      </section>

      <!-- Recent Posts -->
      <section>
        <h3 class="text-xl text-gray-900 font-semibold mb-8">
          Recent Posts
        </h3>

        <div v-if="recentPosts && recentPosts.length > 0" class="space-y-8">
          <article
            v-for="article in recentPosts"
            :key="article._path"
            class="group"
          >
            <h4 class="mb-2">
              <NuxtLink
                :to="article.path"
                class="text-lg text-gray-900 font-medium transition-colors duration-200 hover:text-primary-600 group-hover:underline"
              >
                {{ article.title }}
              </NuxtLink>
            </h4>
            <time class="text-sm text-gray-500 mb-2 block">
              {{ formatDate(article.date) }}
            </time>
            <p class="text-gray-600 leading-relaxed">
              {{ article.description }}
            </p>
          </article>
        </div>

        <div v-else class="py-12 text-center">
          <p class="text-gray-500">
            No blog posts found. Check back soon!
          </p>
        </div>
      </section>
    </main>
  </div>
</template>
