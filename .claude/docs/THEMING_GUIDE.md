# Theming & UnoCSS Guide

This project uses a flexible theming system with OKLCH colors and VueUse for dark mode management.

## Quick Brand Color Change

To change your brand colors, simply modify the `--brand-hue` variable in `assets/css/theme.css`:

```css
:root {
  --brand-hue: 220; /* Change this number (0-360) */
}
```

**Common Brand Hues:**

- **Blue**: 220 (default)
- **Green**: 142
- **Purple**: 275
- **Orange**: 25
- **Red**: 0
- **Teal**: 180
- **Pink**: 320

## Advanced Customization

For more control, you can modify individual color values:

```css
:root {
  --brand-500: 62% 0.18 var(--brand-hue); /* Primary color */
  /* Adjust lightness (first value) and chroma (second value) */
}
```

## Using Semantic Color Classes

Use these semantic color classes in your components:

```vue
<template>
  <div class="text-text bg-background">
    <h1 class="text-heading">
      Title
    </h1>
    <p class="text-body">
      Body text
    </p>
    <p class="text-muted">
      Muted text
    </p>
    <button class="btn-primary">
      Primary Button
    </button>
    <div class="surface-card">
      Card content
    </div>
  </div>
</template>
```

**Available Color Classes:**

- `bg-background` / `text-text` - Main background and text
- `bg-surface` / `text-muted` - Secondary surfaces and muted text
- `bg-brand-{50-950}` - Brand color variations
- `border-border` - Border colors

**Available Shortcuts:**

- `container-main` - Main container with responsive padding
- `btn-primary` / `btn-secondary` - Button styles
- `text-heading` / `text-body` / `text-muted` - Typography
- `surface-primary` / `surface-secondary` / `surface-card` - Surface styles

## Dark Mode Implementation

Dark mode is handled automatically using VueUse's `useDark()` composable:

```vue
<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
```

The system automatically:

- Detects system preference on first visit
- Persists user choice in localStorage
- Applies appropriate color variables for light/dark modes

## UnoCSS Best Practices

- **Use semantic color classes** instead of direct color values
- **Use UnoCSS shortcuts** defined in `uno.config.ts` for common patterns
- **Leverage OKLCH colors** for better color manipulation and accessibility
- **Use dark: variants** sparingly - most theming is handled by CSS variables
