<script setup lang="ts">
const {
  href = '#main-content',
  label = 'Skip to content',
} = defineProps<{
  /** The target element to skip to */
  href?: string
  /** The link label text */
  label?: string
}>()
</script>

<template>
  <a
    :href="href"
    class="skip-link text-[var(--color-primary)] px-3 py-2 bg-[var(--color-background)] transition-all start-16 absolute z-50 backdrop-blur-lg -top-full focus:top-4"
  >
    {{ label }}
  </a>
</template>

<style scoped>
.skip-link {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.skip-link:focus {
  clip: auto;
  clip-path: none;
  height: auto;
  width: auto;
}
</style>
