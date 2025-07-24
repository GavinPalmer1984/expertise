# Static Website Transformation

This directory contains tools and configuration for generating a static website from the expertise repository.

## Overview

The static website transformation converts the structured domain expertise into browsable HTML content with:
- Navigation across domains and sub-domains
- Search functionality
- Proper linking between related topics
- Mobile-responsive design

## Requirements

- Node.js (v14+)
- A static site generator:
  - [Jekyll](https://jekyllrb.com/) (recommended)
  - [Hugo](https://gohugo.io/)
  - [Eleventy](https://www.11ty.dev/)
- Basic knowledge of HTML/CSS/JS for customization

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure website options in `website-config.json`:
   - Site title
   - Color scheme
   - Navigation structure
   - Analytics (optional)

## Usage

### Build Website

```bash
npm run build:website
```

This will:
1. Parse all domain Markdown files
2. Generate HTML files
3. Create navigation structures
4. Build search indexes
5. Output to the `_site` directory

### Preview Website

```bash
npm run serve:website
```

This starts a local development server for preview at `http://localhost:3000`.

### Deploy Website

```bash
npm run deploy:website
```

Deploys to configured hosting service (GitHub Pages by default).

## Customization

### Templates

Modify the templates in `templates/` to change the appearance and structure of:
- Domain pages
- Navigation
- Search results
- Home page

### Styling

Edit CSS/SCSS files in `styles/` to customize the visual design.

### Extensions

Add plugins in `plugins/` for additional functionality like:
- Comments
- Interactive visualizations
- User accounts/profiles

## Recommendations

1. Keep URLs semantic and permanent
2. Optimize for search engines
3. Ensure mobile compatibility
4. Add metadata for social sharing
5. Implement proper breadcrumb navigation 