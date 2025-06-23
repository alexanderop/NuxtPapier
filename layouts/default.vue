<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <div id="app">
    <NuxtRouteAnnouncer />
    <!-- Skip Link -->
    <a href="#main-content">
      Skip to main content
    </a>
    <div>
      <!-- Header -->
      <header>
        <div>
          <h1>
            NuxtPapier
          </h1>
        </div>
        <nav aria-label="Main navigation">
          <NuxtLink
            to="/"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/blog"
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
      <footer>
        <div>
          <p>&copy; {{ currentYear }} NuxtPapier. Built with Nuxt 3.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

