<script setup lang="ts">
import type { BlogPost } from '~/types/content'

interface Props {
  currentPost: BlogPost
  title?: string
  limit?: number
}

const {
  currentPost,
  title = 'Related Posts',
  limit = 3,
} = defineProps<Props>()

const { getRelatedPosts } = useEnhancedContent()

const relatedPosts = ref<BlogPost[]>([])

onMounted(async () => {
  const posts = await getRelatedPosts(currentPost, limit)
  if (Array.isArray(posts)) {
    relatedPosts.value = posts
  }
})
</script>

<template>
  <div v-if="relatedPosts.length > 0" class="related-posts">
    <h3 class="related-posts-title">
      {{ title }}
    </h3>
    <div class="related-posts-grid">
      <article
        v-for="post in relatedPosts"
        :key="post._id"
        class="related-post-card"
      >
        <NuxtLink :to="post._path" class="related-post-link">
          <div v-if="post.image" class="related-post-image">
            <NuxtImg
              :src="post.image.src"
              :alt="post.image.alt"
              loading="lazy"
              class="related-post-img"
            />
          </div>
          <div class="related-post-content">
            <h4 class="related-post-title">
              {{ post.title }}
            </h4>
            <p class="related-post-excerpt">
              {{ post.excerpt || post.description }}
            </p>
            <div class="related-post-meta">
              <time class="related-post-date">{{ post.formattedDate }}</time>
              <span v-if="post.readingTime" class="related-post-reading">
                {{ post.readingTime }} min read
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<style scoped>
.related-posts {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid oklch(var(--border));
}

.related-posts-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: oklch(var(--text));
}

.related-posts-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.related-post-card {
  background: oklch(var(--surface));
  border: 1px solid oklch(var(--border));
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
}

.related-post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(0 0 0 / 0.1);
}

.related-post-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.related-post-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: oklch(var(--surface-secondary));
}

.related-post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.related-post-card:hover .related-post-img {
  transform: scale(1.05);
}

.related-post-content {
  padding: 1.25rem;
}

.related-post-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: oklch(var(--text));
  line-height: 1.4;
}

.related-post-excerpt {
  font-size: 0.875rem;
  color: oklch(var(--text-muted));
  line-height: 1.6;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8125rem;
  color: oklch(var(--text-muted));
}

.related-post-reading::before {
  content: '•';
  margin-right: 0.5rem;
}

@media (max-width: 640px) {
  .related-posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
