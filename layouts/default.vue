<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="flex flex-col min-h-screen font-mono">
    <BaseHeader />
    <main id="main-content" class="flex-1">
      <div class="container-app">
        <slot />
      </div>
    </main>
    <BaseFooter />
  </div>
</template>
