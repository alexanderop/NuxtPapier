<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div class="container-app">
    <div class="py-12">
      <h1 class="text-4xl font-bold mb-4">
        {{ appConfig.site.title }}
      </h1>
      <p class="text-gray-600 mb-8">
        {{ appConfig.site.desc }}
      </p>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Button Examples
          </h2>
          <div class="flex flex-wrap gap-4">
            <BaseButton>Primary Button</BaseButton>
            <BaseButton variant="secondary">
              Secondary Button
            </BaseButton>
            <BaseButton variant="ghost">
              Ghost Button
            </BaseButton>
            <BaseButton variant="link">
              Link Button
            </BaseButton>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Button Sizes
          </h2>
          <div class="flex flex-wrap gap-4 items-center">
            <BaseButton size="sm">
              Small
            </BaseButton>
            <BaseButton size="md">
              Medium
            </BaseButton>
            <BaseButton size="lg">
              Large
            </BaseButton>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Button with Icons
          </h2>
          <div class="flex flex-wrap gap-4">
            <BaseButton icon="i-heroicons-arrow-left">
              Back
            </BaseButton>
            <BaseButton icon="i-heroicons-arrow-right" icon-position="right">
              Next
            </BaseButton>
            <BaseButton variant="secondary" icon="i-heroicons-pencil">
              Edit
            </BaseButton>
            <BaseButton variant="ghost" icon="i-heroicons-trash">
              Delete
            </BaseButton>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Button States
          </h2>
          <div class="flex flex-wrap gap-4">
            <BaseButton disabled>
              Disabled
            </BaseButton>
            <BaseButton loading>
              Loading
            </BaseButton>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Button as Links
          </h2>
          <div class="flex flex-wrap gap-4">
            <BaseButton to="/about">
              Internal Link
            </BaseButton>
            <BaseButton href="https://nuxt.com" variant="secondary">
              External Link
            </BaseButton>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
