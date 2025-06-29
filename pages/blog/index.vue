<script setup lang="ts">
import { getAllPublishedPosts } from '~/utils/content-queries'

const { data: blogPosts } = await useAsyncData('blog-posts', () => {
  return getAllPublishedPosts()
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
