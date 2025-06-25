---
title: "Astro Nano-Style Animations in NuxtPapier"
description: "Learn how to use the lightweight animation system inspired by Astro Nano in your NuxtPapier blog"
date: "2025-01-25"
---

I recently implemented a lightweight, performant animation system in NuxtPapier inspired by Astro Nano's elegant approach. This system provides smooth fade-in effects, scroll-triggered animations, and delightful micro-interactions - all with minimal JavaScript and zero dependencies.

## Why These Animations?

The goal was to create animations that:
- Are lightweight and performant
- Respect user preferences (reduced motion)
- Work seamlessly with Nuxt's client-side routing
- Are easy to apply without cluttering the markup
- Provide a subtle, professional feel

## How It Works

The animation system consists of three main parts:

### 1. CSS Animation Classes

The core animations are defined in `assets/css/animations.css`. These use CSS transforms and opacity for optimal performance:

```css
.animate {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.animate.show {
  opacity: 1;
  transform: translateY(0);
}
```

### 2. Intersection Observer Plugin

The `plugins/animations.client.ts` plugin handles the magic. It uses the Intersection Observer API to detect when elements enter the viewport and adds the `show` class:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
      observer.unobserve(entry.target)
    }
  })
})
```

### 3. UnoCSS Shortcuts

For convenience, I've added UnoCSS shortcuts that make animations even easier to apply:

```javascript
// In uno.config.ts
shortcuts: {
  'animate-fade': 'animate opacity-0',
  'animate-fade-up': 'animate opacity-0 translate-y-4',
  'animate-scale': 'animate opacity-0 scale-95',
}
```

## Using Animations in Your Components

### Basic Fade-In

Add the `animate` class to any element:

```vue
<div class="animate" data-animate="fade">
  This content will fade in when scrolled into view
</div>
```

### Directional Animations

Use data attributes for different animation styles:

```vue
<h1 class="animate" data-animate="fade-up">Slides up</h1>
<p class="animate" data-animate="fade-left">Slides from right</p>
<div class="animate" data-animate="scale">Scales in</div>
```

### Custom Delays

Control animation timing with delay attributes:

```vue
<div class="animate" data-animate="fade" data-delay="300">
  Appears after 300ms
</div>
```

### Immediate Animations

For elements that should animate on page load:

```vue
<header class="animate-immediate" data-animate="fade-right">
  Animates immediately
</header>
```

### Staggered Lists

Create beautiful cascading effects for lists:

```vue
<div data-stagger="100">
  <article v-for="post in posts" class="animate">
    <!-- Each item animates 100ms after the previous -->
  </article>
</div>
```

## Micro-Interactions

### Hover Arrows

The system includes slick hover arrows for links:

```vue
<NuxtLink class="hover-arrow">
  <span>Read more</span>
  <svg viewBox="0 0 24 24" class="w-4 h-4">
    <line class="arrow-shaft" />
    <polyline class="arrow-head" />
  </svg>
</NuxtLink>
```

### Back-to-Top Button

A smooth-scrolling back-to-top button appears when you scroll:

```vue
<button id="back-to-top">
  <BaseIcon name="ph:arrow-up" />
</button>
```

## Performance Considerations

The animation system is designed for performance:

1. **GPU Acceleration**: Only animates `transform` and `opacity`
2. **Intersection Observer**: Animations only run when needed
3. **One-time Animations**: Elements are unobserved after animating
4. **Respects Preferences**: Disabled for `prefers-reduced-motion`

## Accessibility

The system respects user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  .animate,
  .animate.show {
    animation: none !important;
    transition: none !important;
  }
}
```

## Customization

You can customize the animations by:

1. **Adjusting CSS Variables**: Edit timing in `theme.css`
2. **Creating New Animations**: Add your own data-animate styles
3. **Modifying Delays**: Change stagger timing for different effects
4. **Adding Easing Functions**: Use the CSS variables for consistent easing

## Example: This Blog Post

This very blog post uses the animation system! The header fades up, the content fades in, and if you're on desktop, you'll see hover arrows on the navigation links.

## Conclusion

With just ~30 lines of CSS and ~80 lines of JavaScript, we've created a flexible, performant animation system that enhances the user experience without sacrificing performance. The best part? It's completely optional - the site works perfectly with JavaScript disabled, maintaining our commitment to progressive enhancement.

Feel free to explore the codebase to see how these animations are implemented throughout the site. Happy animating!