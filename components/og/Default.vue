<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

const { title, description } = defineProps<Props>()
</script>

<template>
  <div class="bg-gradient-to-br p-16 flex flex-col h-full w-full from-blue-50 to-indigo-100">
    <!-- Background pattern -->
    <div class="opacity-10 inset-0 absolute">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>

    <!-- Content -->
    <div class="text-center flex flex-1 flex-col items-center justify-center relative">
      <div class="text-5xl text-gray-800 font-bold mb-4">
        {{ siteConfig.name }}
      </div>
      <h1 class="text-7xl text-gray-900 font-bold mb-6">
        {{ title || siteConfig.title }}
      </h1>
      <p class="text-3xl text-gray-600 max-w-4xl">
        {{ description || siteConfig.description }}
      </p>
    </div>

    <!-- Footer -->
    <div class="text-2xl text-gray-500 text-center relative">
      {{ siteConfig.url.replace(/^https?:\/\//, '') }}
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

div {
  font-family: 'Inter', sans-serif;
}
</style>
