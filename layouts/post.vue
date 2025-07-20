<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const route = useRoute()
const { postSlug } = route.params

const { data: post } = await useAsyncData(
  `layout-post-${postSlug}`,
  async () => {
    const result = await queryCollection('posts').path(`/posts/${postSlug}`).first()
    return result
  },
)

const tocLinks = computed<TocLink[]>(() => {
  const toc = post.value?.body?.toc
  return toc?.links || []
})

const hasTableOfContents = computed(() => tocLinks.value.length >= 1)
</script>

<template>
  <div class="font-mono grid grid-rows-[auto_1fr_1fr_1fr_auto] grid-cols-1 min-h-screen sm:grid-cols-5">
    <TheHeader class="col-span-1 row-start-1 row-end-2 sm:col-start-2 sm:col-end-5" />

    <aside
      id="left-sidebar"
      class="hidden sm:col-start-1 sm:row-start-2 sm:col-end-2 sm:row-end-5 sm:block"
    >
      <div
        v-if="hasTableOfContents"
        class="px-4 top-4 sticky"
      >
        <TableOfContents :links="tocLinks" />
      </div>
    </aside>

    <main
      id="main-content"
      class="px-4 col-span-1 row-start-2 row-end-5 sm:px-0 sm:col-start-2 sm:col-end-5"
    >
      <slot />
    </main>

    <div
      id="right-sidebar"
      class="hidden sm:col-start-5 sm:row-start-2 sm:col-end-6 sm:row-end-5 sm:block"
    />

    <TheFooter class="col-span-1 row-start-5 row-end-6 sm:col-start-2 sm:col-end-5" />
  </div>
</template>
