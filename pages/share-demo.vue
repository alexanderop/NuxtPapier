<script setup lang="ts">
const demoPost = {
  title: 'Social Share Component Demo',
  description: 'Learn how to use the BaseShareLinks component to add beautiful social sharing buttons to your blog posts.',
}

// Track which variant is active for demo
const activeVariant = ref<'inline' | 'floating'>('inline')
</script>

<template>
  <div class="py-12 min-h-screen">
    <div class="mx-auto px-4 max-w-3xl">
      <h1 class="text-4xl font-bold mb-8">
        Social Share Component Demo
      </h1>

      <div class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">
          Overview
        </h2>
        <p class="text-[var(--color-text-muted)] mb-4">
          The BaseShareLinks component provides beautiful, themed social sharing buttons that match your blog's aesthetic.
          It supports two variants: inline (integrated into content) and floating (fixed position).
        </p>
      </div>

      <!-- Variant Selector -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">
          Select Variant
        </h3>
        <div class="flex gap-4">
          <button
            class="font-medium px-4 py-2 rounded-lg transition-colors" :class="[
              activeVariant === 'inline'
                ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                : 'bg-[var(--color-surface)] text-[var(--color-text)]',
            ]"
            @click="activeVariant = 'inline'"
          >
            Inline
          </button>
          <button
            class="font-medium px-4 py-2 rounded-lg transition-colors" :class="[
              activeVariant === 'floating'
                ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                : 'bg-[var(--color-surface)] text-[var(--color-text)]',
            ]"
            @click="activeVariant = 'floating'"
          >
            Floating
          </button>
        </div>
      </div>

      <!-- Demo Content -->
      <article class="p-8 rounded-lg bg-[var(--color-surface)]">
        <h2 class="text-3xl font-bold mb-4">
          {{ demoPost.title }}
        </h2>
        <p class="text-[var(--color-text-muted)] mb-8">
          Published on {{ new Date().toLocaleDateString() }}
        </p>

        <div class="max-w-none prose">
          <p>
            This is a demo blog post to showcase the social share functionality. The share buttons below
            (or to the left if using floating variant) allow readers to easily share your content on their
            favorite social platforms.
          </p>

          <h3>Features</h3>
          <ul>
            <li>Beautiful hover effects with smooth transitions</li>
            <li>Support for WhatsApp, Facebook, X (Twitter), Telegram, Pinterest, and Email</li>
            <li>Copy link functionality with visual feedback</li>
            <li>Fully themed for light and dark modes</li>
            <li>Responsive design that adapts to mobile screens</li>
          </ul>

          <h3>Color Theming</h3>
          <p>
            The share buttons automatically adapt to your site's color scheme:
          </p>
          <ul>
            <li>Light mode: Uses surface color with primary hover state</li>
            <li>Dark mode: Uses translucent surface color for subtle depth</li>
          </ul>

          <h3>Accessibility</h3>
          <p>
            All share buttons include proper ARIA labels and keyboard navigation support,
            ensuring your content is shareable by everyone.
          </p>
        </div>

        <!-- Inline Share Links Demo -->
        <BaseShareLinks
          v-if="activeVariant === 'inline'"
          :title="demoPost.title"
          :description="demoPost.description"
          variant="inline"
        />
      </article>

      <!-- Floating Share Links Demo -->
      <BaseShareLinks
        v-if="activeVariant === 'floating'"
        :title="demoPost.title"
        :description="demoPost.description"
        variant="floating"
      />

      <!-- Usage Examples -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-6">
          Usage Examples
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-2">
              Basic Usage (Inline)
            </h3>
            <pre class="p-4 rounded-lg bg-[var(--color-surface)] overflow-x-auto"><code>&lt;BaseShareLinks
  :title="post.title"
  :description="post.description"
  variant="inline"
/&gt;</code></pre>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">
              Floating Sidebar
            </h3>
            <pre class="p-4 rounded-lg bg-[var(--color-surface)] overflow-x-auto"><code>&lt;BaseShareLinks
  :title="post.title"
  :description="post.description"
  variant="floating"
/&gt;</code></pre>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">
              Custom URL
            </h3>
            <pre class="p-4 rounded-lg bg-[var(--color-surface)] overflow-x-auto"><code>&lt;BaseShareLinks
  :url="customShareUrl"
  :title="post.title"
  :description="post.description"
  variant="inline"
/&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- Props Documentation -->
      <div class="mt-12">
        <h2 class="text-2xl font-semibold mb-6">
          Component Props
        </h2>

        <div class="overflow-x-auto">
          <table class="text-left w-full">
            <thead>
              <tr class="border-b border-[var(--color-border)]">
                <th class="font-medium p-4">
                  Prop
                </th>
                <th class="font-medium p-4">
                  Type
                </th>
                <th class="font-medium p-4">
                  Default
                </th>
                <th class="font-medium p-4">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[var(--color-border)]">
                <td class="text-sm font-mono p-4">
                  url
                </td>
                <td class="text-sm p-4">
                  string
                </td>
                <td class="text-sm p-4">
                  current URL
                </td>
                <td class="text-sm p-4">
                  The URL to share
                </td>
              </tr>
              <tr class="border-b border-[var(--color-border)]">
                <td class="text-sm font-mono p-4">
                  title
                </td>
                <td class="text-sm p-4">
                  string
                </td>
                <td class="text-sm p-4">
                  ''
                </td>
                <td class="text-sm p-4">
                  The title of the content
                </td>
              </tr>
              <tr class="border-b border-[var(--color-border)]">
                <td class="text-sm font-mono p-4">
                  description
                </td>
                <td class="text-sm p-4">
                  string
                </td>
                <td class="text-sm p-4">
                  ''
                </td>
                <td class="text-sm p-4">
                  Description for platforms that support it
                </td>
              </tr>
              <tr class="border-b border-[var(--color-border)]">
                <td class="text-sm font-mono p-4">
                  variant
                </td>
                <td class="text-sm p-4">
                  'inline' | 'floating'
                </td>
                <td class="text-sm p-4">
                  'inline'
                </td>
                <td class="text-sm p-4">
                  Display variant of the share buttons
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
