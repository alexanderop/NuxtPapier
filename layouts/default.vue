<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <BaseHeader />
    <BaseContainer class="flex-1">
      <main id="main-content">
        <slot />
      </main>
    </BaseContainer>
    <BaseFooter />
  </div>
</template>
