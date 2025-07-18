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

          <!-- Main content area with constrained width -->
          <div class="grid-main-wrapper">
            <div class="grid-main">
              <slot />
            </div>
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
  margin: 0 auto;
  width: 100%;
}

/* Mobile-first: Single column */
.grid-layout-container {
  grid-template-columns: 1fr;
  grid-template-areas: 'main';
  padding: 0;
  gap: 0;
}

.grid-left,
.grid-right {
  display: none;
}

.grid-main-wrapper {
  grid-area: main;
  width: 100%;
}

.grid-main {
  width: 100%;
  max-width: 100%;
  min-width: 0; /* Prevent grid blowout */
  overflow: hidden; /* Contain overflowing content */
}

/* Desktop layout with 3 columns */
@media (min-width: 1024px) {
  .grid-layout-container {
    grid-template-columns: 1fr minmax(0, 48rem) 1fr;
    grid-template-areas: 'left main right';
    padding: 0 2rem;
    gap: 2rem;
    max-width: 100%;
  }

  .grid-left {
    grid-area: left;
    display: flex;
    justify-content: flex-end;
    padding-right: 0;
  }

  .grid-left > * {
    width: 100%;
    max-width: 250px;
  }

  .grid-right {
    grid-area: right;
    display: flex;
    justify-content: flex-start;
    padding-left: 0;
  }

  .grid-right > * {
    width: 100%;
    max-width: 250px;
  }

  .grid-main-wrapper {
    grid-area: main;
    display: flex;
    justify-content: center;
  }

  .grid-main {
    width: 100%;
    max-width: 48rem; /* max-w-3xl - matches header width */
    padding: 0 1rem;
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
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'main right';
  }

  .grid-layout-container:has(.grid-left > *):not(:has(.grid-right > *)) {
    grid-template-columns: 1fr 1fr;
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

/* Extra large screens */
@media (min-width: 1280px) {
  .grid-layout-container {
    padding: 0 3rem;
  }

  .grid-left > *,
  .grid-right > * {
    max-width: 300px;
  }
}
</style>
