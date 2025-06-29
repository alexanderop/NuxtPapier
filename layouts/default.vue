<script setup>
// Initialize theme on page load
useTheme()

// Initialize global shortcuts
const { isSearchOpen, isHelpOpen, isThemeCustomizerOpen, isBlogQuickJumpOpen } = useGlobalShortcuts()

const currentYear = new Date().getFullYear()

// Mobile menu state
const isMobileMenuOpen = ref(false)

function toggleThemeCustomizer() {
  isThemeCustomizerOpen.value = !isThemeCustomizerOpen.value
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Close mobile menu when clicking on navigation links
function handleNavClick() {
  closeMobileMenu()
}

// Computed property for burger menu icon
const mobileMenuIcon = computed(() => {
  return isMobileMenuOpen.value ? 'ph:x' : 'ph:list'
})

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }
  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
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
      <header class="py-4 sm:py-8">
        <div class="mb-4 flex items-center justify-between sm:mb-6">
          <NuxtLink to="/" class="text-2xl text-heading font-bold transition-colors sm:text-4xl hover:text-brand-500">
            {{ siteConfig.name }}
          </NuxtLink>

          <!-- Desktop Actions -->
          <div class="gap-2 hidden items-center md:flex">
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

          <!-- Mobile Burger Menu Button -->
          <BaseButton
            :icon="mobileMenuIcon"
            icon-only
            :title="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            class="md:hidden"
            @click="toggleMobileMenu"
          />
        </div>

        <!-- Desktop Navigation -->
        <nav class="gap-6 hidden md:flex" aria-label="Main navigation">
          <NuxtLink
            to="/"
            class="text-body pb-1 transition-all relative hover:text-brand-500"
            active-class="text-brand-600 dark:text-brand-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-body pb-1 transition-all relative hover:text-brand-500"
            active-class="text-brand-600 dark:text-brand-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500"
          >
            Blog
          </NuxtLink>
          <NuxtLink
            to="/tags"
            class="text-body pb-1 transition-all relative hover:text-brand-500"
            active-class="text-brand-600 dark:text-brand-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-500"
          >
            Tags
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Overlay -->
        <Transition name="mobile-menu-overlay">
          <div
            v-if="isMobileMenuOpen"
            class="bg-black bg-opacity-50 inset-0 fixed z-40 md:hidden"
            @click="closeMobileMenu"
          />
        </Transition>

        <!-- Mobile Menu -->
        <Transition name="mobile-menu">
          <div
            v-if="isMobileMenuOpen"
            class="border-l border-border bg-surface h-full max-w-[90vw] w-80 right-0 top-0 fixed z-50 md:hidden"
          >
            <div class="p-6">
              <!-- Mobile Menu Header -->
              <div class="mb-8 flex items-center justify-between">
                <div class="text-xl text-heading font-bold">
                  Menu
                </div>
                <BaseButton
                  icon="ph:x"
                  icon-only
                  title="Close menu"
                  @click="closeMobileMenu"
                />
              </div>

              <!-- Mobile Navigation Links -->
              <nav class="mb-8" aria-label="Mobile navigation">
                <ul class="space-y-4">
                  <li>
                    <NuxtLink
                      to="/"
                      class="text-lg text-body px-4 py-3 rounded-lg block transition-colors hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900"
                      active-class="text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900 border-l-2 border-brand-500"
                      @click="handleNavClick"
                    >
                      Home
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/blog"
                      class="text-lg text-body px-4 py-3 rounded-lg block transition-colors hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900"
                      active-class="text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900 border-l-2 border-brand-500"
                      @click="handleNavClick"
                    >
                      Blog
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/tags"
                      class="text-lg text-body px-4 py-3 rounded-lg block transition-colors hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900"
                      active-class="text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900 border-l-2 border-brand-500"
                      @click="handleNavClick"
                    >
                      Tags
                    </NuxtLink>
                  </li>
                </ul>
              </nav>

              <!-- Mobile Actions -->
              <div class="pt-6 border-t border-border space-y-3">
                <BaseButton
                  class="w-full"
                  justify="start"
                  @click="isSearchOpen = true; closeMobileMenu()"
                >
                  <BaseIcon name="ph:magnifying-glass" size="sm" />
                  <span>Search</span>
                  <BaseKbd keys="/" class="ml-auto" />
                </BaseButton>

                <BaseButton
                  class="w-full"
                  justify="start"
                  @click="isHelpOpen = true; closeMobileMenu()"
                >
                  <BaseIcon name="ph:keyboard" size="sm" />
                  <span>Keyboard Shortcuts</span>
                  <BaseKbd keys="?" class="ml-auto" />
                </BaseButton>

                <BaseButton
                  class="w-full"
                  justify="start"
                  @click="toggleThemeCustomizer(); closeMobileMenu()"
                >
                  <BaseIcon name="ph:palette" size="sm" />
                  <span>Customize Theme</span>
                  <BaseKbd keys="g s" class="ml-auto" />
                </BaseButton>
              </div>
            </div>
          </div>
        </Transition>
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

    <!-- Blog Quick Jump Modal -->
    <BlogQuickJump
      :is-open="isBlogQuickJumpOpen"
      @update:is-open="isBlogQuickJumpOpen = $event"
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

/* Mobile Menu Transitions */
.mobile-menu-overlay-enter-active,
.mobile-menu-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-overlay-enter-from,
.mobile-menu-overlay-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(100%);
}
</style>
