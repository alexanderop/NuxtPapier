<script setup lang="ts">
const { error } = defineProps<{
  /** The error object containing status and message information */
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
    description: 'This page went on vacation and forgot to leave a forwarding address.',
    icon: 'i-heroicons-map',
    title: 'Oops! Lost in cyberspace',
  },
  500: {
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
    description: 'Our hamsters stopped running. We\'re getting them back on the wheel!',
    icon: 'i-heroicons-fire',
    title: 'Server needs coffee',
  },
  default: {
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
    description: 'Even we don\'t know what went wrong. That\'s... concerning.',
    icon: 'i-heroicons-question-mark-circle',
    title: 'Something weird happened',
  },
}

const errorInfo = errorMessages[error.statusCode] || errorMessages.default
</script>

<template>
  <div class="px-4 flex min-h-screen items-center justify-center">
    <div class="text-center max-w-2xl">
      <!-- ASCII Art -->
      <div class="mb-6 flex justify-center">
        <pre class="text-4xl text-[var(--color-gray-600)] leading-none font-mono select-none dark:text-[var(--color-gray-400)]">{{ errorInfo.ascii }}</pre>
      </div>

      <h1 class="text-6xl text-[var(--color-gray-900)] font-bold mb-4 animate-pulse dark:text-[var(--color-gray-100)]">
        {{ error.statusCode }}
      </h1>

      <h2 class="text-2xl text-[var(--color-gray-800)] font-semibold mb-4 dark:text-[var(--color-gray-200)]">
        {{ errorInfo.title }}
      </h2>

      <p class="text-lg text-[var(--color-gray-600)] mb-8 dark:text-[var(--color-gray-400)]">
        {{ errorInfo.description }}
      </p>

      <div class="space-y-4">
        <button
          type="button"
          class="bg-gradient-to-r text-[var(--color-background)] font-medium px-8 py-4 rounded-lg inline-flex transform transition-all duration-200 items-center from-[var(--color-info)] to-[var(--color-alert-note-border)] hover:shadow-lg hover:scale-105"
          @click="handleError"
        >
          <Icon
            name="i-heroicons-rocket-launch"
            class="mr-2 h-5 w-5"
          />
          Beam me home, Scotty!
        </button>

        <div class="text-sm text-[var(--color-gray-500)]">
          <button
            type="button"
            class="underline transition-colors hover:text-[var(--color-gray-700)] dark:hover:text-[var(--color-gray-300)]"
            @click="$router.back()"
          >
            ← Take me back to safety
          </button>
        </div>
      </div>

      <!-- Debug info in development -->
      <div
        v-if="$config.public.nodeEnv === 'development' && error.statusMessage"
        class="mt-8 p-4 text-left rounded-lg bg-[var(--color-gray-100)] dark:bg-[var(--color-gray-800)]"
      >
        <p class="text-xs text-[var(--color-gray-600)] font-mono dark:text-[var(--color-gray-400)]">
          {{ error.statusMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
