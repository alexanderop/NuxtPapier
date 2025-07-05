import presetWind4 from '@unocss/preset-wind4'
import { presetWebFonts } from 'unocss'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind4(), presetWebFonts({
    provider: 'google',
    fonts: {
      sans: ['Inter'],
      mono: ['IBM Plex Mono:400,500,600,700'],
      serif: ['Merriweather'],
      display: ['Bebas Neue'],
      body: ['Inter'],
      heading: ['Inter'],
      monospace: ['IBM Plex Mono:400,500,600,700'],
    },
  })],
  theme: {
    colors: {
      'primary': 'var(--color-primary)',
      'secondary': 'var(--color-secondary)',
      'background': 'var(--color-background)',
      'surface': 'var(--color-surface)',
      'text': 'var(--color-text)',
      'primary-hover': 'var(--color-primary-hover)',
      'secondary-hover': 'var(--color-secondary-hover)',
      'border': 'var(--color-border)',
      'text-muted': 'var(--color-text-muted)',
    },
    fontFamily: {
      'mono': '"IBM Plex Mono", ui-monospace, Menlo, Monaco, monospace',
    },
  },
  shortcuts: {
    'max-w-app': 'max-w-3xl',
    'container-app': 'mx-auto max-w-3xl px-4',
  },
})
