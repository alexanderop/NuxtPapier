<script setup lang="ts">
const { data: blogPosts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .orWhere(query =>
      query
        .where('draft', '<>', true)
        .where('draft', 'IS NULL'),
    )
    .all()
})

// SEO meta for blog index
useSeoMeta({
  title: 'Blog',
  description: 'All blog posts and articles',
  ogTitle: 'Blog',
  ogDescription: 'All blog posts and articles',
})
</script>

<template>
  <div>
    <BlogPostList :posts="blogPosts || null" enable-shortcuts />
  </div>
</template>
