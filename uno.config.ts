import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
        theme: true,
      },
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography({
      cssExtend: {
        'p': {
          'line-height': '1.5',
          'margin-bottom': '1em',
        },
        'h1, h2, h3, h4, h5, h6': {
          'line-height': '1.3',
          'margin-top': '1.5em',
          'margin-bottom': '0.5em',
          'font-weight': 'bold',
          'color': 'oklch(0.25 0.00 0)',
        },
        '.dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6': {
          color: 'oklch(0.85 0.00 0)',
        },
        'h1': {
          'font-size': '1.5em',
          'margin-top': '0',
        },
        'h2': {
          'font-size': '1.3em',
        },
        'h3': {
          'font-size': '1.1em',
        },
        'h4, h5, h6': {
          'font-size': '1em',
        },
        'strong, b': {
          'font-weight': 'bold',
          'color': 'oklch(0.25 0.00 0)',
        },
        '.dark strong, .dark b': {
          color: 'oklch(0.85 0.00 0)',
        },
        'code': {
          'font-family': 'monospace',
          'background-color': 'oklch(0.96 0.00 0)',
          'color': 'oklch(0.25 0.00 0)',
          'padding': '2px',
          'border-radius': '3px',
        },
        '.dark code': {
          'background-color': 'oklch(0.00 0.00 0)',
          'color': 'oklch(0.85 0.00 0)',
        },
        'pre': {
          'font-family': 'monospace',
          'background-color': 'oklch(0.96 0.00 0)',
          'color': 'oklch(0.25 0.00 0)',
          'padding': '1px 15px',
          'border-radius': '3px',
          'overflow-x': 'auto',
          'margin': '1em 0',
        },
        '.dark pre': {
          'background-color': 'oklch(0.00 0.00 0)',
          'color': 'oklch(0.85 0.00 0)',
        },
        'pre code': {
          'background-color': 'transparent',
          'padding': '0',
          'border-radius': '0',
        },
        'blockquote': {
          'border-left': '3px solid oklch(0.75 0.00 0)',
          'padding-left': '1rem',
          'margin': '1.5rem 0',
          'font-style': 'italic',
          'color': 'oklch(0.45 0.00 0)',
        },
        '.dark blockquote': {
          'border-left-color': 'oklch(0.45 0.00 0)',
          'color': 'oklch(0.65 0.00 0)',
        },
        'hr': {
          'border': 'none',
          'border-top': '1px dashed oklch(0.75 0.00 0)',
          'margin': '2rem 0',
        },
        '.dark hr': {
          'border-top-color': 'oklch(0.45 0.00 0)',
        },
        'table': {
          'border-collapse': 'collapse',
          'width': '100%',
          'margin': '1.5rem 0',
        },
        'th, td': {
          'border': '1px dashed oklch(0.75 0.00 0)',
          'padding': '0.5rem',
          'text-align': 'left',
        },
        '.dark th, .dark td': {
          'border-color': 'oklch(0.45 0.00 0)',
        },
        'th': {
          'font-weight': '600',
          'background-color': 'oklch(0.98 0.00 0)',
        },
        '.dark th': {
          'background-color': 'oklch(0.15 0.00 0)',
        },
        'img': {
          'max-width': '100%',
          'height': 'auto',
          'border-radius': '0.25rem',
        },
        // Link styling - Bear approach
        'a': {
          'color': 'inherit',
          'text-decoration': 'none',
        },
        'a:hover': {
          'text-decoration': 'underline',
        },
        // No underlines for headings
        'h1 a:hover, h2 a:hover, h3 a:hover, h4 a:hover, h5 a:hover, h6 a:hover': {
          'text-decoration': 'none',
        },
        '.prose h1 a, .prose h2 a, .prose h3 a, .prose h4 a, .prose h5 a, .prose h6 a': {
          'text-decoration': 'none',
        },
        '.prose h1 a:hover, .prose h2 a:hover, .prose h3 a:hover, .prose h4 a:hover, .prose h5 a:hover, .prose h6 a:hover': {
          'text-decoration': 'none',
        },
        // Lists
        'ul, ol': {
          'margin': '1rem 0',
          'padding-left': '2rem',
        },
        'li': {
          margin: '0.25rem 0',
        },
      },
    }),
    presetWebFonts({
      themeKey: 'font',
      fonts: {
        mono: 'JetBrains Mono:400,500,600,700',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      // Dark theme colors converted to OKLCH
      background: 'oklch(0.08 0.03 251)', // #000123
      accent: 'oklch(0.62 0.16 251)', // #617bff
      foreground: 'oklch(0.92 0.01 251)', // #eaedf3
      muted: 'oklch(0.18 0.04 251)', // #0c0e4f
      border: 'oklch(0.42 0.12 251)', // #303f8a

      primary: {
        50: 'oklch(0.97 0.02 258)',
        100: 'oklch(0.94 0.05 258)',
        200: 'oklch(0.88 0.10 258)',
        300: 'oklch(0.80 0.15 258)',
        400: 'oklch(0.72 0.18 258)',
        500: 'oklch(0.65 0.17 258)',
        600: 'oklch(0.55 0.18 258)',
        700: 'oklch(0.50 0.20 258)',
        800: 'oklch(0.45 0.18 258)',
        900: 'oklch(0.40 0.16 258)',
        950: 'oklch(0.25 0.12 258)',
      },
      gray: {
        50: 'oklch(0.98 0.00 0)',
        100: 'oklch(0.96 0.00 0)',
        200: 'oklch(0.92 0.00 0)',
        300: 'oklch(0.86 0.00 0)',
        400: 'oklch(0.68 0.00 0)',
        500: 'oklch(0.52 0.00 0)',
        600: 'oklch(0.40 0.00 0)',
        700: 'oklch(0.32 0.00 0)',
        800: 'oklch(0.22 0.00 0)',
        900: 'oklch(0.15 0.00 0)',
        950: 'oklch(0.06 0.00 0)',
      },
      // Content colors (using OKLCH)
      heading: {
        DEFAULT: 'oklch(0.25 0.00 0)', // #222 equivalent
        dark: 'oklch(0.85 0.00 0)', // #ddd equivalent
      },
      content: {
        'DEFAULT': 'oklch(0.30 0.00 0)', // #333 equivalent
        'dark': 'oklch(0.80 0.00 0)', // #ccc equivalent
        'muted': 'oklch(0.50 0.00 0)', // #666 equivalent
        'muted-dark': 'oklch(0.65 0.00 0)', // #999 equivalent
      },
      code: {
        'bg': 'oklch(0.96 0.00 0)', // #f2f2f2 equivalent
        'bg-dark': 'oklch(0.00 0.00 0)', // #000 equivalent
        'text': 'oklch(0.25 0.00 0)', // #222 equivalent
        'text-dark': 'oklch(0.85 0.00 0)', // #ddd equivalent
      },
    },
  },
  shortcuts: [
    // Layout shortcuts
    ['container-main', 'mx-auto relative'],
    ['header-main', 'mb-12 pb-6'],
    ['nav-link', 'text-muted font-medium transition-colors duration-200 hover:text-base'],
    ['nav-active', 'font-semibold text-base'],

    // Article specific shortcuts
    ['article-header', 'mb-8'],
    ['article-title', 'text-2xl font-bold text-heading dark:text-heading-dark leading-tight mb-2 mt-0'],
    ['article-date', 'font-mono text-sm text-content-muted dark:text-content-muted-dark'],
    ['article-reading-time', 'font-mono text-sm text-content-muted dark:text-content-muted-dark ml-2 opacity-75'],

    // Typography shortcuts
    ['heading-text', 'font-bold text-heading dark:text-heading-dark'],
    ['body-text', 'text-content dark:text-content-dark'],
    ['muted-text', 'text-content-muted dark:text-content-muted-dark'],
    ['code-style', 'bg-code-bg dark:bg-code-bg-dark text-code-text dark:text-code-text-dark'],

    // Base layout shortcuts
    ['bg-base', 'bg-white dark:bg-background'],
    ['bg-surface', 'bg-gray-50 dark:bg-muted'],
    ['text-base', 'text-gray-900 dark:text-foreground'],
    ['text-muted', 'text-gray-600 dark:text-gray-400'],
    ['border-base', 'border-gray-200 dark:border-border'],
  ],
})
