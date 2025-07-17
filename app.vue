<script setup lang="ts">
const config = useAppConfig()
const transition = config.site.animations ? { mode: 'out-in' as const, name: 'page' } : false

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
      href: '/rss.xml',
      rel: 'alternate',
      title: `${config.site.title} RSS Feed`,
      type: 'application/rss+xml',
    },
    {
      href: '/manifest.json',
      rel: 'manifest',
    },
    {
      href: '/sitemap.xml',
      rel: 'sitemap',
      type: 'application/xml',
    },
  ],
  meta: [
    {
      content: '#10b981',
      name: 'theme-color',
    },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage :transition="transition" />
    </NuxtLayout>

    <ModalController />
  </div>
</template>
