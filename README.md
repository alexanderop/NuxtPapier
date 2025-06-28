# NuxtPapier

A minimal blog starter inspired by Bear Blog, built with Nuxt 3 and focused on content over noise.

## Features

- ✅ **Nuxt 3** with TypeScript support
- ✅ **Content Management** with @nuxt/content
- ✅ **Styling** with UnoCSS and OKLCH colors
- ✅ **Dark Mode** with automatic theme detection
- ✅ **SEO Optimized** with sitemap, robots.txt, and OG images
- ✅ **RSS/Atom/JSON Feeds** for content syndication
- ✅ **Search Functionality** with Fuse.js
- ✅ **Keyboard Shortcuts** for better UX
- ✅ **GitHub Pages Deployment** ready

## Setup

Make sure to install dependencies using pnpm:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Generate static site:

```bash
pnpm generate
```

Locally preview production build:

```bash
pnpm preview
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages. Here's how to set it up:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Update Site Configuration

Update the following in `utils/site.config.ts`:

```typescript
// Replace with your actual information
export const siteConfig: SiteConfig = {
  name: 'Your Blog Name',
  title: 'Your Blog Title',
  description: 'Your blog description',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
  },
  social: {
    twitter: '@yourhandle',
    github: 'yourusername/your-repo',
  },
  // ... other settings
}
```

### 3. Deploy

Simply push to the `main` branch and GitHub Actions will automatically:

- Install dependencies with pnpm
- Generate the static site
- Deploy to GitHub Pages

Your site will be available at: `https://yourusername.github.io/repository-name/`

### 4. Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `url` in `utils/site.config.ts` to your custom domain

## Key Features

### Content Management

- Write blog posts in Markdown in the `content/blog/` directory
- Automatic frontmatter processing (reading time, excerpts, etc.)
- Support for tags, categories, and featured images

### Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open search
- `Cmd/Ctrl + /` - Show shortcuts help
- `Cmd/Ctrl + Shift + D` - Toggle dark mode
- `J/K` - Navigate between posts (on blog pages)

### SEO & Performance

- Automatic sitemap generation
- Open Graph and Twitter card support
- RSS/Atom/JSON feeds at `/rss.xml`, `/atom.xml`, `/feed.json`
- Optimized images with @nuxt/image

## Customization

### Themes

The project uses OKLCH colors for better accessibility. Customize colors in `uno.config.ts`:

```text
Update primary colors in uno.config.ts:

theme: {
  colors: {
    primary: 'oklch(60% 0.2 240)', // Blue
    accent: 'oklch(70% 0.2 85)',   // Amber
  }
}
```

### Typography

Fonts are configured in `uno.config.ts`. The default setup uses:

- **IBM Plex Sans** for body text
- **IBM Plex Mono** for code

## Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build           # Build for production
pnpm generate        # Generate static site
pnpm preview         # Preview production build

# Quality
pnpm lint            # Lint and fix code
pnpm typecheck       # Run TypeScript checks

# Content
pnpm clean:content   # Clear content cache
```

## Project Structure

```
content/blog/          # Blog posts in Markdown
components/            # Vue components
  atoms/              # Basic UI components
  molecules/          # Composite components
  content/            # Content-specific components
  prose/              # Enhanced prose components
composables/           # Vue composables
layouts/               # Nuxt layouts
pages/                 # Nuxt pages
utils/                 # Utilities and configs
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

## License

MIT License - feel free to use this starter for your own projects!
