<script setup lang="ts">
import { siteConfig } from '~/utils/site.config'

interface Props {
  title?: string
  description?: string
}

const { title, description } = defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col h-full w-full relative overflow-hidden"
    style="background: #0a0a0a"
  >
    <!-- Animated gradient overlay -->
    <div class="opacity-30 inset-0 absolute">
      <div class="inset-0 absolute" style="background: linear-gradient(to top right, rgba(138, 78, 217, 0.3), rgba(106, 60, 181, 0.3), rgba(170, 116, 253, 0.3))" />
    </div>

    <!-- Geometric background pattern -->
    <div class="opacity-10 inset-0 absolute">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geometric" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,0 60,30 30,60 0,30" fill="none" stroke="#8a4ed9" stroke-width="0.5" />
            <circle cx="30" cy="30" r="2" fill="#8a4ed9" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric)" />
      </svg>
    </div>

    <!-- Content container -->
    <div class="px-20 py-16 flex flex-1 flex-col items-center justify-center relative">
      <!-- Logo/Brand -->
      <div class="mb-12 flex gap-4 items-center">
        <div
          class="text-3xl text-white font-bold rounded-2xl flex h-16 w-16 items-center justify-center"
          style="background: #8a4ed9"
        >
          N
        </div>
        <div
          class="text-5xl tracking-tight font-bold"
          style="color: #ffffff"
        >
          {{ siteConfig.name }}
        </div>
      </div>

      <!-- Main title -->
      <h1
        class="text-8xl leading-tight font-bold mb-8 text-center max-w-5xl"
        style="color: oklch(var(--brand-900))"
      >
        {{ title || siteConfig.title }}
      </h1>

      <!-- Description -->
      <p
        class="text-3xl leading-relaxed text-center max-w-4xl"
        style="color: #d4c4f1"
      >
        {{ description || siteConfig.description }}
      </p>
    </div>

    <!-- Bottom accent -->
    <div class="mt-auto relative">
      <!-- Gradient accent line -->
      <div class="h-2" style="background: linear-gradient(to right, #8a4ed9, #6a3cb5, #aa74fd)" />

      <!-- Footer -->
      <div
        class="px-20 py-6 flex items-center justify-between"
        style="background: rgba(20, 20, 20, 0.8)"
      >
        <div
          class="text-2xl font-medium"
          style="color: #aa74fd"
        >
          {{ siteConfig.url.replace(/^https?:\/\//, '') }}
        </div>
        <div
          class="text-xl"
          style="color: #aa74fd"
        >
          Powered by Nuxt
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

/* Define OKLCH colors as CSS variables for this component */
:host {
  --og-brand-50: oklch(98% 0.025 275);
  --og-brand-100: oklch(95% 0.041 275);
  --og-brand-200: oklch(89% 0.074 275);
  --og-brand-400: oklch(71% 0.149 275);
  --og-brand-500: oklch(59% 0.198 275);
  --og-brand-600: oklch(49% 0.182 275);
  --og-brand-700: oklch(40% 0.157 275);
  --og-brand-900: oklch(25% 0.099 275);
}
</style>
