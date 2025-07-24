#!/usr/bin/env node

/**
 * Static Website Generator for Expertise Repository
 * 
 * This script reads domain markdown files and transforms them into a static website.
 */

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const config = require('./website-config.json');

// Create output directory if it doesn't exist
if (!fs.existsSync(config.paths.output)) {
  fs.mkdirSync(config.paths.output, { recursive: true });
}

// Load domain data
function loadDomains() {
  const domainsDir = path.resolve(__dirname, config.paths.content);
  const domains = fs.readdirSync(domainsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  return domains.map(domain => {
    const readmePath = path.join(domainsDir, domain, 'README.md');
    if (fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf8');
      return {
        id: domain,
        name: domain.charAt(0).toUpperCase() + domain.slice(1),
        path: `/domains/${domain}/`,
        content: content
      };
    }
    return null;
  }).filter(Boolean);
}

// Generate HTML for domain pages
function generateDomainPages(domains) {
  domains.forEach(domain => {
    // Convert Markdown to HTML
    const htmlContent = marked.parse(domain.content);
    
    // Create domain directory
    const domainDir = path.join(config.paths.output, 'domains', domain.id);
    fs.mkdirSync(domainDir, { recursive: true });
    
    // Generate page with a basic template
    const html = `<!DOCTYPE html>
<html lang="${config.site.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${domain.name} - ${config.site.title}</title>
  <style>
    body {
      font-family: ${config.appearance.fontFamily};
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    header {
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    nav {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    a {
      color: ${config.appearance.primaryColor};
    }
    footer {
      margin-top: 3rem;
      border-top: 1px solid #eee;
      padding-top: 1rem;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>${config.site.title}</h1>
    <nav>
      ${config.navigation.headerLinks.map(link => 
        `<a href="${link.url}">${link.text}</a>`
      ).join('')}
    </nav>
  </header>
  
  ${config.features.enableBreadcrumbs ? 
    `<div class="breadcrumbs">
      <a href="/">Home</a> &gt; 
      <a href="/domains/">Domains</a> &gt; 
      <span>${domain.name}</span>
    </div>` : ''}
  
  <main>
    ${htmlContent}
  </main>
  
  <footer>
    <div>
      ${config.navigation.footerLinks.map(link => 
        `<a href="${link.url}">${link.text}</a> `
      ).join(' | ')}
    </div>
    <p>&copy; ${new Date().getFullYear()} ${config.site.title}</p>
  </footer>
</body>
</html>`;
    
    fs.writeFileSync(path.join(domainDir, 'index.html'), html);
  });
}

// Generate index page
function generateIndexPage(domains) {
  const html = `<!DOCTYPE html>
<html lang="${config.site.language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.site.title}</title>
  <style>
    body {
      font-family: ${config.appearance.fontFamily};
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    header {
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    nav {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .domains {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .domain-card {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 1rem;
      transition: transform 0.2s;
    }
    .domain-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    a {
      color: ${config.appearance.primaryColor};
      text-decoration: none;
    }
    footer {
      margin-top: 3rem;
      border-top: 1px solid #eee;
      padding-top: 1rem;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>${config.site.title}</h1>
    <nav>
      ${config.navigation.headerLinks.map(link => 
        `<a href="${link.url}">${link.text}</a>`
      ).join('')}
    </nav>
  </header>
  
  <main>
    <h2>Explore Domains of Expertise</h2>
    <p>${config.site.description}</p>
    
    <div class="domains">
      ${domains.map(domain => `
        <a href="/domains/${domain.id}/" class="domain-card">
          <h3>${domain.name}</h3>
          <p>${domain.content.split('\n').filter(line => line.startsWith('##'))[0]?.replace('## Overview', '') || 'Explore this domain'}</p>
        </a>
      `).join('')}
    </div>
  </main>
  
  <footer>
    <div>
      ${config.navigation.footerLinks.map(link => 
        `<a href="${link.url}">${link.text}</a> `
      ).join(' | ')}
    </div>
    <p>&copy; ${new Date().getFullYear()} ${config.site.title}</p>
  </footer>
</body>
</html>`;
  
  fs.writeFileSync(path.join(config.paths.output, 'index.html'), html);
}

// Main build process
function buildWebsite() {
  console.log('🌐 Building static website...');
  
  // Load domain data
  const domains = loadDomains();
  console.log(`📚 Found ${domains.length} domains`);
  
  // Generate domain pages
  generateDomainPages(domains);
  console.log('📄 Generated domain pages');
  
  // Generate index page
  generateIndexPage(domains);
  console.log('🏠 Generated index page');
  
  console.log(`✅ Website built successfully at ${config.paths.output}`);
}

buildWebsite(); 