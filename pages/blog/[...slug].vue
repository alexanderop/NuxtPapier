<script setup lang="ts">
import { getPostByPath } from '~/utils/content-queries'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return getPostByPath(route.path)
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

// Initialize blog post navigation
const { nextPost, prevPost } = useBlogPostNavigation(page)

// Check if the post has enough content for a TOC
const showToc = computed(() => {
  return page.value?.toc && page.value.toc.links && page.value.toc.links.length > 2
})

// SEO meta tags with modern Nuxt SEO patterns
const seoDescription = page.value.excerpt || page.value.description
const seoImage = (typeof page.value.image === 'string' ? page.value.image : page.value.image?.src) || `${siteConfig.url}/og-image.png`

useSeoMeta({
  title: page.value.title,
  description: seoDescription,
  ogTitle: page.value.title,
  ogDescription: seoDescription,
  ogType: 'article',
  ogImage: seoImage,
  articlePublishedTime: page.value.createdAt || page.value.date || undefined,
  articleModifiedTime: page.value.updatedAt || page.value.date || undefined,
  articleAuthor: [page.value.author?.name || siteConfig.author.name],
  articleSection: page.value.category || 'Blog',
  articleTag: Array.isArray(page.value.tags) ? page.value.tags : page.value.tags ? [page.value.tags] : undefined,
  twitterTitle: page.value.title,
  twitterDescription: seoDescription,
  twitterCard: 'summary_large_image',
  twitterImage: seoImage,
})

// OG Image generation - using custom template
defineOgImageComponent('BlogPost', {
  title: page.value.title,
  author: page.value.author?.name || siteConfig.author.name,
})

// Structured data for SEO
defineArticle({
  headline: page.value.title,
  description: seoDescription,
  datePublished: page.value.createdAt || page.value.date || new Date().toISOString(),
  dateModified: page.value.updatedAt || page.value.date || new Date().toISOString(),
  image: seoImage,
  author: {
    name: page.value.author?.name || siteConfig.author.name,
    url: page.value.author?.url || siteConfig.author.url,
  },
  ...(page.value.tags && { keywords: page.value.tags }),
})
</script>

<template>
  <div class="mx-auto px-4 py-16 lg:px-8 sm:px-6" :class="showToc ? 'max-w-7xl' : 'max-w-4xl'">
    <div v-if="page" class="lg:gap-8 lg:grid" :class="showToc ? 'lg:grid-cols-[1fr,280px]' : ''">
      <!-- Main Content -->
      <article>
        <!-- Article Header -->
        <header class="mb-16 text-center">
          <h1 class="text-5xl text-text leading-tight font-bold mb-6 lg:text-7xl sm:text-6xl">
            {{ page.title }}
          </h1>

          <!-- Enhanced Metadata -->
          <div class="text-lg text-muted flex flex-col gap-3 items-center">
            <div class="flex flex-wrap gap-3 items-center justify-center">
              <time v-if="page.formattedDate" class="flex gap-1 items-center">
                <svg class="opacity-70 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ page.formattedDate }}
              </time>
              <span v-if="page.readingTime" class="flex gap-1 items-center">
                <svg class="opacity-70 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ page.readingTime }} min read
              </span>
              <span v-if="page.author?.name" class="flex gap-1 items-center">
                <svg class="opacity-70 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <NuxtLink
                  v-if="page.author.url"
                  :to="page.author.url"
                  class="transition-colors hover:text-brand-500"
                  target="_blank"
                  rel="noopener"
                >
                  {{ page.author.name }}
                </NuxtLink>
                <span v-else>{{ page.author.name }}</span>
              </span>
            </div>

            <!-- Tags and Category -->
            <div v-if="page.tags || page.category" class="flex flex-wrap gap-2 items-center justify-center">
              <NuxtLink
                v-if="page.category"
                :to="`/blog/category/${page.categorySlug || page.category.toLowerCase()}`"
                class="text-sm"
              >
                <Badge variant="primary" size="sm">
                  {{ page.category }}
                </Badge>
              </NuxtLink>
              <NuxtLink
                v-for="tag in page.tags"
                :key="tag"
                :to="`/tags/${tag.toLowerCase()}`"
                class="text-sm"
              >
                <Badge variant="default" size="sm">
                  {{ tag }}
                </Badge>
              </NuxtLink>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div v-if="page.image" class="mb-12">
          <ProseImg
            :src="typeof page.image === 'string' ? page.image : page.image.src"
            :alt="typeof page.image === 'string' ? page.title : page.image.alt"
            :caption="typeof page.image === 'string' ? undefined : page.image.caption"
          />
        </div>

        <!-- Separator Line -->
        <hr class="mb-16 border-t border-border">

        <!-- Article Content -->
        <div class="prose">
          <ContentRenderer v-if="page" :value="page" />
        </div>

        <!-- Related Posts -->
        <RelatedPosts :current-post="page" />
      </article>

      <!-- Table of Contents (Sidebar on desktop) -->
      <aside v-if="showToc" class="hidden lg:block">
        <TableOfContents :toc="page.toc" :floating="true" />
      </aside>
    </div>

    <!-- Navigation -->
    <nav class="mt-24 pt-8 border-t border-border">
      <div class="gap-6 grid grid-cols-1 sm:grid-cols-3">
        <!-- Previous Post -->
        <div class="text-left">
          <NuxtLink
            v-if="prevPost"
            :to="prevPost.path"
            class="group inline-flex flex-col gap-1"
          >
            <span class="text-sm text-muted flex gap-2 items-center">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
              <BaseKbd keys="h" class="opacity-50" />
            </span>
            <span class="text-body transition-colors group-hover:text-brand-500">
              {{ prevPost.title }}
            </span>
          </NuxtLink>
        </div>

        <!-- Back to Blog -->
        <div class="text-center">
          <NuxtLink
            to="/blog"
            class="group inline-flex flex-col gap-1"
          >
            <span class="text-sm text-muted flex gap-2 items-center justify-center">
              All posts
              <BaseKbd keys="b" class="opacity-50" />
            </span>
          </NuxtLink>
        </div>

        <!-- Next Post -->
        <div class="text-right">
          <NuxtLink
            v-if="nextPost"
            :to="nextPost.path"
            class="group text-right inline-flex flex-col gap-1"
          >
            <span class="text-sm text-muted flex gap-2 items-center justify-end">
              Next
              <BaseKbd keys="l" class="opacity-50" />
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span class="text-body transition-colors group-hover:text-brand-500">
              {{ nextPost.title }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>
