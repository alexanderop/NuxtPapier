<script setup lang="ts">
// Grid layout with left-main-right structure
</script>

<template>
  <div class="font-mono flex flex-col min-h-screen">
    <TheHeader />

    <main
      id="main-content"
      class="flex-1"
    >
      <div class="grid-layout-wrapper">
        <div class="grid-layout-container">
          <!-- Left sidebar area -->
          <aside class="grid-left">
            <div id="grid-left-content" />
          </aside>

          <!-- Main content area -->
          <div class="grid-main">
            <slot />
          </div>

          <!-- Right sidebar area -->
          <aside class="grid-right">
            <div id="grid-right-content" />
          </aside>
        </div>
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<style scoped>
.grid-layout-wrapper {
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

.grid-layout-container {
  display: grid;
  gap: 2rem;
  margin: 0 auto;
  max-width: 100%;
}

/* Mobile-first: Single column */
.grid-layout-container {
  grid-template-columns: 1fr;
  grid-template-areas: 'main';
  padding: 0;
  gap: 0;
  padding-top: 0;
}

.grid-left,
.grid-right {
  display: none;
}

.grid-main {
  grid-area: main;
  width: 100%;
  max-width: 100%;
  min-width: 0; /* Prevent grid blowout */
  overflow: hidden; /* Contain overflowing content */
}

/* Desktop layout with 3 columns */
@media (min-width: 1024px) {
  .grid-layout-container {
    grid-template-columns: minmax(280px, 300px) 1fr minmax(280px, 300px);
    grid-template-areas: 'left main right';
    padding: 0 2rem;
    gap: 3rem;
    max-width: 100%;
  }

  .grid-left {
    grid-area: left;
    display: block;
  }

  .grid-right {
    grid-area: right;
    display: block;
  }

  .grid-main {
    grid-area: main;
    max-width: none;
    overflow: visible; /* Allow overflow on desktop */
  }

  /* Only show sidebars if they have content */
  .grid-left:not(:has(> *)),
  .grid-right:not(:has(> *)) {
    display: none;
  }

  /* Adjust grid when sidebars are empty */
  .grid-layout-container:not(:has(.grid-left > *)):not(:has(.grid-right > *)) {
    grid-template-columns: 1fr;
    grid-template-areas: 'main';
  }

  .grid-layout-container:not(:has(.grid-left > *)):has(.grid-right > *) {
    grid-template-columns: 1fr minmax(280px, 300px);
    grid-template-areas: 'main right';
  }

  .grid-layout-container:has(.grid-left > *):not(:has(.grid-right > *)) {
    grid-template-columns: minmax(280px, 300px) 1fr;
    grid-template-areas: 'left main';
  }

  /* Make sidebars sticky */
  .grid-left > *,
  .grid-right > * {
    position: sticky;
    top: 5rem;
    height: fit-content;
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
  }
}

/* Large screens */
@media (min-width: 1280px) {
  .grid-layout-container {
    padding: 0 3rem;
  }
}
</style>
