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
        50: 'oklch(var(--brand-50) / <alpha-value>)',
        100: 'oklch(var(--brand-100) / <alpha-value>)',
        200: 'oklch(var(--brand-200) / <alpha-value>)',
        300: 'oklch(var(--brand-300) / <alpha-value>)',
        400: 'oklch(var(--brand-400) / <alpha-value>)',
        500: 'oklch(var(--brand-500) / <alpha-value>)', // Primary
        600: 'oklch(var(--brand-600) / <alpha-value>)',
        700: 'oklch(var(--brand-700) / <alpha-value>)',
        800: 'oklch(var(--brand-800) / <alpha-value>)',
        900: 'oklch(var(--brand-900) / <alpha-value>)',
        950: 'oklch(var(--brand-950) / <alpha-value>)',
      },
      // Semantic colors
      background: 'oklch(var(--color-background) / <alpha-value>)',
      surface: 'oklch(var(--color-surface) / <alpha-value>)',
      text: 'oklch(var(--color-text) / <alpha-value>)',
      muted: 'oklch(var(--color-muted) / <alpha-value>)',
      border: 'oklch(var(--color-border) / <alpha-value>)',
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

    // Animation shortcuts
    'animate-fade': 'animate opacity-0',
    'animate-fade-up': 'animate opacity-0 translate-y-4',
    'animate-fade-down': 'animate opacity-0 -translate-y-4',
    'animate-fade-left': 'animate opacity-0 translate-x-4',
    'animate-fade-right': 'animate opacity-0 -translate-x-4',
    'animate-scale': 'animate opacity-0 scale-95',
    'animate-blur': 'animate opacity-0 blur-sm',

    // Animation utility shortcuts
    'animate-show': 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0',
    'animate-delay-100': '[transition-delay:100ms]',
    'animate-delay-200': '[transition-delay:200ms]',
    'animate-delay-300': '[transition-delay:300ms]',
    'animate-delay-400': '[transition-delay:400ms]',
    'animate-delay-500': '[transition-delay:500ms]',

    // Hover arrow shortcut
    'hover-arrow': 'group relative inline-flex items-center gap-2',
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
