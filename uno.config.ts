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
          'padding': '0',
          'margin': '1.5rem 0',
        },
        'pre code': {
          'background-color': 'transparent',
          'padding': '1rem',
          'color': 'inherit',
          'font-size': '0.875rem',
          'line-height': '1.7',
          'display': 'block',
        },
        // Shiki code blocks styling
        '.shiki': {
          'background-color': 'transparent !important',
          'padding': '1rem',
          'margin': '0',
        },
        '.shiki code': {
          'background-color': 'transparent',
          'padding': '0',
          'font-family': 'var(--font-mono)',
        },
        '.shiki .line': {
          'display': 'block',
          'min-height': '1rem',
        },
        // Line highlighting
        '.shiki .highlighted': {
          'background-color': 'var(--color-primary)',
          'opacity': '0.1',
          'display': 'block',
          'margin': '0 -1rem',
          'padding': '0 1rem',
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
        sans: ['Inter:400,500,600,700,800,900'],
        mono: ['Fira Code:400,500,600,700'],
        serif: ['Merriweather'],
        display: ['Bebas Neue'],
        body: ['Inter:400,500,600,700,800,900'],
        heading: ['Inter:400,500,600,700,800,900'],
        monospace: ['Fira Code:400,500,600,700'],
      },
    }),
  ],
  theme: {
    colors: {
      'primary': 'var(--color-primary)',
      'secondary': 'var(--color-secondary)',
      'background': 'var(--color-background)',
      'surface': 'var(--color-surface)',
      'surface-base': 'var(--color-surface)',
      'surface-subtle': 'var(--color-background)',
      'text': 'var(--color-text)',
      'text-base': 'var(--color-text)',
      'primary-hover': 'var(--color-primary-hover)',
      'secondary-hover': 'var(--color-secondary-hover)',
      'border': 'var(--color-border)',
      'text-muted': 'var(--color-text-muted)',
    },
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
    },
  },
  shortcuts: {
    'max-w-app': 'max-w-3xl',
    'container-app': 'mx-auto max-w-3xl px-4',
  },
})
