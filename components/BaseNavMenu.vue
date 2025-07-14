<script setup lang="ts">
const {
  items,
} = defineProps<{
  /** Navigation menu items */
  items: {
    label: string
    to: string
  }[]
}>()

const route = useRoute()
const [menuOpen, toggleMenu] = useToggle(false)

const menuListBaseClasses = 'mt-4 grid w-44 grid-cols-2 place-content-center gap-2'
const menuListDesktopClasses = 'sm:mt-0 sm:flex sm:w-auto sm:gap-x-5 sm:gap-y-0 sm:items-center'
const menuItemStyles = '[&>li>a]:block [&>li>a]:px-4 [&>li>a]:py-3 [&>li>a]:text-center [&>li>a]:font-medium sm:[&>li>a]:px-2 sm:[&>li>a]:py-1 [&>li>button]:font-medium'

watchEffect(() => {
  if (route.path) {
    toggleMenu(false)
  }
})
</script>

<template>
  <nav
    class="flex flex-col w-full items-center sm:ms-2 sm:py-0 sm:flex-row sm:justify-end sm:space-x-4"
  >
    <BaseButton
      variant="ghost"
      size="sm"
      class="self-end sm:hidden"
      :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
      :aria-expanded="menuOpen.toString()"
      aria-controls="menu-items"
      :icon="menuOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3-20-solid'"
      @click="() => toggleMenu()"
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
      <li v-for="item in items" :key="item.to" class="flex col-span-2 items-center justify-center">
        <BaseNavLink :to="item.to">
          {{ item.label }}
        </BaseNavLink>
      </li>
      <slot />
    </ul>
  </nav>
</template>
