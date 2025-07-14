<script setup lang="ts">
import { SHARE_LINKS } from '~/constants'

const {
  url = '',
  title = '',
  description = '',
  variant = 'inline',
} = defineProps<{
  /** The URL to share (defaults to current page URL) */
  url?: string
  /** Title of the content being shared */
  title?: string
  /** Description of the content being shared */
  description?: string
  /** Display variant: inline or floating sidebar */
  variant?: 'inline' | 'floating'
}>()

// Get the full URL - if not provided, use current location
const shareUrl = computed(() => {
  if (url)
    return url
  if (import.meta.client) {
    const locationResult = fromThrowable(() => window.location.href)()
    return locationResult.match(
      href => href,
      () => '', // fallback to empty string if window.location fails
    )
  }
  return ''
})

// Copy link functionality
const { copy, copied, isSupported } = useClipboard({
  copiedDuring: 2000,
  source: shareUrl, // 2 seconds timeout to match original behavior
})
</script>

<template>
  <div
    :class="[
      variant === 'floating'
        ? 'fixed left-8 top-1/2 -translate-y-1/2 z-10 lg:left-4 <md:hidden'
        : 'flex items-center gap-4 flex-wrap py-6 border-t border-border mt-12 <md:flex-col <md:items-start <md:gap-3',
    ]"
  >
    <div v-if="variant === 'inline'" class="text-sm text-text-muted font-medium">
      Share this post:
    </div>

    <div
      class="flex gap-2 items-center" :class="[
        variant === 'floating' && 'flex-col gap-3',
      ]"
    >
      <BaseButton
        v-for="shareLink in SHARE_LINKS"
        :key="shareLink.name"
        :href="shareLink.getUrl(shareUrl, title, description)"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        size="md"
        :icon="shareLink.icon"
        :title="`Share on ${shareLink.name}`"
        :aria-label="`Share on ${shareLink.name}`"
        class="transition-all hover:text-primary !p-2 !bg-transparent hover:scale-110"
      />

      <!-- Copy link button -->
      <BaseButton
        v-if="isSupported"
        variant="ghost"
        size="md"
        :icon="copied ? 'mdi:check' : 'mdi:link-variant'"
        :title="copied ? 'Copied!' : 'Copy link'"
        :aria-label="copied ? 'Copied!' : 'Copy link'"
        class="transition-all relative hover:text-primary !p-2 !bg-transparent hover:scale-110"
        @click="copy()"
      >
        <!-- Tooltip for copied state -->
        <span
          class="text-xs text-background mb-2 px-2 py-1 rounded bg-text pointer-events-none whitespace-nowrap transition-all duration-200 bottom-full left-1/2 absolute -translate-x-1/2" :class="[
            copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          ]"
        >
          Copied!
        </span>
      </BaseButton>
    </div>
  </div>
</template>
