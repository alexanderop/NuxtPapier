# NuxtPapier

A minimal, SEO-friendly Nuxt 3 blog theme focused on content, performance, accessibility, and developer experience. Perfect for personal blogs, documentation sites, and portfolios.

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge)](https://github.com/yourusername/NuxtPapier/generate)

![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82?style=flat-square&logo=nuxt.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![UnoCSS](https://img.shields.io/badge/UnoCSS-333333?style=flat-square&logo=unocss)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## ✨ Features

- **🚀 Performance First** - Static site generation with optimal loading strategies
- **📝 Markdown Content** - Write posts in Markdown with frontmatter support
- **🎨 Minimal Design** - Clean, focused on readability with dark mode support
- **🔍 SEO Optimized** - Built-in meta tags, sitemap, RSS feed, and structured data
- **♿ Accessible** - WCAG compliant with semantic HTML and ARIA attributes
- **📱 Responsive** - Mobile-first design that works on all devices
- **🎯 TypeScript** - Fully typed for better developer experience
- **🛠️ Developer Friendly** - Hot reload, auto-imports, and clear project structure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Using as a Template

#### Option 1: Use GitHub Template (Recommended)
1. Click the "Use this template" button on GitHub
2. Create a new repository from the template
3. Clone your new repository:
   ```bash
   git clone https://github.com/yourusername/my-blog.git
   cd my-blog
   ```

#### Option 2: Clone Repository
1. **Clone or fork this repository**
   ```bash
   git clone https://github.com/yourusername/NuxtPapier.git my-blog
   cd my-blog
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open http://localhost:3000**

## 📝 Creating Blog Posts

### Add a New Post

Create a new `.md` file in `/content/posts/`:

```markdown
---
title: My First Blog Post
description: This is my first post using NuxtPapier
date: 2025-01-26
published: true
tags:
  - nuxt
  - blogging
image: /images/my-post-cover.jpg
---

Your content here...
```

### Frontmatter Options

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title |
| `description` | string | ✅ | SEO description |
| `date` | string | ✅ | ISO date (YYYY-MM-DD) |
| `published` | boolean | ❌ | Show/hide post (default: true) |
| `tags` | string[] | ❌ | Post categories |
| `image` | string | ❌ | Cover image URL |

### Draft Posts

Set `published: false` to hide posts from production:

```yaml
---
title: Work in Progress
published: false
---
```

## ⚙️ Configuration

### Site Configuration

Edit `app.config.ts` to customize your site:

```typescript
export default defineAppConfig({
  name: 'My Blog',
  description: 'Welcome to my personal blog',
  url: 'https://myblog.com',
  author: {
    name: 'Your Name',
    email: 'you@example.com',
    twitter: '@yourhandle'
  }
})
```

### Social Links

Update social links in `constants.ts`:

```typescript
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourhandle',
  linkedin: 'https://linkedin.com/in/yourprofile'
}
```

### Theme Customization

Modify theme colors in `uno.config.ts`:

```typescript
theme: {
  colors: {
    primary: {
      DEFAULT: '#3B82F6',
      // Add more shades
    }
  }
}
```

## 📁 Project Structure

```
NuxtPapier/
├── components/          # Vue components
│   └── Base*.vue       # Prefixed base components
├── content/            # Markdown content
│   ├── pages/         # Static pages
│   └── posts/         # Blog posts
├── pages/             # Route pages
├── server/            # Server routes
│   ├── api/          # API endpoints
│   └── routes/       # RSS, sitemap, robots.txt
├── composables/       # Vue composables
├── types/             # TypeScript types
├── app.config.ts      # Site metadata
├── nuxt.config.ts     # Nuxt configuration
└── uno.config.ts      # UnoCSS configuration
```

## 🛠️ Development

### Commands

```bash
# Development
pnpm dev         # Start dev server (localhost:3000)

# Building
pnpm build       # Build for production
pnpm generate    # Generate static site
pnpm preview     # Preview production build

# Code Quality
pnpm lint        # Run ESLint with auto-fix
pnpm typecheck   # TypeScript type checking
```

### Creating Components

Add new components to `/components/` with `Base` prefix:

```vue
<!-- components/BaseCard.vue -->
<script setup lang="ts">
const { title, description } = defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="base-card">
    <h3>{{ title }}</h3>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
```

### Adding Pages

Create files in `/pages/` for new routes:

```vue
<!-- pages/about.vue -->
<template>
  <div>
    <BaseContainer>
      <h1>About Me</h1>
      <!-- Your content -->
    </BaseContainer>
  </div>
</template>
```

## 🚀 Deployment

### GitHub Pages (Automated)

This template includes automatic GitHub Pages deployment:

1. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as source

2. **Push to main branch**
   - The site will automatically build and deploy
   - Access at: `https://<username>.github.io/<repository>/`

3. **Custom domain (optional)**
   - Add a CNAME file with your domain
   - Configure DNS settings

### Static Hosting (Manual)

1. **Generate static site**
   ```bash
   pnpm generate
   ```

2. **Deploy `.output/public/` to:**
   - Netlify
   - Vercel
   - Cloudflare Pages
   - Any static host

### Server Deployment

For server-side features:

```bash
pnpm build
node .output/server/index.mjs
```

### Environment Variables

Create `.env` for local development:

```env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
# For GitHub Pages deployment with custom path
NUXT_APP_BASE_URL=/repository-name/
```

## 🎨 Customization Guide

### Change Fonts

Edit `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  }
})
```

### Add Analytics

Install and configure analytics module:

```bash
pnpm add @nuxtjs/google-gtag
```

### Custom Components

The theme uses a component prefix system. All base components start with `Base`:
- `BaseContainer` - Content wrapper
- `BaseHeader` - Site header
- `BaseFooter` - Site footer
- `BaseProse` - Markdown content wrapper

## 📦 Built With

- [Nuxt 3](https://nuxt.com) - Vue.js framework
- [Nuxt Content](https://content.nuxt.com) - File-based CMS
- [UnoCSS](https://unocss.dev) - Atomic CSS engine
- [VueUse](https://vueuse.org) - Vue composition utilities
- [TypeScript](https://www.typescriptlang.org) - Type safety

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [AstroPaper](https://astro-paper.pages.dev/)
- Built for the Nuxt community
- Designed for developers who write

---

Made with ❤️ using Nuxt 3