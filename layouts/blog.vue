<template>
  <div class="font-mono flex flex-col min-h-screen">
    <TheHeader />

    <main
      id="main-content"
      class="flex-1"
    >
      <div class="blog-grid-wrapper">
        <div class="blog-grid-container">
          <slot />
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>
.blog-grid-wrapper {
  width: 100%;
  overflow-x: hidden;
}

.blog-grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 0 auto;
  padding: 0 1rem;
  max-width: 48rem;
  overflow-wrap: break-word;
}

@media (min-width: 1024px) {
  .blog-grid-container {
    grid-template-columns: minmax(280px, 1fr) 48rem minmax(1rem, 1fr);
    max-width: 100%;
    padding: 0 2rem;
    gap: 3rem;
  }

  .blog-grid-container > :first-child {
    grid-column: 1;
    justify-self: center;
    max-width: 280px;
    width: 100%;
  }

  .blog-grid-container > :last-child {
    grid-column: 2;
    padding: 0;
  }
}

@media (min-width: 1280px) {
  .blog-grid-container {
    padding: 0 3rem;
  }
}
</style>
