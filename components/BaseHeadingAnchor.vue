<script setup lang="ts">
const {
  id,
  text,
  level = 2,
} = defineProps<{
  id: string
  text: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}>()

const { copy, copied } = useClipboard()
const route = useRoute()

async function copyLink() {
  const url = `${window.location.origin}${route.path}#${id}`
  await copy(url)
}

const HeadingTag = computed(() => `h${level}`)
</script>

<template>
  <component
    :is="HeadingTag"
    :id="id"
    class="group relative scroll-mt-20"
  >
    <slot>{{ text }}</slot>

    <!-- Anchor link -->
    <button
      type="button"
      class="opacity-0 transition-opacity top-1/2 absolute focus:opacity-100 group-hover:opacity-100 -translate-y-1/2 -left-6"
      :aria-label="`Copy link to ${text}`"
      @click="copyLink"
    >
      <Icon
        v-if="!copied"
        name="i-heroicons-hashtag"
        class="text-[var(--color-text-muted)] h-5 w-5 hover:text-[var(--color-primary)]"
      />
      <Icon
        v-else
        name="i-heroicons-check"
        class="text-green-600 h-5 w-5"
      />
    </button>
  </component>
</template>
