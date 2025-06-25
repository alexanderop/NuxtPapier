<script setup lang="ts">
const feeds = [
  {
    name: 'RSS 2.0',
    description: 'Standard RSS format compatible with most feed readers',
    url: '/rss.xml',
    icon: 'ph:rss',
    type: 'application/rss+xml',
  },
  {
    name: 'Atom 1.0',
    description: 'Modern feed format with additional features',
    url: '/atom.xml',
    icon: 'ph:atom',
    type: 'application/atom+xml',
  },
  {
    name: 'JSON Feed',
    description: 'Developer-friendly feed format in JSON',
    url: '/feed.json',
    icon: 'ph:code',
    type: 'application/json',
  },
]
</script>

<template>
  <div>
    <h1 class="text-3xl text-heading font-bold mb-4">
      Subscribe to {{ siteConfig.name }}
    </h1>
    <p class="text-lg text-body mb-8">
      Choose your preferred feed format to stay updated with the latest posts.
    </p>

    <div class="space-y-4">
      <div
        v-for="feed in feeds"
        :key="feed.url"
        class="p-6 surface-card rounded-lg"
      >
        <div class="flex gap-4 items-start">
          <BaseIcon
            :name="feed.icon"
            size="lg"
            class="text-brand-500 mt-1"
          />
          <div class="flex-1">
            <h2 class="text-xl text-heading font-semibold mb-1">
              {{ feed.name }}
            </h2>
            <p class="text-body mb-3">
              {{ feed.description }}
            </p>
            <div class="flex gap-4 items-center">
              <a
                :href="feed.url"
                class="text-brand-500 inline-flex gap-2 transition-colors items-center hover:text-brand-600"
              >
                <BaseIcon name="ph:download" size="sm" />
                Subscribe
              </a>
              <code class="text-sm text-muted px-2 py-1 rounded bg-surface">
                {{ feed.type }}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="surface-secondary mt-8 p-6 rounded-lg">
      <h3 class="text-lg text-heading font-semibold mb-2">
        How to use feeds
      </h3>
      <p class="text-body mb-4">
        Copy the feed URL and paste it into your favorite feed reader. Popular options include:
      </p>
      <ul class="text-body list-disc list-inside space-y-1">
        <li>Feedly</li>
        <li>Inoreader</li>
        <li>NewsBlur</li>
        <li>The Old Reader</li>
        <li>Feedbin</li>
      </ul>
    </div>
  </div>
</template>
