<script setup lang="ts">
const {
  noMarginTop = false,
} = defineProps<{
  noMarginTop?: boolean
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="w-full" :class="[{ 'mt-auto': !noMarginTop }]">
    <div class="container-app">
      <div class="py-6 flex flex-col items-center justify-between sm:py-4 sm:flex-row-reverse">
        <BaseSocials centered />
        <div class="my-2 flex flex-col whitespace-nowrap items-center sm:flex-row">
          <span>Copyright © {{ currentYear }}</span>
          <span class="hidden sm:inline">&nbsp;|&nbsp;</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </div>
  </footer>
</template>
