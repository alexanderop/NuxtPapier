<script setup lang="ts">
const {
  noMarginTop = false,
} = defineProps<{
  /** Whether to disable automatic top margin */
  noMarginTop?: boolean
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="flex w-full items-center"
    :class="[{ 'mt-auto': !noMarginTop }]"
  >
    <div class="py-6 flex flex-col w-full items-center justify-between sm:py-4 sm:flex-row-reverse">
      <BaseSocials centered />

      <div class="my-2 flex flex-col whitespace-nowrap items-center sm:flex-row">
        <span>Copyright © {{ currentYear }}</span>

        <span class="hidden sm:inline">&nbsp;|&nbsp;</span>

        <span>All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>
