<script setup lang="ts">
const config = useAppConfig()
const transition = config.site.animations ? { name: 'page', mode: 'out-in' as const } : false

useKeyboardShortcuts()

useHead({
  bodyAttrs: {
    class: config.site.animations ? '' : 'no-animations',
  },
})

useHead({
  htmlAttrs: {
    lang: config.site.lang,
  },
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: `${config.site.title} RSS Feed`,
      href: '/rss.xml',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    {
      rel: 'sitemap',
      type: 'application/xml',
      href: '/sitemap.xml',
    },
  ],
  meta: [
    {
      name: 'theme-color',
      content: '#10b981',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage :transition="transition" />
    </NuxtLayout>

    <ModalController />
  </div>
</template>
