# MCP Server Transformation

This directory contains tools and configurations for transforming the expertise repository into Model Context Protocol (MCP) servers.

## Overview

The MCP transformation converts structured domain expertise into MCP-compatible servers that can be used by AI models like Claude to access expertise in various domains.

## Requirements

- Node.js (v14+)
- MCP SDK
- Knowledge of the [Model Context Protocol](https://modelcontextprotocol.io/)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure MCP options in `mcp-config.json`:
   - Server name and description
   - Resource definitions
   - Authentication (if needed)
   - Rate limiting (optional)

## Usage

### Build MCP Server

```bash
npm run build:mcp
```

This will:
1. Parse all domain Markdown files
2. Convert them to MCP resources
3. Generate MCP server code
4. Output to the `dist` directory

### Run MCP Server

```bash
npm run serve:mcp
```

This starts the MCP server locally for testing, available at `http://localhost:8080`.

### Deploy MCP Server

```bash
npm run deploy:mcp
```

Deploys the MCP server to configured hosting service.

## MCP Resource Structure

The expertise is transformed into MCP resources with the following structure:

```json
{
  "type": "domain",
  "id": "domain-name",
  "name": "Domain Name",
  "content": {
    "knowledge": [...],
    "bestPractices": [...],
    "antiPatterns": [...],
    "failures": [...]
  },
  "metadata": {
    "contributors": [...],
    "lastUpdated": "2023-06-01",
    "version": "1.0"
  },
  "relationships": {
    "subDomains": [...]
  }
}
```

## Customization

### Resource Templates

Modify the templates in `templates/` to change the structure of:
- Domain resources
- Knowledge fragments
- Best practices
- Anti-patterns

### Server Configuration

Edit configuration in `mcp-config.json` to customize server behavior.

### Extensions

Add plugins in `plugins/` for additional functionality like:
- Custom authentication
- Rate limiting
- Analytics
- Caching 