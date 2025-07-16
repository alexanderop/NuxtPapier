# Playwright E2E Tests

Comprehensive smoke tests for NuxtPapier blog covering core functionality, SEO, and accessibility.

## Running Tests

### Option 1: Auto-start Server (Default)
Playwright will automatically start the dev server:

```bash
# Run all tests
pnpm test:e2e

# Run tests with UI mode (interactive)
pnpm test:e2e:ui

# Run tests in debug mode
pnpm test:e2e:debug

# Run tests in headed mode (see browser)
pnpm test:e2e:headed
```

### Option 2: External Server Management
If you prefer to manage the server separately:

```bash
# Terminal 1: Start the dev server
pnpm dev

# Terminal 2: Run tests (after server is ready)
pnpm test:e2e

# Or use the helper script
pnpm test:e2e:server
```

## Test Structure

```
tests/
├── e2e/
│   ├── smoke/
│   │   ├── navigation.spec.ts      # Core navigation tests
│   │   ├── blog.spec.ts           # Blog functionality
│   │   ├── theme.spec.ts          # Theme switching & UI
│   │   ├── seo.spec.ts            # SEO and meta tags
│   │   └── accessibility.spec.ts  # A11y compliance
│   ├── fixtures/
│   │   └── nuxt.ts                # Nuxt-specific test setup
│   └── utils/
│       └── helpers.ts             # Shared test utilities
└── README.md
```

## Test Coverage

### Navigation Tests
- Homepage loading
- Desktop/mobile navigation
- 404 error handling
- Footer links
- Breadcrumbs
- Skip link functionality

### Blog Tests
- Posts listing
- Individual post rendering
- Pagination
- Tags system
- RSS feed
- Post navigation
- Draft post filtering

### Theme & UI Tests
- Light/dark mode toggle
- Theme persistence
- Command palette functionality
- Focus trap
- Keyboard navigation

### SEO Tests
- Meta tags (OG, Twitter)
- Sitemap generation
- robots.txt
- Structured data
- Canonical URLs
- Language attributes

### Accessibility Tests
- Skip links
- Keyboard navigation
- Alt text on images
- ARIA labels and roles
- Form labels
- Color contrast
- Focus indicators
- Heading hierarchy

## CI/CD

Tests automatically run on:
- Push to main branch
- Pull requests

Results and reports are uploaded as GitHub Actions artifacts.