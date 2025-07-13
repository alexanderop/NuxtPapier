<script setup lang="ts">
import { SOCIALS } from '~/constants'

const {
  centered = false,
} = defineProps<{
  /** Whether to center the social links horizontally */
  centered?: boolean
}>()
</script>

<template>
  <div class="flex-wrap gap-1 justify-center" :class="[{ flex: centered }]">
    <BaseLink
      v-for="social in SOCIALS"
      :key="social.name"
      :href="social.href"
      class="p-2 sm:p-1 hover:rotate-6"
      :title="social.linkTitle"
    >
      <Icon
        :name="social.icon"
        class="opacity-90 size-6 inline-block scale-125 fill-transparent stroke-2 stroke-current sm:scale-110 group-hover:fill-transparent"
      />
      <span class="sr-only">{{ social.linkTitle }}</span>
    </BaseLink>
    <!-- RSS Feed Link -->
    <BaseLink
      href="/rss.xml"
      class="p-2 sm:p-1 hover:rotate-6"
      title="Subscribe to RSS Feed"
    >
      <Icon
        name="mdi:rss"
        class="opacity-90 size-6 inline-block scale-125 fill-transparent stroke-2 stroke-current sm:scale-110 group-hover:fill-transparent"
      />
      <span class="sr-only">Subscribe to RSS Feed</span>
    </BaseLink>
  </div>
</template>
