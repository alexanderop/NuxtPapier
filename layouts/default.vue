<script setup>
import DarkModeToggle from '~/components/DarkModeToggle.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div id="app" class="surface-primary min-h-screen">
    <NuxtRouteAnnouncer />
    <!-- Skip Link -->
    <a href="#main-content" class="sr-only focus:text-white focus:px-4 focus:py-2 focus:rounded focus:bg-brand-500 focus:left-4 focus:top-4 focus:absolute focus:z-50 focus:not-sr-only">
      Skip to main content
    </a>
    <div class="container-main">
      <!-- Header -->
      <header class="py-8">
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-4xl text-heading font-bold">
            NuxtPapier
          </h1>
          <DarkModeToggle />
        </div>
        <nav class="flex gap-6" aria-label="Main navigation">
          <NuxtLink
            to="/"
            class="text-body transition-colors hover:text-brand-500"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-body transition-colors hover:text-brand-500"
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
      <footer class="mt-16 pt-8 border-t border-border">
        <div class="text-center">
          <p class="text-sm text-muted">
            &copy; {{ currentYear }} NuxtPapier. Built with Nuxt 3.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
