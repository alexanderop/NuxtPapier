<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  caption?: string
  loading?: 'lazy' | 'eager'
}

const {
  src,
  alt = '',
  caption,
  loading = 'lazy',
} = defineProps<Props>()

const isZoomed = ref(false)

function toggleZoom() {
  isZoomed.value = !isZoomed.value
  if (isZoomed.value) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
}

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <figure class="prose-img-figure">
    <div class="prose-img-wrapper" @click="toggleZoom">
      <img
        v-bind="$attrs"
        :src="src"
        :alt="alt"
        :loading="loading"
        class="prose-img"
        :class="{ 'prose-img-zoomed': isZoomed }"
      >
      <div v-if="!isZoomed" class="prose-img-zoom-hint">
        <Icon name="i-ph-magnifying-glass-plus" />
      </div>
    </div>
    <figcaption v-if="alt || caption" class="prose-img-caption">
      {{ caption || alt }}
    </figcaption>
  </figure>

  <Teleport to="body">
    <Transition name="zoom">
      <div
        v-if="isZoomed"
        class="prose-img-overlay"
        @click="toggleZoom"
      >
        <img
          :src="src"
          :alt="alt"
          class="prose-img-zoomed-image"
        >
        <button class="prose-img-close" @click.stop="toggleZoom">
          <Icon name="i-ph-x" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.prose-img-figure {
  margin: 2rem 0;
}

.prose-img-wrapper {
  position: relative;
  cursor: zoom-in;
  overflow: hidden;
  border-radius: 0.5rem;
  background: oklch(var(--surface));
}

.prose-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s;
}

.prose-img-wrapper:hover .prose-img {
  transform: scale(1.02);
}

.prose-img-zoom-hint {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.5rem;
  background: oklch(0 0 0 / 0.7);
  color: white;
  border-radius: 0.375rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.prose-img-wrapper:hover .prose-img-zoom-hint {
  opacity: 1;
}

.prose-img-caption {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: oklch(var(--text-muted));
}

.prose-img-overlay {
  position: fixed;
  inset: 0;
  background: oklch(0 0 0 / 0.9);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  padding: 2rem;
}

.prose-img-zoomed-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.prose-img-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.75rem;
  background: oklch(var(--surface) / 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid oklch(var(--border));
  border-radius: 0.5rem;
  color: oklch(var(--text));
  cursor: pointer;
  transition: all 0.2s;
}

.prose-img-close:hover {
  background: oklch(var(--surface));
  transform: scale(1.1);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.3s;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}
</style>
