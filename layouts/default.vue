<script setup>
// Initialize theme on page load
useTheme()

// Initialize global shortcuts
const { isSearchOpen, isHelpOpen, isThemeCustomizerOpen } = useGlobalShortcuts()

const currentYear = new Date().getFullYear()

function toggleThemeCustomizer() {
  isThemeCustomizerOpen.value = !isThemeCustomizerOpen.value
}
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
          <div class="text-4xl text-heading font-bold">
            {{ siteConfig.name }}
          </div>
          <div class="flex gap-2 items-center">
            <BaseButton
              title="Search (Press /)"
              @click="isSearchOpen = true"
            >
              <BaseIcon name="ph:magnifying-glass" size="sm" />
              <BaseKbd keys="/" />
            </BaseButton>
            <BaseButton
              icon="ph:keyboard"
              icon-only
              title="Keyboard shortcuts (Press ?)"
              @click="isHelpOpen = true"
            />
            <BaseButton
              icon="ph:palette"
              icon-only
              title="Customize theme (Press g s)"
              @click="toggleThemeCustomizer"
            />
          </div>
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
          <p class="text-sm text-muted mb-2">
            {{ siteConfig.copyright || `© ${currentYear} ${siteConfig.name}` }}
          </p>
          <p class="text-sm">
            <NuxtLink to="/feeds" class="text-muted inline-flex gap-1 transition-colors items-center hover:text-brand-500">
              <BaseIcon name="ph:rss" size="xs" />
              Subscribe
            </NuxtLink>
          </p>
        </div>
      </footer>
    </div>

    <!-- Search Modal -->
    <BlogSearch v-model="isSearchOpen" />

    <!-- Keyboard Shortcuts Help Modal -->
    <KeyboardShortcutsHelp
      :is-open="isHelpOpen"
      @update:is-open="isHelpOpen = $event"
    />

    <!-- Theme Customizer Panel -->
    <Teleport to="body">
      <Transition name="theme-panel">
        <div
          v-if="isThemeCustomizerOpen"
          class="theme-panel-overlay"
          @click="isThemeCustomizerOpen = false"
        >
          <div
            class="theme-panel"
            @click.stop
          >
            <ThemeCustomizer />
            <button
              class="theme-panel-close"
              title="Close theme customizer"
              @click="isThemeCustomizerOpen = false"
            >
              <BaseIcon name="ph:x" size="sm" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
.theme-panel-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4;
}

.theme-panel {
  @apply relative mt-16 mr-4;
}

.theme-panel-close {
  @apply absolute -top-2 -right-2 w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-text hover:border-brand-500 transition-colors;
}

.theme-panel-enter-active,
.theme-panel-leave-active {
  transition: opacity 0.3s ease;
}

.theme-panel-enter-from,
.theme-panel-leave-to {
  opacity: 0;
}

.theme-panel-enter-active .theme-panel,
.theme-panel-leave-active .theme-panel {
  transition: transform 0.3s ease;
}

.theme-panel-enter-from .theme-panel,
.theme-panel-leave-to .theme-panel {
  transform: translateX(100%);
}
</style>
