<script setup lang="ts">
import { siteConfig } from '~/utils/site.config'

interface Props {
  title?: string
  author?: string
}

const {
  title,
  author = siteConfig.author?.name,
} = defineProps<Props>()
</script>

<template>
  <div
    style="
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #2d3748;
      font-family: 'IBM Plex Sans', sans-serif;
      position: relative;
      padding: 40px;
    "
  >
    <!-- Rounded border frame -->
    <div
      style="
        width: 100%;
        height: 100%;
        border: 6px solid #ed64a6;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 60px;
        position: relative;
      "
    >
      <!-- Title section -->
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          text-align: center;
        "
      >
        <h1
          style="
            font-size: 80px;
            font-weight: 800;
            color: #ed64a6;
            line-height: 1.1;
            margin: 0;
            text-align: center;
            max-width: 100%;
            font-family: 'IBM Plex Sans', sans-serif;
          "
        >
          {{ title || 'Untitled Post' }}
        </h1>
      </div>

      <!-- Bottom section with author and website -->
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
        "
      >
        <!-- Left side: Author -->
        <div
          style="
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 24px;
            color: #a0aec0;
          "
        >
          <span style="color: #a0aec0;">by</span>
          <span
            style="
              background: #ed64a6;
              color: #2d3748;
              padding: 8px 16px;
              border-radius: 6px;
              font-weight: 600;
            "
          >
            {{ author || 'Anonymous' }}
          </span>
        </div>

                 <!-- Right side: Site name -->
         <div
           style="
             font-size: 28px;
             color: #a0aec0;
             font-weight: 500;
           "
         >
           {{ siteConfig.name }}
         </div>
      </div>
    </div>
  </div>
</template>
