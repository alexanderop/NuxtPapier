<template>
  <div id="app" class="text-gray-800 leading-relaxed font-sans bg-white min-h-screen">
    <NuxtRouteAnnouncer />
    <div class="mx-auto px-4 py-8 max-w-4xl lg:px-8 sm:px-6">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
/* UnoCSS will handle most styling, keeping minimal global styles */

/* Content rendering prose styles */
.prose {
  @apply max-w-none text-gray-700 leading-7;
}

.prose h1 {
  @apply text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight;
}

.prose h2 {
  @apply text-2xl font-semibold text-gray-900 mt-8 mb-4 leading-tight;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 mt-6 mb-3 leading-tight;
}

.prose h4 {
  @apply text-lg font-semibold text-gray-900 mt-6 mb-3 leading-tight;
}

.prose p {
  @apply mb-4 text-gray-700 leading-relaxed;
}

.prose ul,
.prose ol {
  @apply mb-4 pl-8 space-y-2;
}

.prose li {
  @apply text-gray-700;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 ml-0 mb-4 pl-4 text-gray-600 italic;
}

.prose code {
  @apply bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200;
}

.prose pre code {
  @apply bg-transparent p-0 text-sm;
}

.prose a {
  @apply text-primary-600 hover:text-primary-700 hover:underline transition-colors;
}

.prose strong {
  @apply font-semibold text-gray-900;
}

.prose em {
  @apply italic;
}
</style>
