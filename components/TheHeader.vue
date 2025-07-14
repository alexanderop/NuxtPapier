<script setup lang="ts">
import TheCommandPalette from './TheCommandPalette.vue'

const appConfig = useAppConfig()

// Use modal store for opening command palette
const modalStore = useModalStore()

const navItems = [
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <header>
    <BaseSkipToContent />
    <div class="bg-[var(--color-header-bg)] w-full">
      <div
        id="nav-container"
        class="container-app flex flex-col items-center justify-between sm:flex-row"
      >
        <div
          id="top-nav-wrap"
          class="py-4 flex w-full items-center justify-between relative sm:py-6"
        >
          <BaseLogo
            :title="appConfig.site.title"
            class="absolute sm:static"
          />
          <BaseNavMenu
            id="nav-menu"
            :items="navItems"
          >
            <li class="flex col-span-2 items-center justify-center sm:col-span-1">
              <SearchButton @click="modalStore.openModal(TheCommandPalette)" />
            </li>
            <li v-if="appConfig.site.lightAndDarkMode" class="flex col-span-2 items-center justify-center sm:col-span-1">
              <BaseToggle />
            </li>
          </BaseNavMenu>
        </div>
      </div>
    </div>
  </header>
</template>
