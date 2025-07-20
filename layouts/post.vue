<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const route = useRoute()
const { postSlug } = route.params

const { data: post } = await useAsyncData(
  `layout-post-toc-${postSlug}`,
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
  <BaseGridLayout variant="left-sidebar">
    <template
      v-if="hasTableOfContents"
      #sidebar-left
    >
      <TableOfContents :links="tocLinks" />
    </template>

    <slot />
  </BaseGridLayout>
</template>
