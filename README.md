# NuxtPapier

[![GitHub release](https://img.shields.io/github/release/alexanderop/NuxtPapier.svg)](https://GitHub.com/alexanderop/NuxtPapier/releases/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A minimal, SEO-friendly Nuxt 3 blog theme focused on content, performance, accessibility, and developer experience.

## Features

- 📝 **Content Management** - Powered by @nuxt/content v3 with Markdown support
- 🎨 **Modern Styling** - UnoCSS with Wind4 preset for utility-first CSS
- 🌙 **Dark Mode** - Built-in dark/light theme switching
- 🔍 **SEO Optimized** - Meta tags, structured data, sitemap, and RSS feed
- ⚡ **Performance** - Fast static site generation with Nuxt 3
- 📱 **Responsive** - Mobile-first design approach
- 🧩 **VueUse** - Collection of Vue composition utilities
- 📊 **Reading Time** - Automatic calculation for blog posts
- 🚀 **CI/CD** - GitHub Actions for linting and type checking

## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexanderop/NuxtPapier.git
cd NuxtPapier
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

## Available Scripts

```bash
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm generate    # Generate static site
pnpm preview     # Preview production build
pnpm lint        # Run ESLint with auto-fix
pnpm typecheck   # TypeScript type checking
```

## Project Structure

```
NuxtPapier/
├── components/     # Vue components
├── content/        # Markdown content
│   ├── blog/      # Blog posts
│   └── pages/     # Static pages
├── pages/         # Nuxt pages
├── server/        # Server routes (RSS, sitemap)
├── types/         # TypeScript types
├── app.config.ts  # Site metadata
├── nuxt.config.ts # Nuxt configuration
└── uno.config.ts  # UnoCSS configuration
```

## Writing Content

### Blog Posts

Create a new `.md` file in `/content/blog/`:

```markdown
---
title: My First Post
description: A brief description
date: 2025-01-14
published: true
tags: [nuxt, vue]
---

Your content here...
```

### Pages

Add `.md` files to `/content/pages/` for static pages like About or Contact.

## Customization

1. **Site Metadata**: Edit `app.config.ts`
2. **Styling**: Modify `uno.config.ts` for theme customization
3. **Components**: Add or modify components in `/components/`

## Versioning

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated version management and releases. Each push to the `main` branch triggers the release workflow if there are meaningful changes.

### Release Process

- **Patch Release**: Bug fixes (`fix: ...`)
- **Minor Release**: New features (`feat: ...`)
- **Major Release**: Breaking changes (with `BREAKING CHANGE:` in commit)

View the [CHANGELOG.md](./CHANGELOG.md) for release history.

## Contributing

Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for commit conventions and guidelines.

### Quick Start for Contributors

```bash
# Make changes and commit using Commitizen
pnpm commit

# Or commit manually following conventional format
git commit -m "feat: add new feature"
```

## License

[MIT](./LICENSE) © 2025 Alexander Opalic