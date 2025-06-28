<script setup lang="ts">
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
try {
  if (typeof defineWebSite === 'function') {
    defineWebSite({
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
    })
  }
}
catch {
  // SEO module not loaded, ignore
}

try {
  if (typeof defineOrganization === 'function') {
    defineOrganization({
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
      sameAs: Object.values(siteConfig.social || {}).filter(Boolean),
    })
  }
}
catch {
  // SEO module not loaded, ignore
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
