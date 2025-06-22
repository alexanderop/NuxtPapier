<script setup>
// Fetch recent blog posts
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
      <h2 class="text-2xl text-base font-semibold mb-4">
        Welcome to my blog
      </h2>
      <p class="text-lg text-muted leading-relaxed">
        This is a minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.
      </p>
    </section>

    <!-- Recent Posts -->
    <section>
      <h3 class="text-xl text-base font-semibold mb-8">
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
              class="text-lg text-base font-medium group-hover:underline"
            >
              {{ article.title }}
            </NuxtLink>
          </h4>
          <time class="text-sm text-muted mb-2 block">
            {{ article.formattedDate }}
          </time>
          <p class="text-muted leading-relaxed">
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
