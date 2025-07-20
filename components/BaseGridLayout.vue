<script setup lang="ts">
interface GridVariant {
  name: 'default' | 'with-sidebars' | 'left-sidebar' | 'right-sidebar' | 'centered' | 'full-width'
  gridClass: string
  mainClass: string
  showLeftSidebar: boolean
  showRightSidebar: boolean
}

const { variant = 'default' } = defineProps<{
  /** Layout variant determining grid structure and sidebar visibility */
  variant?: GridVariant['name']
}>()

const { $slots } = getCurrentInstance()?.proxy || {}

const gridVariants: Record<GridVariant['name'], Omit<GridVariant, 'name'>> = {
  'centered': {
    gridClass: 'grid-rows-[auto_1fr_auto] grid-cols-1',
    mainClass: 'px-4 max-w-prose mx-auto w-full row-start-2',
    showLeftSidebar: false,
    showRightSidebar: false,
  },
  'default': {
    gridClass: 'grid-rows-[auto_1fr_1fr_1fr_auto] grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 row-start-2 row-end-5 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: false,
    showRightSidebar: false,
  },
  'full-width': {
    gridClass: 'grid-rows-[auto_1fr_auto] grid-cols-1',
    mainClass: 'row-start-2 w-full',
    showLeftSidebar: false,
    showRightSidebar: false,
  },
  'left-sidebar': {
    gridClass: 'grid-rows-[auto_1fr_1fr_1fr_auto] grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 row-start-2 row-end-5 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: true,
    showRightSidebar: false,
  },
  'right-sidebar': {
    gridClass: 'grid-rows-[auto_1fr_1fr_1fr_auto] grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 row-start-2 row-end-5 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: false,
    showRightSidebar: true,
  },
  'with-sidebars': {
    gridClass: 'grid-rows-[auto_1fr_1fr_1fr_auto] grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 row-start-2 row-end-5 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: true,
    showRightSidebar: true,
  },
}

const currentVariant = computed(() => gridVariants[variant])

const hasLeftSidebar = computed(() =>
  currentVariant.value.showLeftSidebar && $slots?.['sidebar-left'],
)

const hasRightSidebar = computed(() =>
  currentVariant.value.showRightSidebar && $slots?.['sidebar-right'],
)
</script>

<template>
  <div
    class="font-mono grid min-h-screen"
    :class="currentVariant.gridClass"
  >
    <!-- Header -->
    <slot
      name="header"
      :class="variant === 'full-width' ? 'col-span-1' : 'col-span-1 row-start-1 row-end-2 sm:col-start-2 sm:col-end-5'"
    >
      <TheHeader :class="variant === 'full-width' ? 'col-span-1' : 'col-span-1 row-start-1 row-end-2 sm:col-start-2 sm:col-end-5'" />
    </slot>

    <!-- Left Sidebar -->
    <aside
      v-if="hasLeftSidebar"
      id="left-sidebar"
      class="hidden sm:col-start-1 sm:row-start-2 sm:col-end-2 sm:row-end-5 sm:block"
      aria-label="Left sidebar"
    >
      <div
        id="left-sidebar-content"
        class="px-4 top-4 sticky"
      >
        <slot name="sidebar-left" />
      </div>
    </aside>

    <!-- Main Content -->
    <main
      id="main-content"
      :class="currentVariant.mainClass"
    >
      <slot />
    </main>

    <!-- Right Sidebar -->
    <aside
      v-if="hasRightSidebar"
      id="right-sidebar"
      class="hidden sm:col-start-5 sm:row-start-2 sm:col-end-6 sm:row-end-5 sm:block"
      aria-label="Right sidebar"
    >
      <div
        id="right-sidebar-content"
        class="px-4 top-4 sticky"
      >
        <slot name="sidebar-right" />
      </div>
    </aside>

    <!-- Footer -->
    <slot
      name="footer"
      :class="variant === 'full-width' || variant === 'centered' ? 'col-span-1' : 'col-span-1 row-start-5 row-end-6 sm:col-start-2 sm:col-end-5'"
    >
      <TheFooter :class="variant === 'full-width' || variant === 'centered' ? 'col-span-1' : 'col-span-1 row-start-5 row-end-6 sm:col-start-2 sm:col-end-5'" />
    </slot>
  </div>
</template>
