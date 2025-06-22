<script setup>
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryCollection('blog').path(path).first())

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

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
      <article>
        <!-- Article Header -->
        <header class="mb-12">
          <h1 class="text-4xl text-gray-900 leading-tight font-bold mb-4">
            {{ data.title }}
          </h1>
          <time class="text-sm text-gray-500">
            {{ formatDate(data.date) }}
          </time>
        </header>

        <!-- Article Content -->
        <div class="prose">
          <ContentRenderer :value="data" />
        </div>
      </article>

      <!-- Navigation -->
      <nav class="mt-16 pt-8 border-t border-gray-200">
        <NuxtLink
          to="/blog"
          class="text-sm text-gray-600 inline-flex transition-colors duration-200 items-center hover:text-gray-900"
        >
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </NuxtLink>
      </nav>
    </main>
  </div>
</template>
