<script setup>
import AtomDarkModeToggle from '~/components/atoms/AtomDarkModeToggle.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div id="app" class="text-base leading-6 font-sans bg-base min-h-screen transition-colors duration-300">
    <NuxtRouteAnnouncer />
    <!-- Skip Link -->
    <a href="#main-content" class="skip-link sr-only focus:text-white focus:px-4 focus:py-2 focus:rounded focus:bg-blue-600 focus:no-underline focus:left-4 focus:top-4 focus:absolute focus:z-50 focus:not-sr-only">
      Skip to main content
    </a>
    <div class="container-main p-5 max-w-720px">
      <!-- Header -->
      <header class="header-main">
        <div class="mb-3 flex items-center justify-between">
          <h1 class="text-4xl text-base font-bold">
            NuxtPapier
          </h1>
          <AtomDarkModeToggle />
        </div>
        <nav class="flex gap-6" aria-label="Main navigation">
          <NuxtLink
            to="/"
            class="nav-link"
            :class="{ 'nav-active': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="nav-link"
            :class="{ 'nav-active': $route.path.startsWith('/blog') }"
          >
            Blog
          </NuxtLink>
        </nav>
      </header>

      <!-- Main Content -->
      <main id="main-content">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="mt-16 pt-8 border-t border-base">
        <div class="text-sm text-muted text-center">
          <p>&copy; {{ currentYear }} NuxtPapier. Built with Nuxt 3.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
html {
  color-scheme: light dark;
}

html.dark {
  color-scheme: dark;
}

* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
