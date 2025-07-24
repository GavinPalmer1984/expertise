#!/usr/bin/env node

/**
 * Research Prompts Generator
 * 
 * Generates customized research prompts for expert researchers
 * to contribute knowledge to each domain and subdomain.
 */

const fs = require('fs-extra');
const path = require('path');

const DOMAINS_PATH = path.join(__dirname, '../domains');
const OUTPUT_PATH = path.join(__dirname, '../research-prompts');

// Ensure output directory exists
fs.ensureDirSync(OUTPUT_PATH);

// Base prompt template
const generatePrompt = (domainName, domainType = 'domain', parentDomain = '') => {
  const isSubdomain = domainType === 'subdomain';
  const displayName = domainName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const context = isSubdomain ? `within the broader context of ${parentDomain.replace(/-/g, ' ')}` : '';
  
  return `# Research Prompt: ${displayName} ${isSubdomain ? 'Sub-Domain' : 'Domain'}

## Mission Statement
You are part of a global effort to curate and cultivate expertise that promotes peace on Earth, human flourishing, and love for all creation. Your research ${context} will contribute to a living knowledge base designed to help the maximum number of people enjoy life and foster harmony with all beings.

## Your Task
As an expert researcher in **${displayName}**, you are asked to contribute your knowledge, insights, and wisdom to help build a comprehensive understanding of this field. Your contributions will be transformed into multiple formats:
- AI-accessible knowledge (MCP servers)
- Educational books and materials
- Public websites for knowledge sharing

## Research Framework

### 1. Core Knowledge Contribution
Please provide deep insights into **${displayName}** by addressing:

**Fundamental Principles:**
- What are the core principles that govern effective practice in ${displayName.toLowerCase()}?
- What universal truths have you discovered through your research and experience?
- How does ${displayName.toLowerCase()} contribute to human flourishing and peaceful coexistence?

**Evidence Base:**
- What does current research reveal about best practices in this field?
- Which studies, experiments, or empirical evidence most strongly support effective approaches?
- What gaps exist in current research that need attention?

**Interconnections:**
- How does ${displayName.toLowerCase()} connect with other domains of human knowledge and practice?
- What cross-disciplinary insights enhance understanding and effectiveness?
- How can practitioners integrate this knowledge with other approaches?

### 2. Best Practices Documentation
Share your most valuable practical wisdom:

**Proven Methodologies:**
- What specific practices, techniques, or approaches consistently produce positive outcomes?
- Which interventions have you seen create lasting positive change?
- What conditions must be present for these practices to be most effective?

**Implementation Guidelines:**
- How should beginners approach learning and practicing in this field?
- What sequence of development leads to mastery and effectiveness?
- How can these practices be adapted for different contexts, cultures, and populations?

**Success Indicators:**
- How do you measure progress and success in ${displayName.toLowerCase()}?
- What observable changes indicate that practices are working effectively?
- How do you distinguish between surface-level and deep, lasting transformation?

### 3. Anti-Patterns and Pitfalls
Help others avoid common mistakes by documenting:

**Common Misconceptions:**
- What widespread beliefs about ${displayName.toLowerCase()} are actually counterproductive?
- Which popular approaches often fail to deliver promised results?
- What oversimplifications should practitioners avoid?

**Implementation Failures:**
- What are the most frequent mistakes practitioners make?
- Which approaches seem promising but consistently lead to negative outcomes?
- How can well-intentioned efforts sometimes cause harm?

**Warning Signs:**
- What early indicators suggest that an approach is heading in the wrong direction?
- How can practitioners recognize when they need to change course?
- What systemic patterns tend to undermine effectiveness?

### 4. Failures and Lessons Learned
Share wisdom gained through setbacks and challenges:

**Personal/Professional Failures:**
- What significant failures in your career or research taught you the most?
- Which assumptions did you have to abandon based on real-world experience?
- How did failures redirect your understanding toward more effective approaches?

**Field-Wide Learning:**
- What major shifts has the field undergone as understanding evolved?
- Which once-popular approaches have been discredited, and why?
- How has the field learned from past mistakes to improve current practice?

**Transformative Insights:**
- What breakthrough moments fundamentally changed your understanding?
- Which unexpected discoveries redirected your research or practice?
- How did apparent failures later reveal important truths?

### 5. Future Directions and Emerging Insights
Share your vision for advancing the field:

**Promising Research Areas:**
- What emerging research directions show the most promise?
- Which questions need urgent investigation to advance the field?
- How might new technologies or methodologies enhance understanding and practice?

**Integration Opportunities:**
- How could ${displayName.toLowerCase()} be better integrated with other fields?
- What collaborative research might yield breakthrough insights?
- How can practitioners from different backgrounds work together more effectively?

**Scaling and Impact:**
- How can effective practices in ${displayName.toLowerCase()} reach more people?
- What barriers prevent widespread adoption of proven approaches?
- How can this knowledge contribute to broader societal transformation?

## Special Considerations for Peace and Flourishing

Given that this research contributes to global peace and human flourishing, please especially consider:

**Universal Applicability:**
- How can these insights serve people across different cultures, economic situations, and life circumstances?
- What modifications make these approaches accessible to marginalized or underserved populations?
- How do these practices contribute to reducing suffering and increasing joy?

**Ethical Dimensions:**
- What ethical principles should guide practice in this field?
- How do you ensure that applications of this knowledge serve the highest good?
- What safeguards prevent misuse of these insights?

**Systemic Impact:**
- How does excellence in ${displayName.toLowerCase()} contribute to broader social transformation?
- What ripple effects do effective practices create in communities and societies?
- How can individual transformation contribute to collective healing and growth?

## Submission Guidelines

**Structure your contribution using these sections:**
1. **Knowledge** - Core principles, evidence, and insights
2. **Best Practices** - Proven methodologies and implementation guidelines  
3. **Anti-Patterns** - Common mistakes and counterproductive approaches
4. **Failures and Lessons** - Learning from setbacks and course corrections
5. **Resources** - Key references, tools, and further learning materials
6. **Future Directions** - Emerging opportunities and research needs

**Writing Guidelines:**
- Write for both experts and intelligent non-specialists
- Include concrete examples and case studies where possible
- Reference key research and sources
- Balance academic rigor with practical applicability
- Consider how this knowledge serves love, peace, and human flourishing

**Collaboration:**
- Your work will be combined with other expert contributions
- Focus on your unique insights while noting areas where others might contribute
- Suggest connections to other domains where relevant
- Remain open to revision and integration with complementary perspectives

## Questions for Reflection

Before you begin, consider:
- How does your expertise in ${displayName.toLowerCase()} serve the vision of peace on Earth?
- What unique perspective do you bring that others might not?
- How can your knowledge help the maximum number of people flourish?
- What would you want future generations to understand about this field?

## Thank You

Your contribution to this knowledge base helps create a world where more people can experience joy, peace, and love for all creation. The wisdom you share may touch countless lives and contribute to positive transformation across communities and generations.

---

*This prompt is part of the Expertise Repository project: systematically curating and cultivating knowledge for human flourishing and peace on Earth.*`;
};

// Function to scan domains and generate prompts
async function generateAllPrompts() {
  console.log('🔬 Generating Research Prompts...');
  console.log('==================================');
  
  const domains = fs.readdirSync(DOMAINS_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  let totalPrompts = 0;
  
  for (const domain of domains) {
    const domainPath = path.join(DOMAINS_PATH, domain);
    
    // Generate prompt for main domain
    const domainPrompt = generatePrompt(domain, 'domain');
    const domainOutputPath = path.join(OUTPUT_PATH, `${domain}-domain-prompt.md`);
    fs.writeFileSync(domainOutputPath, domainPrompt);
    console.log(`✅ Generated domain prompt: ${domain}`);
    totalPrompts++;
    
    // Check for subdomains
    const subDomains = fs.readdirSync(domainPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const subDomain of subDomains) {
      const subDomainPrompt = generatePrompt(subDomain, 'subdomain', domain);
      const subDomainOutputPath = path.join(OUTPUT_PATH, `${domain}-${subDomain}-subdomain-prompt.md`);
      fs.writeFileSync(subDomainOutputPath, subDomainPrompt);
      console.log(`  ✓ Generated subdomain prompt: ${domain}/${subDomain}`);
      totalPrompts++;
    }
  }
  
  // Generate master prompt list
  const masterList = `# Research Prompts Master List

This directory contains ${totalPrompts} research prompts for expert researchers across all domains and subdomains in the Expertise Repository.

## Purpose
These prompts are designed to help expert researchers contribute high-quality knowledge to build a comprehensive repository focused on:
- Peace on Earth
- Human flourishing 
- Love for all creation
- Practical wisdom for positive transformation

## How to Use
1. Find the prompt file for your area of expertise
2. Review the research framework and guidelines
3. Contribute your knowledge using the structured format
4. Submit your contribution to be integrated into the expertise repository

## Prompt Files

### Domain Prompts
${domains.map(domain => `- [${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Domain](${domain}-domain-prompt.md)`).join('\n')}

### Subdomain Prompts
${domains.map(domain => {
  const domainPath = path.join(DOMAINS_PATH, domain);
  const subDomains = fs.existsSync(domainPath) ? 
    fs.readdirSync(domainPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name) : [];
  
  if (subDomains.length === 0) return '';
  
  return `**${domain.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:**\n${subDomains.map(sub => 
    `- [${sub.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}](${domain}-${sub}-subdomain-prompt.md)`
  ).join('\n')}`;
}).filter(Boolean).join('\n\n')}

## Contribution Process
1. **Select your expertise area** from the prompts above
2. **Follow the research framework** provided in each prompt
3. **Structure your contribution** using the standard format
4. **Submit via** the repository's contribution process
5. **Collaborate** with other experts for integration and refinement

## Quality Standards
All contributions should:
- Serve the mission of peace and human flourishing
- Balance academic rigor with practical applicability  
- Include evidence-based insights and real-world experience
- Consider diverse populations and contexts
- Maintain ethical standards and safeguards

---
*Generated: ${new Date().toISOString().split('T')[0]}*
*Total Prompts: ${totalPrompts}*`;

  fs.writeFileSync(path.join(OUTPUT_PATH, 'README.md'), masterList);
  
  console.log('');
  console.log(`🎯 Generated ${totalPrompts} research prompts successfully!`);
  console.log(`📋 Master list created at: research-prompts/README.md`);
  console.log('');
  console.log('These prompts will help expert researchers contribute knowledge to:');
  console.log('• Build comprehensive expertise for peace and human flourishing');
  console.log('• Document best practices and avoid common pitfalls');
  console.log('• Learn from failures and breakthrough insights');
  console.log('• Create practical wisdom accessible through multiple formats');
}

generateAllPrompts().catch(console.error); 