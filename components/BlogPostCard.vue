<script setup lang="ts">
interface BlogPost {
  path: string
  title: string
  date?: string
  formattedDate?: string
  description?: string
  tags?: string | string[]
}

const props = defineProps<{
  post: BlogPost
}>()

const normalizedTags = computed(() => {
  if (!props.post.tags)
    return []
  return Array.isArray(props.post.tags) ? props.post.tags : [props.post.tags]
})
</script>

<template>
  <article>
    <header>
      <h2 class="text-2xl text-heading leading-tight font-semibold mb-2">
        <NuxtLink
          :to="post.path"
          class="transition-colors hover:text-brand-500"
        >
          {{ post.title }}
        </NuxtLink>
      </h2>
      <time
        v-if="post.formattedDate"
        :datetime="post.date"
        class="text-sm text-muted"
      >
        {{ post.formattedDate }}
      </time>
    </header>

    <p
      v-if="post.description"
      class="text-body leading-relaxed mt-3"
    >
      {{ post.description }}
    </p>

    <div
      v-if="normalizedTags.length > 0"
      class="mt-3 flex flex-wrap gap-2"
    >
      <NuxtLink
        v-for="tag in normalizedTags"
        :key="tag"
        :to="`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`"
        class="text-xs text-muted px-2 py-1 rounded-full bg-surface transition-colors hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950"
      >
        {{ tag }}
      </NuxtLink>
    </div>
  </article>
</template>
