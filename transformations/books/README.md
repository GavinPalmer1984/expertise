# Book Transformation

This directory contains tools and configurations for transforming the expertise repository into book formats (PDF, EPUB, etc.).

## Overview

The book transformation converts structured domain expertise into well-organized books that can be read or listened to.

## Requirements

- Node.js (v14+)
- Pandoc (for document conversion)
- LaTeX (for PDF generation)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure book options in `book-config.json`:
   - Book title and author
   - Chapter organization
   - Style and formatting
   - Output formats

## Usage

### Generate Book

```bash
npm run build:book -- --domain=technology
```

This will:
1. Parse the domain's Markdown files
2. Structure them into chapters and sections
3. Generate a complete book document
4. Output in the requested formats (PDF, EPUB, etc.)

### Generate All Books

```bash
npm run build:all-books
```

Generates books for all domains.

## Book Structure

Each domain is transformed into a book with the following structure:

1. Title Page
2. Table of Contents
3. Preface
4. Introduction (from domain overview)
5. Chapters
   - Knowledge
   - Best Practices
   - Anti-Patterns
   - Failures and Lessons
6. Sub-Domains (each as a separate section or chapter)
7. Resources and References
8. Index

## Customization

### Book Templates

Modify the templates in `templates/` to change the structure and style of:
- Title page
- Chapter headings
- Block quotes
- Code blocks
- Examples

### Styling

Edit style files in `styles/` to customize the visual design.

### Output Formats

Configure output formats in `book-config.json`:
- PDF
- EPUB
- MOBI
- HTML
- Markdown
- Audio Book (via text-to-speech integration) 