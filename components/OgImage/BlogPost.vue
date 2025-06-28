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
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #121212;
      color: #e066ff;
      font-family: 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      overflow: hidden;
      padding: 40px;
    "
  >
    <!-- Abstract wave background -->
    <div
      style="
        position: absolute;
        top: -30%;
        left: -10%;
        width: 120%;
        height: 120%;
        transform: rotate(-8deg);
        opacity: 0.3;
      "
    >
      <svg
        viewBox="0 0 800 600"
        fill="none"
        style="width: 100%; height: 100%;"
      >
        <path
          d="M0 350C150 250 350 450 500 350S650 250 800 350"
          stroke="#6b30ff"
          stroke-width="160"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Content container -->
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        z-index: 1;
        max-width: 100%;
      "
    >
      <!-- Blog icon -->
      <div
        style="
          margin-bottom: 48px;
          filter: drop-shadow(0 0 24px #e066ff80);
        "
      >
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          stroke="currentColor"
          stroke-width="8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="4" y="4" width="112" height="72" rx="8" />
          <line x1="16" y1="32" x2="104" y2="32" />
          <line x1="16" y1="48" x2="104" y2="48" />
          <line x1="48" y1="64" x2="72" y2="64" />
        </svg>
      </div>

      <!-- Title -->
      <div
        style="
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-align: center;
          max-width: 90%;
          margin-bottom: 24px;
          word-break: break-word;
        "
      >
        {{ title || 'Untitled Post' }}
      </div>

      <!-- Author -->
      <div
        style="
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 12px;
          text-transform: none;
        "
      >
        by {{ author || 'Anonymous' }}
      </div>

      <!-- Website -->
      <div
        style="
          font-size: 24px;
          font-weight: 500;
          color: #a0a0a0;
          text-transform: none;
        "
      >
        {{ siteConfig.url?.replace(/^https?:\/\//, '') || 'example.com' }}
      </div>
    </div>
  </div>
</template>
