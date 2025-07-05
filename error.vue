<script setup lang="ts">
const { error } = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })

const errorMessages: Record<number | 'default', {
  title: string
  description: string
  icon: string
  ascii: string
}> = {
  404: {
    title: 'Oops! Lost in cyberspace',
    description: 'This page went on vacation and forgot to leave a forwarding address.',
    icon: 'i-heroicons-map',
    ascii: `
       ___
      /   \\
     | 404 |
      \\___/
        |
      __|__
     /     \\
    | O   O |
    |   >   |
    |  ___  |
     \\_____/
    `,
  },
  500: {
    title: 'Server needs coffee',
    description: 'Our hamsters stopped running. We\'re getting them back on the wheel!',
    icon: 'i-heroicons-fire',
    ascii: `
      ___
     |o o|
     | > |
     |___|
    /|   |\\
   / |   | \\
  /  |___|  \\
    // | \\\\
   //  |  \\\\
    `,
  },
  default: {
    title: 'Something weird happened',
    description: 'Even we don\'t know what went wrong. That\'s... concerning.',
    icon: 'i-heroicons-question-mark-circle',
    ascii: `
     _____
    |     |
    | ??? |
    |_____|
      | |
     /   \\
    |     |
    |_____|
    `,
  },
}

const errorInfo = errorMessages[error.statusCode] || errorMessages.default
</script>

<template>
  <div class="px-4 flex min-h-screen items-center justify-center">
    <div class="text-center max-w-2xl">
      <!-- ASCII Art -->
      <div class="mb-6 flex justify-center">
        <pre class="text-4xl text-gray-600 leading-none font-mono select-none dark:text-gray-400">{{ errorInfo.ascii }}</pre>
      </div>

      <h1 class="text-6xl text-gray-900 font-bold mb-4 animate-pulse dark:text-gray-100">
        {{ error.statusCode }}
      </h1>

      <h2 class="text-2xl text-gray-800 font-semibold mb-4 dark:text-gray-200">
        {{ errorInfo.title }}
      </h2>

      <p class="text-lg text-gray-600 mb-8 dark:text-gray-400">
        {{ errorInfo.description }}
      </p>

      <div class="space-y-4">
        <button
          class="bg-gradient-to-r text-white font-medium px-8 py-4 rounded-lg inline-flex transform transition-all duration-200 items-center from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105"
          @click="handleError"
        >
          <Icon name="i-heroicons-rocket-launch" class="mr-2 h-5 w-5" />
          Beam me home, Scotty!
        </button>

        <div class="text-sm text-gray-500 dark:text-gray-500">
          <button
            class="underline transition-colors hover:text-gray-700 dark:hover:text-gray-300"
            @click="$router.back()"
          >
            ← Take me back to safety
          </button>
        </div>
      </div>

      <!-- Debug info in development -->
      <div v-if="$config.public.nodeEnv === 'development' && error.statusMessage" class="mt-8 p-4 text-left rounded-lg bg-gray-100 dark:bg-gray-800">
        <p class="text-xs text-gray-600 font-mono dark:text-gray-400">
          {{ error.statusMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
