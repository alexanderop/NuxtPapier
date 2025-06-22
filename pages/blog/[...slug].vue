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
      <article class="article">
        <header class="article-header">
          <h1 class="article-title">
            {{ data.title }}
          </h1>
          <p class="article-date">
            {{ formatDate(data.date) }}
          </p>
        </header>

        <div class="article-content">
          <ContentRenderer :value="data" />
        </div>
      </article>

      <nav class="article-nav">
        <NuxtLink to="/blog" class="back-link">
          ← Back to all posts
        </NuxtLink>
      </nav>
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

.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.article-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.article-content {
  line-height: 1.7;
  color: #333;
}

.article-nav {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.back-link {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
  color: #333;
}
</style>
