<script setup lang="ts">
const config = useAppConfig()
const transition = config.site.animations ? { name: 'page', mode: 'out-in' as const } : false

// Use command palette composable
const palette = useCommandPalette()

// Add class to body to control animations
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

// Keyboard shortcut handler
function handleKeyDown(e: KeyboardEvent) {
  // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    palette.open()
  }
}

// Set up keyboard event listener
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage :transition="transition" />
    </NuxtLayout>

    <!-- Command Palette -->
    <TheCommandPalette
      :open="palette.isOpen.value"
      @close="palette.close"
    />
  </div>
</template>
