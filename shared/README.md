# Utils Directory

This directory contains utility functions and configuration that are auto-imported throughout the Nuxt 3 application.

## Site Configuration

The `site.config.ts` file contains all the site metadata and configuration used throughout the application.

### Configuration Options

- **name**: The name of your site (displayed in header)
- **title**: The full title of your site (used in browser tab, SEO)
- **description**: A brief description of your site (used in SEO, RSS feeds)
- **url**: The full URL of your site (must be updated for production)
- **author**: Information about the site author
  - **name**: Author's name
  - **email**: Contact email
  - **url**: Author's website URL
- **social**: Optional social media links
  - **twitter**: Twitter handle (e.g., '@username')
  - **github**: GitHub username or repo
  - **linkedin**: LinkedIn profile
  - **mastodon**: Mastodon handle
- **logo**: Path to logo image (relative to public directory)
- **favicon**: Path to favicon (relative to public directory)
- **language**: Site language code (e.g., 'en', 'fr', 'es')
- **copyright**: Optional copyright text (defaults to auto-generated)

### Usage

The site config is automatically imported and used in:

- RSS/Atom/JSON feeds
- Site header and footer
- SEO meta tags
- Open Graph tags
- Twitter cards

To update your site information, simply edit the values in `site.config.ts`.
