<script setup lang="ts">
import { tryCatch } from '~/utils/tryCatch'

useDark({
  initialValue: 'dark',
})

// Global SEO configuration
useHead({
  htmlAttrs: { lang: siteConfig.language },
  titleTemplate: title => title ? `${title} – ${siteConfig.name}` : siteConfig.title,
  meta: [
    { name: 'theme-color', content: '#0a0a0a' },
  ],
})

// Only define SEO schemas if the functions are available (SEO module loaded)
if (typeof defineWebSite === 'function') {
  tryCatch(Promise.resolve(
    defineWebSite({
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
    }),
  ))
  // Errors are intentionally ignored - SEO module may not be loaded
}

if (typeof defineOrganization === 'function') {
  tryCatch(Promise.resolve(
    defineOrganization({
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
      sameAs: Object.values(siteConfig.social || {}).filter(Boolean),
    }),
  ))
  // Errors are intentionally ignored - SEO module may not be loaded
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
