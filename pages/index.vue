<script setup lang="ts">
import { getRecentPosts } from '~/utils/content-queries'

const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  getRecentPosts(3))

// SEO configuration for homepage
useSeoMeta({
  title: siteConfig.title,
  description: siteConfig.description,
  ogTitle: siteConfig.title,
  ogDescription: siteConfig.description,
})

// OG Image temporarily disabled to avoid memory issues
// defineOgImageScreenshot()
</script>

<template>
  <div>
    <!-- Introduction -->
    <section class="mb-16">
      <h2 class="text-2xl text-heading mb-4">
        Welcome to my blog
      </h2>
      <p class="text-lg text-body">
        {{ siteConfig.description }}
      </p>
    </section>

    <!-- Recent Posts -->
    <section>
      <div class="mb-8 flex items-center justify-between">
        <h3 class="text-xl text-heading">
          Recent Posts
        </h3>
        <NuxtLink
          to="/feeds"
          class="text-muted opacity-60 transition-all hover:text-brand-500 hover:opacity-100"
          title="Subscribe to RSS feed"
        >
          <BaseIcon name="ph:rss-simple" size="md" />
        </NuxtLink>
      </div>

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
