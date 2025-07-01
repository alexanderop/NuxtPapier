<script setup lang="ts">
// Default layout with header
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <BaseHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
  </div>
</template>
