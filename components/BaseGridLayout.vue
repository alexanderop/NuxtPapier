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
    gridClass: 'grid-cols-1',
    mainClass: 'px-4 max-w-prose mx-auto w-full',
    showLeftSidebar: false,
    showRightSidebar: false,
  },
  'default': {
    gridClass: 'grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: false,
    showRightSidebar: false,
  },
  'full-width': {
    gridClass: 'grid-cols-1',
    mainClass: 'w-full',
    showLeftSidebar: false,
    showRightSidebar: false,
  },
  'left-sidebar': {
    gridClass: 'grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: true,
    showRightSidebar: false,
  },
  'right-sidebar': {
    gridClass: 'grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 sm:px-0 sm:col-start-2 sm:col-end-5',
    showLeftSidebar: false,
    showRightSidebar: true,
  },
  'with-sidebars': {
    gridClass: 'grid-cols-1 sm:grid-cols-5',
    mainClass: 'px-4 col-span-1 sm:px-0 sm:col-start-2 sm:col-end-5',
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
    class="grid"
    :class="currentVariant.gridClass"
  >
    <!-- Left Sidebar -->
    <aside
      v-if="hasLeftSidebar"
      id="left-sidebar"
      class="hidden sm:col-start-1 sm:col-end-2 sm:block"
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
      class="hidden sm:col-start-5 sm:col-end-6 sm:block"
      aria-label="Right sidebar"
    >
      <div
        id="right-sidebar-content"
        class="px-4 top-4 sticky"
      >
        <slot name="sidebar-right" />
      </div>
    </aside>
  </div>
</template>
