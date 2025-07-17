<script setup lang="ts">
import TheCommandPalette from './TheCommandPalette.vue'

const appConfig = useAppConfig()
const route = useRoute()

// Use a standard ref instead of useToggle
const menuOpen = ref(false)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

// Use modal store for opening command palette
const modalStore = useModalStore()

const navItems = [
  { label: 'Tags', to: '/tags' },
  { label: 'Posts', to: '/posts' },
  { label: 'About', to: '/about' },
]

const menuItemStyles = '[&>li>a]:block [&>li>a]:px-4 [&>li>a]:py-3 [&>li>a]:text-center [&>li>a]:font-medium sm:[&>li>a]:px-2 sm:[&>li>a]:py-1 [&>li>button]:font-medium'

watch(
  () => route.path,
  () => {
    // Close menu on route change
    menuOpen.value = false
  },
)
</script>

<template>
  <header>
    <BaseSkipLink />
    <div class="bg-[var(--color-header-bg)] w-full">
      <div
        id="nav-container"
        class="container-app py-4 flex flex-col items-center justify-between relative sm:py-6 sm:flex-row"
      >
        <NuxtLink
          to="/"
          class="text-xl leading-8 font-semibold py-1 whitespace-nowrap absolute sm:text-2xl sm:leading-none sm:static"
        >
          {{ appConfig.site.title }}
        </NuxtLink>
        <nav
          id="nav-menu"
          class="flex flex-col w-full items-center sm:ms-2 sm:py-0 sm:flex-row sm:justify-end sm:space-x-4"
        >
          <BaseMobileMenuToggle
            id="menu-btn"
            :open="menuOpen"
            aria-controls="menu-items"
            @toggle="toggleMenu"
          />
          <ul
            id="menu-items"
            class="sm:mt-0 sm:flex sm:gap-x-5 sm:w-auto sm:items-center" :class="[
              menuItemStyles,
              // Mobile styles: toggle between 'grid' and 'hidden'
              menuOpen
                ? 'grid mt-4 w-44 grid-cols-2 place-content-center gap-2'
                : 'hidden',
            ]"
          >
            <li v-for="item in navItems" :key="item.to" class="flex col-span-2 items-center justify-center">
              <BaseNavLink :to="item.to">
                {{ item.label }}
              </BaseNavLink>
            </li>
            <li class="flex col-span-2 items-center justify-center sm:col-span-1">
              <SearchButton @click="modalStore.openModal(TheCommandPalette)" />
            </li>
            <li v-if="appConfig.site.lightAndDarkMode" class="flex col-span-2 items-center justify-center sm:col-span-1">
              <BaseToggle />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
