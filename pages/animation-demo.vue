<script setup lang="ts">
// Enable staggered animations on this page
useStaggeredAnimation()

// SEO meta
useSeoMeta({
  title: 'Animation Demo',
  description: 'Demonstration of page transitions and staggered animations',
})
</script>

<template>
  <div class="py-12">
    <h1 class="animate text-4xl font-bold mb-8">
      Page Transition Demo
    </h1>

    <p class="animate text-lg text-[var(--color-text-muted)] mb-6">
      This page demonstrates the smooth page transitions and staggered content animations.
      Navigate between pages to see the transition effect!
    </p>

    <div class="animate mb-8 space-y-4">
      <h2 class="text-2xl font-semibold">
        How it works
      </h2>
      <ul class="text-[var(--color-text-muted)] list-disc list-inside space-y-2">
        <li>Page transitions fade and slide between routes</li>
        <li>Content elements animate in with a staggered effect</li>
        <li>Add the <code class="text-[var(--color-primary)]">.animate</code> class to any element</li>
        <li>Use <code class="text-[var(--color-primary)]">useStaggeredAnimation()</code> in your page</li>
      </ul>
    </div>

    <div class="animate mb-8 gap-4 grid grid-cols-1 md:grid-cols-3">
      <div class="p-6 rounded-lg bg-[var(--color-surface)]">
        <Icon name="mdi:rocket-launch" class="text-3xl text-[var(--color-primary)] mb-2" />
        <h3 class="font-semibold mb-2">
          Fast
        </h3>
        <p class="text-sm text-[var(--color-text-muted)]">
          Smooth 400ms page transitions
        </p>
      </div>
      <div class="p-6 rounded-lg bg-[var(--color-surface)]">
        <Icon name="mdi:animation" class="text-3xl text-[var(--color-primary)] mb-2" />
        <h3 class="font-semibold mb-2">
          Elegant
        </h3>
        <p class="text-sm text-[var(--color-text-muted)]">
          Staggered content animations
        </p>
      </div>
      <div class="p-6 rounded-lg bg-[var(--color-surface)]">
        <Icon name="mdi:code-tags" class="text-3xl text-[var(--color-primary)] mb-2" />
        <h3 class="font-semibold mb-2">
          Simple
        </h3>
        <p class="text-sm text-[var(--color-text-muted)]">
          Easy to implement and customize
        </p>
      </div>
    </div>

    <div class="animate flex gap-4">
      <NuxtLink
        to="/"
        class="text-white px-4 py-2 rounded bg-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        Go Home
      </NuxtLink>
      <NuxtLink
        to="/blog"
        class="text-white px-4 py-2 rounded bg-[var(--color-secondary)] transition-colors hover:bg-[var(--color-secondary-hover)]"
      >
        Visit Blog
      </NuxtLink>
    </div>
  </div>
</template>
