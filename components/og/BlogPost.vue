<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  date?: string
  readingTime?: number
}

const { title, description, date, readingTime } = defineProps<Props>()

const formattedDate = date
  ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  : ''
</script>

<template>
  <div class="p-16 bg-white flex flex-col h-full w-full">
    <!-- Background pattern -->
    <div class="opacity-5 inset-0 absolute">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col justify-between relative">
      <!-- Header -->
      <div>
        <div class="text-3xl text-gray-800 font-bold mb-8">
          {{ siteConfig.name }}
        </div>
      </div>

      <!-- Main content -->
      <div class="flex-1">
        <h1 class="text-6xl text-gray-900 leading-tight font-bold mb-6">
          {{ title || 'Untitled Post' }}
        </h1>
        <p v-if="description" class="text-2xl text-gray-600">
          {{ description }}
        </p>
      </div>

      <!-- Footer -->
      <div class="text-gray-500 flex items-center justify-between">
        <div class="flex gap-6 items-center">
          <span v-if="formattedDate" class="text-xl">
            {{ formattedDate }}
          </span>
          <span v-if="readingTime" class="text-xl">
            {{ readingTime }} min read
          </span>
        </div>
        <div class="text-xl">
          {{ siteConfig.url.replace(/^https?:\/\//, '') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

div {
  font-family: 'Inter', sans-serif;
}
</style>
