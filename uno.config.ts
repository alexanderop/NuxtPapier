import presetWind4 from '@unocss/preset-wind4'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
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
  },
})
