<script setup lang="ts">
// Blog layout with sidebar grid for table of contents
</script>

<template>
  <div class="font-mono flex flex-col min-h-screen">
    <BaseHeader />
    <main id="main-content" class="flex-1">
      <div class="blog-grid-wrapper">
        <div class="blog-grid-container">
          <slot />
        </div>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped>
.blog-grid-wrapper {
  width: 100%;
}

.blog-grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 48rem;
}

@media (min-width: 1024px) {
  .blog-grid-container {
    grid-template-columns: 1fr 48rem 1fr;
    max-width: 100%;
    padding: 0;
  }
  
  .blog-grid-container > :first-child {
    grid-column: 1;
    justify-self: end;
    padding-right: 2rem;
    width: 280px;
  }
  
  .blog-grid-container > :last-child {
    grid-column: 2;
    padding: 0 1rem;
  }
}

@media (min-width: 1280px) {
  .blog-grid-container {
    grid-template-columns: 1fr 48rem 1fr;
  }
}
</style>
