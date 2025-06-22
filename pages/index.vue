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
    <header class="header">
      <h1 class="site-title">
        NuxtPapier
      </h1>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">
          Home
        </NuxtLink>
        <NuxtLink to="/blog" class="nav-link">
          Blog
        </NuxtLink>
      </nav>
    </header>

    <main class="main">
      <section class="intro">
        <h2>Welcome to my blog</h2>
        <p>This is a minimal blog inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.</p>
      </section>

      <section class="recent-posts">
        <h3>Recent Posts</h3>
        <div v-if="recentPosts && recentPosts.length > 0">
          <div v-for="article in recentPosts" :key="article._path" class="post-preview">
            <h4>
              <NuxtLink :to="article.path" class="post-title">
                {{ article.title }}
              </NuxtLink>
            </h4>
            <p class="post-date">
              {{ formatDate(article.date) }}
            </p>
            <p class="post-description">
              {{ article.description }}
            </p>
          </div>
        </div>
        <div v-else class="no-posts">
          <p>No blog posts found. Check back soon!</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.site-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.nav {
  margin-top: 0.5rem;
}

.nav-link {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}

.nav-link:hover {
  text-decoration: underline;
}

.main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.intro {
  margin-bottom: 3rem;
}

.intro h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.recent-posts h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.post-preview {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.post-title {
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.post-title:hover {
  text-decoration: underline;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.post-description {
  color: #555;
  line-height: 1.5;
}
</style>
