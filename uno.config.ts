import presetTypography from '@unocss/preset-typography'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography({
      cssExtend: {
        // Shiki code blocks styling
        '.shiki': {
          'background-color': 'transparent !important',
          'margin': '0',
          'padding': '1rem',
        },

        // Line highlighting
        '.shiki .highlighted': {
          'background-color': 'var(--color-primary)',
          'display': 'block',
          'margin': '0 -1rem',
          'opacity': '0.1',
          'padding': '0 1rem',
        },

        '.shiki .line': {
          'display': 'block',
          'min-height': '1rem',
        },

        '.shiki code': {
          'background-color': 'transparent',
          'font-family': 'var(--font-mono)',
          'padding': '0',
        },

        'a': {
          'border-bottom': '1px solid transparent',
          'color': 'var(--color-primary)',
          'text-decoration': 'none',
          'transition': 'border-color 0.2s',
        },

        'a:hover': {
          'border-bottom-color': 'var(--color-primary)',
        },

        'blockquote': {
          'border-left': '4px solid var(--color-primary)',
          'color': 'var(--color-text-muted)',
          'font-style': 'italic',
          'padding-left': '1rem',
        },

        'code': {
          'background-color': 'var(--color-surface)',
          'border-radius': '0.25rem',
          'color': 'var(--color-primary)',
          'font-size': '0.875em',
          'padding': '0.125rem 0.375rem',
        },

        'h1, h2, h3, h4, h5, h6': {
          'color': 'var(--color-text)',
          'font-weight': '700',
        },
        'hr': {
          'border-color': 'var(--color-border)',
        },
        'img': {
          'border-radius': '0.5rem',
          'margin': '0 auto',
        },
        'li': {
          margin: '0.25rem 0',
        },
        'pre': {
          'background-color': 'var(--color-surface)',
          'border': '1px solid var(--color-border)',
          'border-radius': '0.5rem',
          'margin': '1.5rem 0',
          'overflow-x': 'auto',
          'padding': '0',
        },
        'pre code': {
          'background-color': 'transparent',
          'color': 'inherit',
          'display': 'block',
          'font-size': '0.875rem',
          'line-height': '1.7',
          'padding': '1rem',
        },
        'table': {
          'border-collapse': 'collapse',
          'width': '100%',
        },
        'table td': {
          border: '1px solid var(--color-border)',
          padding: '0.5rem 1rem',
        },
        'table th': {
          'background-color': 'var(--color-surface)',
          'border': '1px solid var(--color-border)',
          'font-weight': '600',
          'padding': '0.5rem 1rem',
          'text-align': 'left',
        },
        'ul, ol': {
          'padding-left': '1.5rem',
        },
      },
      selectorName: 'prose',
    }),
    presetWebFonts({
      fonts: {
        body: ['Inter:400,500,600,700,800,900'],
        display: ['Bebas Neue'],
        heading: ['Inter:400,500,600,700,800,900'],
        mono: ['Fira Code:400,500,600,700'],
        monospace: ['Fira Code:400,500,600,700'],
        sans: ['Inter:400,500,600,700,800,900'],
        serif: ['Merriweather'],
      },
      provider: 'google',
    }),
  ],
  shortcuts: {
    'container-app': 'mx-auto max-w-3xl px-4',
    'max-w-app': 'max-w-3xl',
  },
  theme: {
    colors: {
      'background': 'var(--color-background)',
      'border': 'var(--color-border)',
      'primary': 'var(--color-primary)',
      'primary-hover': 'var(--color-primary-hover)',
      'secondary': 'var(--color-secondary)',
      'secondary-hover': 'var(--color-secondary-hover)',
      'surface': 'var(--color-surface)',
      'surface-base': 'var(--color-surface)',
      'surface-subtle': 'var(--color-background)',
      'text': 'var(--color-text)',
      'text-base': 'var(--color-text)',
      'text-muted': 'var(--color-text-muted)',
    },
    fontFamily: {
      mono: '"Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  },
})
