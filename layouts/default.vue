<script setup lang="ts">
// Default layout with 5x5 grid structure
</script>

<template>
  <div class="font-mono grid grid-cols-5 grid-rows-5 min-h-screen">
    <!-- Header - spans columns 2-4 in row 1 -->
    <TheHeader class="col-start-2 row-start-1 col-end-5 row-end-2" />

    <!-- Left Sidebar - spans row 2-4 in column 1 -->
    <div
      id="left-sidebar"
      class="col-start-1 row-start-2 col-end-2 row-end-5"
    />

    <!-- Main Content - spans columns 2-4 and rows 2-4 -->
    <main
      id="main-content"
      class="col-start-2 row-start-2 col-end-5 row-end-5"
    >
      <slot />
    </main>

    <!-- Right Sidebar - spans row 2-4 in column 5 -->
    <div
      id="right-sidebar"
      class="col-start-5 row-start-2 col-end-6 row-end-5"
    />

    <!-- Footer - spans columns 2-4 in row 5 -->
    <TheFooter class="col-start-2 row-start-5 col-end-5 row-end-6" />
  </div>
</template>
