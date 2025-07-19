<script setup lang="ts">
// Default layout with 5x5 grid structure
</script>

<template>
  <div class="font-mono grid grid-rows-[auto_1fr_1fr_1fr_auto] grid-cols-1 min-h-screen sm:grid-cols-5">
    <!-- Header - spans full width on mobile, columns 2-4 on desktop -->
    <TheHeader class="col-span-1 row-start-1 row-end-2 sm:col-start-2 sm:col-end-5" />

    <!-- Left Sidebar - hidden on mobile, spans row 2-4 in column 1 on desktop -->
    <aside
      id="left-sidebar"
      class="hidden relative sm:col-start-1 sm:row-start-2 sm:col-end-2 sm:row-end-5 sm:block"
    >
      <div
        id="left-sidebar-content"
        class="px-4 top-0 sticky"
      />
    </aside>

    <!-- Main Content - full width on mobile, spans columns 2-4 on desktop -->
    <main
      id="main-content"
      class="px-4 col-span-1 row-start-2 row-end-5 sm:px-0 sm:col-start-2 sm:col-end-5"
    >
      <slot />
    </main>

    <!-- Right Sidebar - hidden on mobile, spans row 2-4 in column 5 on desktop -->
    <div
      id="right-sidebar"
      class="hidden sm:col-start-5 sm:row-start-2 sm:col-end-6 sm:row-end-5 sm:block"
    />

    <!-- Footer - full width on mobile, spans columns 2-4 on desktop -->
    <TheFooter class="col-span-1 row-start-5 row-end-6 sm:col-start-2 sm:col-end-5" />
  </div>
</template>
