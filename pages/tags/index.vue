<script setup lang="ts">
import { getAllTags } from '~/utils/content-queries'

const { pending, data: tagsData } = await useAsyncData('tags-list', () =>
  getAllTags())

const tags = computed(() => {
  if (!tagsData.value)
    return []

  return tagsData.value.map(({ tag, count }) => ({
    name: tag,
    slug: tag.replace(/\s+/g, '-'),
    count,
  }))
})

useSeoMeta({
  title: 'Tags',
  description: 'Browse all tags',
})
</script>

<template>
  <div class="container-main py-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="text-4xl text-heading font-semibold mb-8">
        Tags
      </h1>

      <div v-if="pending" class="text-muted">
        Loading tags...
      </div>

      <div v-else-if="tags.length === 0" class="text-muted">
        No tags found.
      </div>

      <div v-else class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="tag in tags"
          :key="tag.name"
          :to="`/tags/${tag.slug}`"
          class="group px-4 py-2 rounded-full bg-surface inline-flex gap-2 transition-colors items-center hover:bg-brand-50 dark:hover:bg-brand-950"
        >
          <span class="text-sm text-text font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400">
            {{ tag.name }}
          </span>
          <span class="text-xs text-muted group-hover:text-brand-500">
            {{ tag.count }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
