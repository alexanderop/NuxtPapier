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
      <h2 class="page-title">
        All Posts
      </h2>

      <div v-if="blogPosts && blogPosts.length > 0">
        <div v-for="article in blogPosts" :key="article._path" class="post-item">
          <h3>
            <NuxtLink :to="article.path" class="post-title">
              {{ article.title }}
            </NuxtLink>
          </h3>
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

.page-title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.post-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.post-title {
  text-decoration: none;
  color: #333;
  font-size: 1.2rem;
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
