<script setup lang="ts">
// Initialize dark mode with dark as default
useDark({
  initialValue: 'dark', // Set dark mode as default
})

// Global SEO configuration
useHead({
  htmlAttrs: { lang: siteConfig.language },
  titleTemplate: title => title ? `${title} – ${siteConfig.name}` : siteConfig.title,
  meta: [
    { name: 'theme-color', content: '#0a0a0a' }, // Dark theme color
  ],
})

// Define the website schema for structured data
defineWebSite({
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
})

// Define organization for rich snippets
defineOrganization({
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logo}`,
  sameAs: Object.values(siteConfig.social || {}).filter(Boolean),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
