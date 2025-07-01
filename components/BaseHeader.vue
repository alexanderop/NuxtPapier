<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  { to: '/posts', label: 'Posts' },
  { to: '/tags', label: 'Tags' },
  { to: '/about', label: 'About' },
]

const navLinkClasses = 'hover:text-[var(--color-primary)] transition-colors'
const activeClass = 'text-[var(--color-primary)]'

const menuListBaseClasses = 'mt-4 grid w-44 grid-cols-2 place-content-center gap-2'
const menuListDesktopClasses = 'sm:mt-0 sm:flex sm:w-auto sm:gap-x-5 sm:gap-y-0 sm:items-center'
const menuItemStyles = '[&>li>a]:block [&>li>a]:px-4 [&>li>a]:py-3 [&>li>a]:text-center [&>li>a]:font-medium sm:[&>li>a]:px-2 sm:[&>li>a]:py-1'

function getNavClasses(path: string) {
  return [navLinkClasses, isActive(path) ? activeClass : '']
}

function isActive(path: string) {
  const currentPath = route.path.endsWith('/') && route.path !== '/'
    ? route.path.slice(0, -1)
    : route.path

  const currentPathArray = currentPath.split('/').filter(p => p.trim())
  const pathArray = path.split('/').filter(p => p.trim())

  return currentPath === path || currentPathArray[0] === pathArray[0]
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

watchEffect(() => {
  if (route.path) {
    menuOpen.value = false
  }
})
</script>

<template>
  <header>
    <a
      id="skip-to-content"
      href="#main-content"
      class="text-[var(--color-primary)] px-3 py-2 bg-[var(--color-background)] transition-all start-16 absolute z-50 backdrop-blur-lg -top-full focus:top-4"
    >
      Skip to content
    </a>
    <div
      id="nav-container"
      class="mx-auto flex flex-col max-w-7xl items-center justify-between sm:flex-row"
    >
      <div
        id="top-nav-wrap"
        class="p-4 bg-[var(--color-background)] flex w-full items-center justify-between relative sm:py-6"
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
          <BaseButton
            id="menu-btn"
            variant="ghost"
            size="sm"
            class="self-end sm:hidden"
            :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
            :aria-expanded="menuOpen.toString()"
            aria-controls="menu-items"
            :icon="menuOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'"
            @click="toggleMenu"
          />
          <ul
            id="menu-items"
            :class="[
              menuListBaseClasses,
              menuItemStyles,
              menuListDesktopClasses,
              { hidden: !menuOpen },
            ]"
          >
            <li v-for="item in navItems" :key="item.to" class="flex col-span-2 items-center justify-center">
              <NuxtLink
                :to="item.to"
                :class="getNavClasses(item.to)"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
            <li class="flex col-span-1 items-center justify-center">
              <BaseButton
                to="/search"
                variant="ghost"
                size="sm"
                :class="getNavClasses('/search')"
                aria-label="search"
                title="Search"
                icon="i-heroicons-magnifying-glass"
              >
                <span class="sr-only">Search</span>
              </BaseButton>
            </li>
            <li v-if="appConfig.site.lightAndDarkMode" class="flex col-span-1 items-center justify-center">
              <BaseToggle />
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <BaseHr />
  </header>
</template>
