<script setup lang="ts">
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
    .all())
</script>

<template>
  <div>
    <!-- Introduction -->
    <section class="mb-16">
      <h2 class="text-2xl text-heading mb-4">
        Welcome to my blog
      </h2>
      <p class="text-lg text-body">
        This is a minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.
      </p>
    </section>

    <!-- Recent Posts -->
    <section>
      <h3 class="text-xl text-heading mb-8">
        Recent Posts
      </h3>

      <div v-if="recentPosts && recentPosts.length > 0" class="space-y-8">
        <article
          v-for="article in recentPosts"
          :key="article.path"
          class="group"
        >
          <h4 class="mb-2">
            <NuxtLink
              :to="article.path"
              class="text-lg text-body font-medium transition-colors group-hover:text-brand-500"
            >
              {{ article.title }}
            </NuxtLink>
          </h4>
          <time class="text-sm text-muted mb-2 block">
            {{ article.formattedDate }}
          </time>
          <p class="text-body">
            {{ article.description }}
          </p>
        </article>
      </div>

      <div v-else class="py-12 text-center">
        <p class="text-muted">
          No blog posts found. Check back soon!
        </p>
      </div>
    </section>
  </div>
</template>
