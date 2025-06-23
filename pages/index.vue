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
    <section>
      <h2>
        Welcome to my blog
      </h2>
      <p>
        This is a minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.
      </p>
    </section>

    <!-- Recent Posts -->
    <section>
      <h3>
        Recent Posts
      </h3>

      <div v-if="recentPosts && recentPosts.length > 0">
        <article
          v-for="article in recentPosts"
          :key="article.path"
        >
          <h4>
            <NuxtLink
              :to="article.path"
            >
              {{ article.title }}
            </NuxtLink>
          </h4>
          <time>
            {{ article.formattedDate }}
          </time>
          <p>
            {{ article.description }}
          </p>
        </article>
      </div>

      <div v-else>
        <p>
          No blog posts found. Check back soon!
        </p>
      </div>
    </section>
  </div>
</template>
