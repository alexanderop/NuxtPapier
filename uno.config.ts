import presetTypography from '@unocss/preset-typography'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography({
      cssExtend: {

        // Prose Pre Component styles
        '.prose-pre': {
          'background-color': 'var(--shiki-default-bg)',
          'border-radius': '0.5rem',
          'margin': '1.5rem 0',
          'overflow-x': 'hidden',
        },

        '.prose-pre-body': {
          'background-color': 'transparent',
          'border-bottom-left-radius': '0.5rem',
          'border-bottom-right-radius': '0.5rem',
          'font-size': '0.875rem',
          'line-height': '1.6',
          'margin': '0',
          'overflow-x': 'auto',
          'padding': '1rem 0',
        },

        '.prose-pre-body .line': {
          'display': 'block',
          'min-height': '1.4rem',
          'padding': '0 1rem',
        },

        '.prose-pre-body .line span': {
          'background-color': 'transparent !important',
        },

        // Diff highlighting
        '.prose-pre-body .line.diff': {
          position: 'relative',
        },

        '.prose-pre-body .line.diff.add': {
          'background-color': 'rgba(34, 197, 94, 0.05)',
        },

        '.prose-pre-body .line.diff.add::after': {
          'background': 'linear-gradient(to right, rgba(34, 197, 94, 0.1) 0%, transparent 30%)',
          'content': '""',
          'inset': '0',
          'pointer-events': 'none',
          'position': 'absolute',
          'z-index': '0',
        },

        '.prose-pre-body .line.diff.add::before': {
          'color': 'rgb(34 197 94)',
          'content': '"+"',
          'font-weight': '600',
          'left': '0.5rem',
          'opacity': '0.7',
          'position': 'absolute',
          'z-index': '1',
        },

        '.prose-pre-body .line.diff.remove': {
          'background-color': 'rgba(244, 63, 94, 0.05)',
        },

        '.prose-pre-body .line.diff.remove::after': {
          'background': 'linear-gradient(to right, rgba(244, 63, 94, 0.1) 0%, transparent 30%)',
          'content': '""',
          'inset': '0',
          'pointer-events': 'none',
          'position': 'absolute',
          'z-index': '0',
        },

        '.prose-pre-body .line.diff.remove::before': {
          'color': 'rgb(244 63 94)',
          'content': '"-"',
          'font-weight': '600',
          'left': '0.5rem',
          'opacity': '0.7',
          'position': 'absolute',
          'z-index': '1',
        },

        // Line highlighting
        '.prose-pre-body .line.highlight, .prose-pre-body .line.highlighted': {
          'background-color': 'rgba(139, 92, 246, 0.1)', // Subtle purple background
          'position': 'relative',
        },

        '.prose-pre-body .line.highlight::before, .prose-pre-body .line.highlighted::before': {
          background: 'var(--color-primary)',
          bottom: '0',
          content: '""',
          left: '0',
          position: 'absolute',
          top: '0',
          width: '3px',
        },

        '.prose-pre-body code': {
          'background-color': 'transparent',
          'display': 'inline-block',
          'min-width': 'max-content',
          'padding': '0',
          'width': '100%',
        },

        // Line numbers
        '.prose-pre-body.line-numbers .line': {
          'padding-left': '3.5rem',
          'position': 'relative',
        },

        '.prose-pre-body.line-numbers .line::before': {
          'color': 'var(--color-text-muted)',
          'content': 'attr(line)',
          'font-family': 'var(--font-mono)',
          'font-size': '0.75rem',
          'left': '1rem',
          'opacity': '0.5',
          'position': 'absolute',
          'user-select': 'none',
        },

        // Scrollbar
        '.prose-pre-body::-webkit-scrollbar': {
          height: '6px',
        },

        '.prose-pre-body::-webkit-scrollbar-thumb': {
          'background': 'var(--color-border)',
          'border-radius': '3px',
        },

        '.prose-pre-body::-webkit-scrollbar-thumb:hover': {
          background: 'var(--color-text-muted)',
        },

        '.prose-pre-body::-webkit-scrollbar-track': {
          background: 'var(--color-surface)',
        },

        '.prose-pre-head': {
          'align-items': 'center',
          'display': 'flex',
          'justify-content': 'space-between',
          'padding': '0.75rem 1rem',
        },

        // Shiki code blocks styling
        '.shiki': {
          'background-color': 'transparent !important',
          'margin': '0',
          'padding': '1rem',
        },

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

        // Dark mode specific
        ':root.dark .prose-pre': {
          'background-color': 'var(--shiki-dark-bg, #1e1e1e)',
        },

        ':root.dark .prose-pre-body .line.diff.add': {
          'background-color': 'rgba(34, 197, 94, 0.08)',
        },

        ':root.dark .prose-pre-body .line.diff.remove': {
          'background-color': 'rgba(244, 63, 94, 0.08)',
        },

        ':root.dark .prose-pre-body .line.highlight, :root.dark .prose-pre-body .line.highlighted': {
          'background-color': 'rgba(139, 92, 246, 0.2)', // Purple highlight in dark mode
        },

        ':root:not(.dark) .prose-pre-body .line.diff.add': {
          'background-color': 'rgba(34, 197, 94, 0.06)',
        },

        ':root:not(.dark) .prose-pre-body .line.diff.remove': {
          'background-color': 'rgba(244, 63, 94, 0.06)',
        },

        ':root:not(.dark) .prose-pre-body .line.highlight, :root:not(.dark) .prose-pre-body .line.highlighted': {
          'background-color': 'rgba(139, 92, 246, 0.08)',
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
  safelist: [
    // Dynamic margin-left classes for TableOfContentsNode indentation
    ...Array.from({ length: 10 }, (_, i) => `ml-${i * 3}`),
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
