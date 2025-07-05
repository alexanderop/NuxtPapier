import presetTypography from '@unocss/preset-typography'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography({
      selectorName: 'prose',
      cssExtend: {
        'a': {
          'color': 'var(--color-primary)',
          'text-decoration': 'none',
          'border-bottom': '1px solid transparent',
          'transition': 'border-color 0.2s',
        },
        'a:hover': {
          'border-bottom-color': 'var(--color-primary)',
        },
        'code': {
          'background-color': 'var(--color-surface)',
          'padding': '0.125rem 0.375rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em',
          'color': 'var(--color-primary)',
        },
        'pre': {
          'background-color': 'var(--color-surface)',
          'border': '1px solid var(--color-border)',
          'border-radius': '0.5rem',
          'overflow-x': 'auto',
        },
        'pre code': {
          'background-color': 'transparent',
          'padding': '0',
          'color': 'inherit',
        },
        'blockquote': {
          'border-left': '4px solid var(--color-primary)',
          'padding-left': '1rem',
          'font-style': 'italic',
          'color': 'var(--color-text-muted)',
        },
        'h1, h2, h3, h4, h5, h6': {
          'font-weight': '700',
          'color': 'var(--color-text)',
        },
        'hr': {
          'border-color': 'var(--color-border)',
        },
        'table': {
          'border-collapse': 'collapse',
          'width': '100%',
        },
        'table th': {
          'background-color': 'var(--color-surface)',
          'border': '1px solid var(--color-border)',
          'padding': '0.5rem 1rem',
          'text-align': 'left',
          'font-weight': '600',
        },
        'table td': {
          border: '1px solid var(--color-border)',
          padding: '0.5rem 1rem',
        },
        'img': {
          'border-radius': '0.5rem',
          'margin': '0 auto',
        },
        'ul, ol': {
          'padding-left': '1.5rem',
        },
        'li': {
          margin: '0.25rem 0',
        },
      },
    }),
    presetWebFonts({
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
    }),
  ],
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
      mono: '"IBM Plex Mono", ui-monospace, Menlo, Monaco, monospace',
    },
  },
  shortcuts: {
    'max-w-app': 'max-w-3xl',
    'container-app': 'mx-auto max-w-3xl px-4',
  },
})
