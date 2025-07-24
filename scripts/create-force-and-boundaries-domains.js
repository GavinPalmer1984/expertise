#!/usr/bin/env node

/**
 * Force and Boundaries Domains Generator
 * 
 * Creates domains related to the ethical use of force, setting boundaries,
 * protective measures, and educational firmness that might be perceived as "mean"
 * but are essential for peace, safety, and proper development.
 */

const fs = require('fs-extra');
const path = require('path');

const DOMAINS_PATH = path.join(__dirname, '../domains');
const TEMPLATE_PATH = path.join(__dirname, '../templates/domain_template.md');

// Ensure domains directory exists
fs.ensureDirSync(DOMAINS_PATH);

// Domain structure for ethical force and boundaries
const forceAndBoundariesDomains = {
  'ethical-force': {
    displayName: 'Ethical Force',
    description: 'Understanding when and how to appropriately use force, authority, and firmness in service of protection, education, and maintaining just order while minimizing harm and maximizing long-term wellbeing.',
    tags: ['force', 'ethics', 'protection', 'authority', 'justice', 'self-defense'],
    subDomains: [
      'protective-force',
      'educational-firmness',
      'law-enforcement-ethics',
      'self-defense',
      'parental-authority',
      'institutional-discipline'
    ]
  },
  'boundaries-and-limits': {
    displayName: 'Boundaries and Limits',
    description: 'Establishing, maintaining, and enforcing healthy boundaries and limits that protect individuals and communities while fostering growth, respect, and appropriate behavior.',
    tags: ['boundaries', 'limits', 'protection', 'respect', 'structure', 'safety'],
    subDomains: [
      'personal-boundaries',
      'professional-boundaries',
      'community-standards',
      'child-development-limits',
      'therapeutic-boundaries',
      'social-norms-enforcement'
    ]
  },
  'protective-intervention': {
    displayName: 'Protective Intervention',
    description: 'Recognizing when intervention is necessary to protect the vulnerable, stop harm, or prevent greater damage, including the methods and principles for effective protective action.',
    tags: ['intervention', 'protection', 'prevention', 'safety', 'rescue', 'safeguarding'],
    subDomains: [
      'child-protection',
      'domestic-violence-intervention',
      'community-safety',
      'mental-health-crisis-intervention',
      'abuse-prevention',
      'vulnerable-population-protection'
    ]
  },
  'constructive-confrontation': {
    displayName: 'Constructive Confrontation',
    description: 'The art and science of addressing harmful behaviors, challenging wrongdoing, and confronting problems in ways that lead to positive change while maintaining dignity and relationship when possible.',
    tags: ['confrontation', 'accountability', 'correction', 'feedback', 'challenge', 'growth'],
    subDomains: [
      'difficult-conversations',
      'performance-management',
      'behavioral-correction',
      'accountability-systems',
      'truth-telling',
      'intervention-strategies'
    ]
  },
  'educational-discipline': {
    displayName: 'Educational Discipline',
    description: 'Disciplinary approaches that teach, guide, and shape behavior in service of character development, learning, and preparation for responsible citizenship while respecting human dignity.',
    tags: ['discipline', 'education', 'character', 'development', 'guidance', 'training'],
    subDomains: [
      'positive-discipline',
      'character-formation',
      'behavioral-training',
      'mentorship-methods',
      'corrective-feedback',
      'developmental-consequences'
    ]
  },
  'just-authority': {
    displayName: 'Just Authority',
    description: 'The proper exercise of authority, leadership, and power in service of others and the common good, including when authority must be firm or decisive to fulfill its protective and guiding responsibilities.',
    tags: ['authority', 'leadership', 'power', 'responsibility', 'governance', 'stewardship'],
    subDomains: [
      'servant-leadership',
      'parental-authority',
      'institutional-governance',
      'moral-authority',
      'crisis-leadership',
      'power-and-responsibility'
    ]
  }
};

// Function to create domain structure
async function createDomain(domainId, domainInfo) {
  const domainDir = path.join(DOMAINS_PATH, domainId);
  
  // Check if domain already exists
  if (fs.existsSync(domainDir)) {
    console.log(`✓ Domain '${domainId}' already exists, skipping...`);
    return;
  }
  
  // Create domain directory
  fs.ensureDirSync(domainDir);
  
  // Read template
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  
  // Replace template placeholders
  const domainContent = template
    .replace('[Domain Name]', domainInfo.displayName)
    .replace('Brief description of this domain and its scope.', domainInfo.description)
    .replace('[Names]', 'Ethical Leaders, Protective Guardians, Wise Educators')
    .replace('[Date]', new Date().toISOString().split('T')[0])
    .replace('[Version number]', '0.1')
    .replace('[Relevant tags for searchability]', domainInfo.tags.join(', '));
  
  // Add sub-domains list
  const subDomainsSection = domainInfo.subDomains.map(sub => `- ${sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' ')}`).join('\n');
  const finalContent = domainContent.replace('Links to more specialized domains within this area.', subDomainsSection);
  
  // Write domain README
  fs.writeFileSync(path.join(domainDir, 'README.md'), finalContent);
  
  console.log(`✅ Created domain: ${domainInfo.displayName}`);
  
  // Create sub-domains
  for (const subDomain of domainInfo.subDomains) {
    await createSubDomain(domainId, subDomain);
  }
}

// Function to create sub-domain
async function createSubDomain(parentDomain, subDomainId) {
  const subDomainDir = path.join(DOMAINS_PATH, parentDomain, subDomainId);
  
  if (fs.existsSync(subDomainDir)) {
    return; // Skip if exists
  }
  
  fs.ensureDirSync(subDomainDir);
  
  const displayName = subDomainId.charAt(0).toUpperCase() + subDomainId.slice(1).replace(/-/g, ' ');
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  
  const subDomainContent = template
    .replace('[Domain Name]', `${displayName}`)
    .replace('Brief description of this domain and its scope.', `This sub-domain focuses on ${displayName.toLowerCase()} as part of ${parentDomain.replace(/-/g, ' ')} expertise, emphasizing ethical application in service of protection, education, and justice.`)
    .replace('[Names]', 'Ethical Leaders, Protective Guardians, Wise Educators')
    .replace('[Date]', new Date().toISOString().split('T')[0])
    .replace('[Version number]', '0.1')
    .replace('[Relevant tags for searchability]', `${parentDomain}, ${subDomainId}, ethics, protection, education`)
    .replace('Links to more specialized domains within this area.', 'Specific ethical applications and protective practices within this domain.');
  
  fs.writeFileSync(path.join(subDomainDir, 'README.md'), subDomainContent);
  console.log(`  ✓ Created sub-domain: ${displayName}`);
}

// Main execution
async function main() {
  console.log('⚡ Creating Force and Boundaries Domains...');
  console.log('==========================================');
  
  for (const [domainId, domainInfo] of Object.entries(forceAndBoundariesDomains)) {
    await createDomain(domainId, domainInfo);
  }
  
  console.log('');
  console.log('🛡️  Force and Boundaries domains created successfully!');
  console.log('');
  console.log('These domains focus on:');
  console.log('• Ethical use of force for protection and education');
  console.log('• Establishing and maintaining healthy boundaries');
  console.log('• Protective intervention when necessary');
  console.log('• Constructive confrontation and accountability');
  console.log('• Educational discipline that builds character');
  console.log('• Just authority exercised in service of others');
  console.log('');
  console.log('These domains recognize that true peace sometimes requires:');
  console.log('• Firmness in education and character development');
  console.log('• Protection of the vulnerable through decisive action');
  console.log('• Enforcement of boundaries that maintain safety and respect');
  console.log('• Authority exercised responsibly for the common good');
}

main().catch(console.error); 