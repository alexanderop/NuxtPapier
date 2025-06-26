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
  preflights: [
    {
      getCSS: () => /* css */ `
        /* ==========================================================================
           BASE LAYER: CSS Variables and Defaults
           ========================================================================== */
        @layer base {
          :root {
            /* Primary brand hue (0-360) - Change this to your brand color */
            --brand-hue: 275;
            --chroma-multiplier: 1.1;
            --chroma-base: 0.15;

            /* Perceptually uniform lightness scale with easing curves */
            --brand-50: 98% calc(var(--chroma-base) * 0.15 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-100: 95% calc(var(--chroma-base) * 0.25 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-200: 89% calc(var(--chroma-base) * 0.45 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-300: 82% calc(var(--chroma-base) * 0.7 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-400: 71% calc(var(--chroma-base) * 0.9 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-500: 59% calc(var(--chroma-base) * 1.2 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-600: 49% calc(var(--chroma-base) * 1.1 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-700: 40% calc(var(--chroma-base) * 0.95 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-800: 32% calc(var(--chroma-base) * 0.8 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-900: 25% calc(var(--chroma-base) * 0.6 * var(--chroma-multiplier)) var(--brand-hue);
            --brand-950: 16% calc(var(--chroma-base) * 0.4 * var(--chroma-multiplier)) var(--brand-hue);

            /* Light mode semantic colors */
            --color-background: var(--brand-50);
            --color-surface: var(--brand-100);
            --color-text: var(--brand-900);
            --color-muted: var(--brand-600);
            --color-border: var(--brand-200);

            /* Complementary color schemes */
            --complement-hue: calc(var(--brand-hue) + 180);
            --accent-500: 59% calc(var(--chroma-base) * 1 * var(--chroma-multiplier)) var(--complement-hue);
            --accent-600: 49% calc(var(--chroma-base) * 0.9 * var(--chroma-multiplier)) var(--complement-hue);

            /* Accessibility colors */
            --text-high-contrast: 15% calc(var(--chroma-base) * 0.3) var(--brand-hue);
            --bg-high-contrast: 99% calc(var(--chroma-base) * 0.1) var(--brand-hue);
            --focus-ring: var(--brand-500);
            --focus-ring-offset: var(--brand-200);
            --error-500: 59% 0.18 0;
            --success-500: 59% 0.18 142;
            --warning-500: 59% 0.15 60;
          }

          /* Dark mode semantic colors */
          .dark {
            --color-background: var(--brand-950);
            --color-surface: var(--brand-900);
            --color-text: var(--brand-100);
            --color-muted: var(--brand-400);
            --color-border: var(--brand-800);
            --text-high-contrast: 95% calc(var(--chroma-base) * 0.2) var(--brand-hue);
            --bg-high-contrast: 8% calc(var(--chroma-base) * 0.2) var(--brand-hue);
          }

          /* Global defaults */
          html {
            font-family:
              'IBM Plex Sans',
              ui-sans-serif,
              system-ui,
              -apple-system,
              BlinkMacSystemFont,
              'Segoe UI',
              Roboto,
              'Helvetica Neue',
              Arial,
              'Noto Sans',
              sans-serif,
              'Apple Color Emoji',
              'Segoe UI Emoji',
              'Segoe UI Symbol',
              'Noto Color Emoji';
            line-height: 1.6;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            text-size-adjust: 100%;
          }

          body {
            font-family: inherit;
            font-size: 1rem;
            line-height: 1.6;
            color: oklch(var(--color-text));
            background-color: oklch(var(--color-background));
          }

          code,
          pre,
          kbd,
          samp {
            font-family:
              'IBM Plex Mono', ui-monospace, SFMono-Regular, 'Menlo', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'Roboto Mono',
              'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
          }

          /* Smooth transitions for theme switching */
          * {
            transition:
              background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease;
          }

          /* Focus states for accessibility */
          *:focus-visible {
            outline: 2px solid oklch(var(--focus-ring));
            outline-offset: 2px;
            box-shadow: 0 0 0 4px oklch(var(--focus-ring-offset));
          }

          /* Global scrollbar theming */
          * {
            scrollbar-width: thin;
            scrollbar-color: oklch(var(--color-border)) oklch(var(--color-background));
          }

          *::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }

          *::-webkit-scrollbar-track {
            background: oklch(var(--color-background));
          }

          *::-webkit-scrollbar-thumb {
            background-color: oklch(var(--color-border));
            border-radius: 6px;
            border: 3px solid oklch(var(--color-background));
          }

          *::-webkit-scrollbar-thumb:hover {
            background-color: oklch(var(--color-muted) / 0.4);
          }

          .search-results::-webkit-scrollbar,
          .code-block::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .search-results::-webkit-scrollbar-thumb,
          .code-block::-webkit-scrollbar-thumb {
            border: 2px solid oklch(var(--color-background));
          }
        }

        /* ==========================================================================
           TYPOGRAPHY LAYER: Prose and Content Styles
           ========================================================================== */
        @layer typography {
          .prose {
            color: oklch(var(--color-text));
            max-width: none;
            font-size: 1.125rem;
          }

          .prose-invert {
            color: oklch(var(--color-text));
          }

          /* Headings */
          .prose :where(h1, h2, h3, h4, h5, h6):not(:where([class~="not-prose"] *)) {
            color: oklch(var(--color-text));
            font-weight: 700;
            position: relative;
            scroll-margin-top: 100px;
          }

          /* Paragraphs */
          .prose :where(p):not(:where([class~="not-prose"] *)) {
            color: oklch(var(--color-text));
            line-height: 1.8;
            font-size: 1.25rem;
          }

          /* Links */
          .prose :where(a):not(:where([class~="not-prose"] *)):not(.anchor) {
            color: oklch(var(--brand-500));
            text-decoration: none;
            font-weight: 500;
          }

          .prose :where(a):not(:where([class~="not-prose"] *)):not(.anchor):hover {
            text-decoration: underline;
          }

          /* Strong text */
          .prose :where(strong):not(:where([class~="not-prose"] *)) {
            color: oklch(var(--color-text));
            font-weight: 600;
          }

          /* Code */
          .prose :where(code):not(:where([class~="not-prose"] *)):not(pre code) {
            color: oklch(var(--brand-400));
            background-color: oklch(var(--color-surface));
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.875em;
          }

          /* Code blocks */
          .prose :where(pre):not(:where([class~="not-prose"] *)) {
            background-color: oklch(var(--color-surface));
            border: 1px solid oklch(var(--color-border));
            overflow-x: auto;
          }

          .prose pre::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          .prose pre::-webkit-scrollbar-thumb {
            border: 2px solid oklch(var(--color-background));
          }

          /* Blockquotes */
          .prose :where(blockquote):not(:where([class~="not-prose"] *)) {
            border-left-color: oklch(var(--brand-500));
            color: oklch(var(--color-muted));
          }

          /* Lists */
          .prose :where(ul, ol):not(:where([class~="not-prose"] *)) {
            color: oklch(var(--color-text));
          }

          .prose :where(li):not(:where([class~="not-prose"] *)) {
            color: oklch(var(--color-text));
          }

          .prose :where(li)::marker:not(:where([class~="not-prose"] *)) {
            color: oklch(var(--brand-500));
          }

          /* Heading anchor links */
          .prose h2 a.anchor,
          .prose h3 a.anchor,
          .prose h4 a.anchor,
          .prose h5 a.anchor,
          .prose h6 a.anchor {
            position: absolute;
            left: -1.5rem;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            text-decoration: none;
            transition: opacity 0.2s ease;
            padding: 0.25rem;
            color: oklch(var(--color-muted));
          }

          .prose h2:hover a.anchor,
          .prose h3:hover a.anchor,
          .prose h4:hover a.anchor,
          .prose h5:hover a.anchor,
          .prose h6:hover a.anchor,
          .prose a.anchor:hover {
            opacity: 1;
            color: oklch(var(--brand-500));
          }

          .prose h2 a.anchor::before,
          .prose h3 a.anchor::before,
          .prose h4 a.anchor::before,
          .prose h5 a.anchor::before,
          .prose h6 a.anchor::before {
            content: '#';
            font-size: 0.875em;
            font-weight: 400;
          }

          /* Responsive: Show anchor links inline on small screens */
          @media (max-width: 768px) {
            .prose h2 a.anchor,
            .prose h3 a.anchor,
            .prose h4 a.anchor,
            .prose h5 a.anchor,
            .prose h6 a.anchor {
              position: static;
              display: inline-block;
              left: auto;
              margin-left: 0.5rem;
              transform: none;
              opacity: 0.5;
            }
          }
        }
      `,
    },
  ],
})
