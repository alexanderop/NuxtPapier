<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <BaseHeader />
    <main id="main-content" class="container-app flex-1">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>
