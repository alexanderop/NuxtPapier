<script setup lang="ts">
import { siteConfig } from '~/utils/site.config'

interface Props {
  title?: string
  description?: string
  date?: string
  readingTime?: number
  author?: string
  tags?: string[]
}

const {
  title,
  description,
  date,
  readingTime,
  author = siteConfig.author?.name,
  tags,
} = defineProps<Props>()

const formattedDate = date
  ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  : ''
</script>

<template>
  <div
    class="flex flex-col h-full w-full relative overflow-hidden"
    style="background: #0a0a0a"
  >
    <!-- Gradient accent top -->
    <div class="h-1 left-0 right-0 top-0 absolute" style="background: linear-gradient(to right, #8a4ed9, #6a3cb5, #aa74fd)" />

    <!-- Background pattern -->
    <div class="opacity-5 inset-0 absolute">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blog-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="1" fill="#8a4ed9" />
            <path d="M0 40 L80 40 M40 0 L40 80" stroke="#8a4ed9" stroke-width="0.5" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blog-pattern)" />
      </svg>
    </div>

    <!-- Content container -->
    <div class="px-20 py-16 flex flex-1 flex-col relative">
      <!-- Header -->
      <div class="mb-16 flex items-center justify-between">
        <div class="flex gap-4 items-center">
          <div
            class="text-2xl text-white font-bold rounded-xl flex h-12 w-12 items-center justify-center"
            style="background: #8a4ed9"
          >
            N
          </div>
          <div
            class="text-3xl font-bold"
            style="color: #ffffff"
          >
            {{ siteConfig.name }}
          </div>
        </div>

        <!-- Tags -->
        <div v-if="tags && tags.length > 0" class="flex gap-3">
          <span
            v-for="(tag, index) in tags.slice(0, 3)"
            :key="index"
            class="text-lg font-medium px-4 py-2 rounded-full"
            style="background: rgba(138, 78, 217, 0.2); color: #d4c4f1"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex flex-1 flex-col max-w-5xl justify-center">
        <!-- Article label -->
        <div
          class="text-xl font-medium mb-6 flex gap-3 items-center"
          style="color: #aa74fd"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          BLOG POST
        </div>

        <!-- Title -->
        <h1
          class="text-7xl leading-tight font-bold mb-8"
          style="color: oklch(var(--brand-900))"
        >
          {{ title || 'Untitled Post' }}
        </h1>

        <!-- Description -->
        <p
          v-if="description"
          class="text-3xl leading-relaxed mb-12 max-w-4xl"
          style="color: #d4c4f1"
        >
          {{ description }}
        </p>

        <!-- Author info -->
        <div class="flex gap-6 items-center">
          <div class="flex gap-4 items-center">
            <div
              class="text-xl font-bold rounded-full flex h-14 w-14 items-center justify-center"
              style="background: rgba(138, 78, 217, 0.15); color: #d4c4f1"
            >
              {{ author?.charAt(0) || 'A' }}
            </div>
            <div>
              <div
                class="text-xl font-semibold"
                style="color: #ffffff"
              >
                {{ author || 'Anonymous' }}
              </div>
              <div
                class="text-lg"
                style="color: #aa74fd"
              >
                Author
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="pt-12 flex items-center justify-between"
        style="border-top: 1px solid rgba(138, 78, 217, 0.3)"
      >
        <div class="flex gap-8 items-center">
          <div
            v-if="formattedDate"
            class="text-xl flex gap-2 items-center"
            style="color: #d4c4f1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {{ formattedDate }}
          </div>
          <div
            v-if="readingTime"
            class="text-xl flex gap-2 items-center"
            style="color: #d4c4f1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {{ readingTime }} min read
          </div>
        </div>
        <div
          class="text-xl font-medium"
          style="color: #aa74fd"
        >
          {{ siteConfig.url.replace(/^https?:\/\//, '') }}
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
</style>
