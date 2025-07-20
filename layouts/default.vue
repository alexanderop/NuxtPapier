<script setup lang="ts">
// Default layout component providing the standard page structure
// with header, main content area, and footer
</script>

<template>
  <div class="font-mono flex flex-col min-h-screen">
    <div class="grid grid-cols-1 sm:grid-cols-5">
      <TheHeader class="col-span-1 sm:col-start-2 sm:col-end-5" />
    </div>

    <main class="flex-1 w-full">
      <slot />
    </main>

    <div class="grid grid-cols-1 sm:grid-cols-5">
      <TheFooter class="col-span-1 sm:col-start-2 sm:col-end-5" />
    </div>
  </div>
</template>
