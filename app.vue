<script setup>
const appConfig = useAppConfig()

useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/rss+xml',
      title: `${appConfig.site.title} RSS Feed`,
      href: '/rss.xml',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
  </NuxtLayout>
</template>
