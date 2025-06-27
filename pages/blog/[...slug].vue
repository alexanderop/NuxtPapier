<script setup lang="ts">
import type { BlogPost } from '~/types/content'

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
}) as { data: Ref<BlogPost | null> }

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
const seoImage = page.value.image?.src || `${siteConfig.url}/og-image.png`

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
  articleTag: page.value.tags,
  twitterTitle: page.value.title,
  twitterDescription: seoDescription,
  twitterCard: 'summary_large_image',
  twitterImage: seoImage,
})

// OG Image generation - using screenshot
defineOgImageScreenshot()

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
            <div class="flex flex-wrap gap-2 items-center justify-center">
              <time>
                {{ page.formattedDate }}
              </time>
              <span v-if="page.readingTime">
                | {{ page.readingTime }} min read
              </span>
              <span v-if="page.author?.name">
                | By {{ page.author.name }}
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
                :to="`/blog/tag/${tag.toLowerCase()}`"
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
            :src="page.image.src"
            :alt="page.image.alt"
            :caption="page.image.caption"
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
            :to="prevPost.path.startsWith('/blog') ? prevPost.path : `/blog${prevPost.path}`"
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
            :to="nextPost.path.startsWith('/blog') ? nextPost.path : `/blog${nextPost.path}`"
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
