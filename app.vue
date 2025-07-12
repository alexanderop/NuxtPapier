<script setup>
const appConfig = useAppConfig()
const pageTransition = appConfig.site.animations ? { name: 'page', mode: 'out-in' } : false

// Add class to body to control animations
useHead({
  bodyAttrs: {
    class: appConfig.site.animations ? '' : 'no-animations',
  },
})

useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: `${appConfig.site.title} RSS Feed`,
      href: '/rss.xml',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
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
  <NuxtLayout>
    <NuxtPage :transition="pageTransition" />
  </NuxtLayout>
</template>
