<script setup lang="ts">
const appConfig = useAppConfig()

const { tagInfos, loading, error } = useTags()

// Create tag URLs for all tags
const tagUrls = computed(() =>
  tagInfos.value.map(tagInfo => ({
    ...tagInfo,
    url: useTagUrl(tagInfo.tag).value,
  })),
)

const { pageTitle, pageDescription } = usePageMeta(
  { title: 'Tags' },
  {
    customSuffix: appConfig.site.title,
    fallbackDescription: `Browse all tags on ${appConfig.site.title}`,
  },
)

defineOgImageComponent('Simple', {
  title: pageTitle || 'Tags',
})

useEnhancedSeoMeta({
  description: pageDescription,
  title: pageTitle,
  type: 'website',
})

useBreadcrumbStructuredData([
  { name: 'Home', url: '/' },
  { name: 'Tags' },
])

useStaggeredAnimation()
</script>

<template>
  <BaseGridLayout variant="default">
    <div class="animate mb-8">
      <Breadcrumbs
        :items="[
          { name: 'Home', url: '/' },
          { name: 'Tags' },
        ]"
      />
    </div>

    <div class="mb-12">
      <h1 class="animate text-4xl font-bold mb-4">
        Tags
      </h1>

      <p class="animate text-lg text-[var(--color-text-muted)]">
        {{ pageDescription }}
      </p>
    </div>

    <div
      v-if="error"
      class="animate text-[var(--color-error)] mb-8"
    >
      {{ error.message }}
    </div>

    <div
      v-else-if="loading"
      class="animate text-[var(--color-text-muted)]"
    >
      Loading tags...
    </div>

    <div
      v-else-if="tagUrls.length > 0"
      class="animate"
    >
      <ul class="gap-4 grid lg:grid-cols-3 sm:grid-cols-2">
        <li
          v-for="tagInfo in tagUrls"
          :key="tagInfo.tag"
        >
          <NuxtLink
            :to="tagInfo.url"
            class="group p-4 rounded-lg bg-[var(--color-surface-elevated)] flex transition-colors items-center justify-between hover:bg-[var(--color-surface-hover)]"
          >
            <span class="text-lg font-medium group-hover:text-[var(--color-primary)]">
              {{ tagInfo.tag }}
            </span>

            <span class="text-sm text-[var(--color-text-muted)]">
              {{ tagInfo.count }} {{ tagInfo.count === 1 ? 'post' : 'posts' }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div
      v-else
      class="animate text-[var(--color-text-muted)] py-8 text-center"
    >
      No tags found.
    </div>
  </BaseGridLayout>
</template>
