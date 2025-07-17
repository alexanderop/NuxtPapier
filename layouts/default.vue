<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="font-mono flex flex-col min-h-screen">
    <TheHeader />

    <main
      id="main-content"
      class="flex-1"
    >
      <div class="container-app">
        <slot />
      </div>
    </main>

    <TheFooter />
  </div>
</template>
