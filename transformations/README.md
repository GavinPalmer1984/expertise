# Transformations

This directory contains tools and configurations for transforming the expertise repository into various output formats.

## Available Transformations

### 1. MCP Server

Tools and templates for converting domain expertise into Model Context Protocol servers. MCP allows AI models to access this expertise as a context source.

#### Requirements
- Node.js or Python for server implementation
- MCP client compatibility

#### Usage
See `mcp/README.md` for details on configuring and deploying MCP servers.

### 2. Book Format

Scripts and templates for generating book-style documents from domain expertise.

#### Requirements
- Pandoc for document conversion
- LaTeX for PDF generation (optional)

#### Usage
See `books/README.md` for details on generating books.

### 3. Static Website

Tools for generating a browsable, linkable website from the expertise repository.

#### Requirements
- Static site generator (Jekyll, Hugo, etc.)
- Web hosting solution

#### Usage
See `website/README.md` for details on building and deploying the website.

## Custom Transformations

You can add custom transformations by:
1. Creating a new directory in `transformations/`
2. Adding configuration files and scripts
3. Documenting the transformation process in a README.md file
4. Testing with sample domains 