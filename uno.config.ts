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
  theme: {
    colors: {
      // Brand colors using OKLCH with CSS variables
      brand: {
        50: 'oklch(var(--brand-50))',
        100: 'oklch(var(--brand-100))',
        200: 'oklch(var(--brand-200))',
        300: 'oklch(var(--brand-300))',
        400: 'oklch(var(--brand-400))',
        500: 'oklch(var(--brand-500))', // Primary
        600: 'oklch(var(--brand-600))',
        700: 'oklch(var(--brand-700))',
        800: 'oklch(var(--brand-800))',
        900: 'oklch(var(--brand-900))',
        950: 'oklch(var(--brand-950))',
      },
      // Semantic colors
      background: 'oklch(var(--color-background))',
      surface: 'oklch(var(--color-surface))',
      text: 'oklch(var(--color-text))',
      muted: 'oklch(var(--color-muted))',
      border: 'oklch(var(--color-border))',
    },
  },
  shortcuts: {
    // Layout shortcuts
    'container-main': 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    'section-spacing': 'py-16 lg:py-24',

    // Component shortcuts
    'btn-primary': 'bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg font-medium transition-colors',
    'btn-secondary': 'bg-surface hover:bg-brand-100 dark:hover:bg-brand-800 text-text border border-border px-4 py-2 rounded-lg font-medium transition-colors',

    // Typography shortcuts
    'text-heading': 'text-text font-bold',
    'text-body': 'text-text leading-relaxed',
    'text-muted': 'text-muted',

    // Surface shortcuts
    'surface-primary': 'bg-background text-text',
    'surface-secondary': 'bg-surface text-text',
    'surface-card': 'bg-surface border border-border rounded-lg p-6',
  },
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
    presetTypography(),
    presetWebFonts({
      themeKey: 'font',
      fonts: {
        sans: 'IBM Plex Sans:400,500,600,700',
        mono: 'IBM Plex Mono:400,500,600,700',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
