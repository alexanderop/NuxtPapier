<script setup lang="ts">
interface Props {
  src: string
  title?: string
  caption?: string
  poster?: string
  aspectRatio?: string
  autoplay?: boolean
  provider?: 'youtube' | 'vimeo' | 'custom'
}

const {
  src,
  title,
  caption,
  poster,
  aspectRatio = '16/9',
  autoplay = false,
  provider = 'youtube',
} = defineProps<Props>()

const isLoaded = ref(autoplay)

const embedUrl = computed(() => {
  if (provider === 'youtube') {
    const videoId = extractYouTubeId(src)
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1',
    })
    return `https://www.youtube.com/embed/${videoId}?${params}`
  }

  if (provider === 'vimeo') {
    const videoId = extractVimeoId(src)
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      title: '0',
      byline: '0',
      portrait: '0',
    })
    return `https://player.vimeo.com/video/${videoId}?${params}`
  }

  return src
})

const containerStyle = computed(() => ({
  aspectRatio: aspectRatio.replace('/', ' / '),
}))

function loadVideo() {
  isLoaded.value = true
}

function extractYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
  return match?.[1] || url
}

function extractVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match?.[1] || url
}
</script>

<template>
  <div class="video-wrapper">
    <div class="video-container" :style="containerStyle">
      <div v-if="!isLoaded" class="video-placeholder" @click="loadVideo">
        <NuxtImg
          v-if="poster"
          :src="poster"
          :alt="title || 'Video thumbnail'"
          class="video-poster"
          loading="lazy"
        />
        <div class="video-play-button">
          <Icon name="i-ph-play-fill" />
        </div>
      </div>
      <iframe
        v-else
        :src="embedUrl"
        :title="title"
        class="video-iframe"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
    <figcaption v-if="caption" class="video-caption">
      {{ caption }}
    </figcaption>
  </div>
</template>

<style scoped>
.video-wrapper {
  margin: 2rem 0;
}

.video-container {
  position: relative;
  width: 100%;
  background: oklch(var(--surface));
  border-radius: 0.5rem;
  overflow: hidden;
}

.video-placeholder {
  position: absolute;
  inset: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-button {
  position: relative;
  width: 4rem;
  height: 4rem;
  background: oklch(0 0 0 / 0.8);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.2s;
  z-index: 1;
}

.video-placeholder:hover .video-play-button {
  background: oklch(0 0 0 / 0.9);
  transform: scale(1.1);
}

.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.video-caption {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: oklch(var(--text-muted));
}
</style>
