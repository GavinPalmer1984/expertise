#!/usr/bin/env node

/**
 * Domain Creator Script for Expertise Repository
 * 
 * This script helps users create new domains by:
 * 1. Creating a new domain directory
 * 2. Copying the domain template
 * 3. Prompting for domain-specific information
 */

const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TEMPLATE_PATH = path.join(__dirname, '../templates/domain_template.md');
const DOMAINS_PATH = path.join(__dirname, '../domains');

// Ensure the domains directory exists
fs.ensureDirSync(DOMAINS_PATH);

// Prompt for domain information
async function promptDomainInfo() {
  return new Promise((resolve) => {
    console.log('📚 Create New Domain');
    console.log('===================');
    
    rl.question('Domain name (lowercase, hyphenated if multiple words): ', (domainName) => {
      rl.question('Domain display name (human-readable): ', (displayName) => {
        rl.question('Brief description: ', (description) => {
          rl.question('Contributor name: ', (contributor) => {
            rl.question('Tags (comma-separated): ', (tags) => {
              resolve({
                domainName: domainName.trim().toLowerCase(),
                displayName: displayName.trim(),
                description: description.trim(),
                contributor: contributor.trim(),
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
                date: new Date().toISOString().split('T')[0]
              });
            });
          });
        });
      });
    });
  });
}

// Create domain directory and files
async function createDomain(domainInfo) {
  const domainDir = path.join(DOMAINS_PATH, domainInfo.domainName);
  
  // Check if domain already exists
  if (fs.existsSync(domainDir)) {
    console.error(`⚠️  Domain '${domainInfo.domainName}' already exists!`);
    return false;
  }
  
  // Create domain directory
  fs.ensureDirSync(domainDir);
  
  // Read template
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  
  // Replace template placeholders
  const domainContent = template
    .replace('[Domain Name]', domainInfo.displayName)
    .replace('Brief description of this domain and its scope.', domainInfo.description)
    .replace('[Names]', domainInfo.contributor)
    .replace('[Date]', domainInfo.date)
    .replace('[Version number]', '0.1')
    .replace('[Relevant tags for searchability]', domainInfo.tags.join(', '));
  
  // Write domain README
  fs.writeFileSync(path.join(domainDir, 'README.md'), domainContent);
  
  return true;
}

// Main function
async function main() {
  try {
    const domainInfo = await promptDomainInfo();
    
    if (await createDomain(domainInfo)) {
      console.log(`✅ Domain '${domainInfo.displayName}' created successfully!`);
      console.log(`📂 Location: domains/${domainInfo.domainName}/`);
      console.log('');
      console.log('Next steps:');
      console.log('1. Edit the domain README.md to add your expertise');
      console.log('2. Create subdomain directories if needed');
      console.log('3. Run transformations to see your domain in different formats');
    }
    
    rl.close();
  } catch (error) {
    console.error('❌ Error creating domain:', error);
    rl.close();
    process.exit(1);
  }
}

main(); 