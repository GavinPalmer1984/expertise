#!/usr/bin/env node

/**
 * Peace Domains Generator
 * 
 * Creates domains and sub-domains focused on achieving peace on Earth,
 * maximizing human flourishing, and fostering love for all creation.
 */

const fs = require('fs-extra');
const path = require('path');

const DOMAINS_PATH = path.join(__dirname, '../domains');
const TEMPLATE_PATH = path.join(__dirname, '../templates/domain_template.md');

// Ensure domains directory exists
fs.ensureDirSync(DOMAINS_PATH);

// Domain structure for peace and human flourishing
const peaceDomains = {
  'peace-building': {
    displayName: 'Peace Building',
    description: 'Knowledge and practices for resolving conflicts, building sustainable peace, and creating harmonious relationships between individuals, groups, and nations.',
    tags: ['peace', 'conflict resolution', 'mediation', 'reconciliation', 'harmony'],
    subDomains: [
      'conflict-resolution',
      'restorative-justice',
      'peace-education',
      'diplomatic-strategies',
      'trauma-healing',
      'forgiveness-practices'
    ]
  },
  'human-flourishing': {
    displayName: 'Human Flourishing',
    description: 'Understanding and promoting the conditions that enable humans to thrive physically, mentally, emotionally, and spiritually across all stages of life.',
    tags: ['wellbeing', 'flourishing', 'human potential', 'life satisfaction', 'growth'],
    subDomains: [
      'positive-psychology',
      'life-purpose',
      'resilience-building',
      'human-development',
      'meaning-making',
      'personal-growth'
    ]
  },
  'environmental-stewardship': {
    displayName: 'Environmental Stewardship',
    description: 'Caring for and protecting the natural world to ensure sustainable life for all creation, including humans, animals, plants, and ecosystems.',
    tags: ['environment', 'sustainability', 'conservation', 'ecology', 'stewardship'],
    subDomains: [
      'regenerative-practices',
      'biodiversity-protection',
      'climate-action',
      'sustainable-living',
      'ecosystem-restoration',
      'circular-economy'
    ]
  },
  'social-justice': {
    displayName: 'Social Justice',
    description: 'Creating fair and equitable societies where all people have access to opportunities, resources, and dignity regardless of their background or circumstances.',
    tags: ['justice', 'equity', 'human rights', 'fairness', 'dignity'],
    subDomains: [
      'equity-systems',
      'human-rights',
      'anti-oppression',
      'inclusive-governance',
      'economic-justice',
      'racial-justice'
    ]
  },
  'compassion-cultivation': {
    displayName: 'Compassion Cultivation',
    description: 'Developing and practicing compassion, empathy, and loving-kindness toward all beings as a foundation for peaceful coexistence.',
    tags: ['compassion', 'empathy', 'love', 'kindness', 'caring'],
    subDomains: [
      'empathy-development',
      'loving-kindness',
      'compassionate-communication',
      'service-to-others',
      'universal-love',
      'interspecies-compassion'
    ]
  },
  'spiritual-wisdom': {
    displayName: 'Spiritual Wisdom',
    description: 'Exploring spiritual principles, practices, and wisdom traditions that promote love, unity, peace, and connection with the divine and all creation.',
    tags: ['spirituality', 'wisdom', 'divine', 'unity', 'sacred'],
    subDomains: [
      'contemplative-practices',
      'interfaith-dialogue',
      'sacred-texts',
      'spiritual-development',
      'unity-consciousness',
      'divine-connection'
    ]
  },
  'regenerative-systems': {
    displayName: 'Regenerative Systems',
    description: 'Designing and implementing systems that restore, renew, and enhance life rather than depleting it, across all domains of human activity.',
    tags: ['regeneration', 'systems', 'renewal', 'restoration', 'life-giving'],
    subDomains: [
      'regenerative-agriculture',
      'healing-communities',
      'restorative-economics',
      'life-giving-technology',
      'regenerative-governance',
      'ecological-design'
    ]
  },
  'global-cooperation': {
    displayName: 'Global Cooperation',
    description: 'Fostering collaboration, understanding, and mutual support across cultural, national, and ideological boundaries for the benefit of all humanity.',
    tags: ['cooperation', 'collaboration', 'global', 'unity', 'partnership'],
    subDomains: [
      'international-collaboration',
      'cultural-bridge-building',
      'global-governance',
      'shared-resources',
      'collective-problem-solving',
      'world-citizenship'
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
    .replace('[Names]', 'Peace Builders, Wisdom Keepers')
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
    .replace('Brief description of this domain and its scope.', `This sub-domain focuses on ${displayName.toLowerCase()} as part of ${parentDomain.replace(/-/g, ' ')} expertise.`)
    .replace('[Names]', 'Peace Builders, Wisdom Keepers')
    .replace('[Date]', new Date().toISOString().split('T')[0])
    .replace('[Version number]', '0.1')
    .replace('[Relevant tags for searchability]', `${parentDomain}, ${subDomainId}, peace, love, flourishing`)
    .replace('Links to more specialized domains within this area.', 'Specific practices and applications within this domain.');
  
  fs.writeFileSync(path.join(subDomainDir, 'README.md'), subDomainContent);
  console.log(`  ✓ Created sub-domain: ${displayName}`);
}

// Main execution
async function main() {
  console.log('🌍 Creating Peace and Flourishing Domains...');
  console.log('===============================================');
  
  for (const [domainId, domainInfo] of Object.entries(peaceDomains)) {
    await createDomain(domainId, domainInfo);
  }
  
  console.log('');
  console.log('🕊️  Peace domains created successfully!');
  console.log('');
  console.log('These domains focus on:');
  console.log('• Building lasting peace through conflict resolution and healing');
  console.log('• Promoting human flourishing and wellbeing for all');
  console.log('• Caring for the environment and all creation');
  console.log('• Creating just and equitable societies');
  console.log('• Cultivating compassion and love');
  console.log('• Integrating spiritual wisdom and practices');
  console.log('• Designing regenerative systems that give life');
  console.log('• Fostering global cooperation and unity');
}

main().catch(console.error); 