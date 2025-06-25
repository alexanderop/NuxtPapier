<script setup lang="ts">
const { data: recentPosts } = await useAsyncData('recent-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .orWhere(query =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .limit(3)
    .all())
</script>

<template>
  <div>
    <!-- Introduction -->
    <section class="animate-immediate mb-16" data-animate="fade-up">
      <h2 class="text-2xl text-heading mb-4">
        Welcome to my blog
      </h2>
      <p class="text-lg text-body">
        {{ siteConfig.description }}
      </p>
    </section>

    <!-- Recent Posts -->
    <section class="animate" data-animate="fade-up" data-delay="200">
      <div class="mb-8 flex items-center justify-between">
        <h3 class="text-xl text-heading">
          Recent Posts
        </h3>
        <NuxtLink
          to="/feeds"
          class="text-muted opacity-60 transition-all hover:text-brand-500 hover:opacity-100 group"
          title="Subscribe to RSS feed"
        >
          <BaseIcon name="ph:rss-simple" size="md" class="icon-pulse" />
        </NuxtLink>
      </div>

      <div v-if="recentPosts && recentPosts.length > 0" class="space-y-8" data-stagger="100">
        <article
          v-for="(article, index) in recentPosts"
          :key="article.path"
          class="animate group"
          data-animate="fade-left"
          :style="{ transitionDelay: `${300 + (index * 100)}ms` }"
        >
          <h4 class="mb-2">
            <NuxtLink
              :to="article.path"
              class="hover-arrow text-lg text-body font-medium transition-colors group-hover:text-brand-500 pr-6"
            >
              <span>{{ article.title }}</span>
              <svg viewBox="0 0 24 24" class="h-4 w-4 -right-6 top-1/2 absolute fill-none stroke-2 stroke-current -translate-y-1/2">
                <line x1="5" y1="12" x2="19" y2="12" class="arrow-shaft" />
                <polyline points="12 5 19 12 12 19" class="arrow-head" />
              </svg>
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

      <div v-else class="animate py-12 text-center" data-animate="fade">
        <p class="text-muted">
          No blog posts found. Check back soon!
        </p>
      </div>
    </section>
  </div>
</template>
