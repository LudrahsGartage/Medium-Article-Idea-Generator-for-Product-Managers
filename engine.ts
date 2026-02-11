
import { PM_FRAMEWORKS, DIGITAL_PRODUCTS, PUBLIC_COMPANIES, PHYSICAL_DOMAINS } from './constants';
import { IdeaResult, CategoryData } from './types';

export function generateSmartIdea(): IdeaResult {
  const category = PM_FRAMEWORKS[Math.floor(Math.random() * PM_FRAMEWORKS.length)];
  const components: Record<string, string> = {};
  
  // 1. Initial selection
  Object.entries(category.columns).forEach(([key, values]) => {
    components[key] = values[Math.floor(Math.random() * values.length)];
  });

  const rulesApplied: string[] = [];

  // 2. Compatibility Rules
  if (category.id === 'C1') {
    if (['Kano Model', 'JTBD', 'HEART metrics'].includes(components.topic) && !DIGITAL_PRODUCTS.includes(components.product)) {
      components.product = DIGITAL_PRODUCTS[Math.floor(Math.random() * DIGITAL_PRODUCTS.length)];
      rulesApplied.push('Digital Product Alignment');
    }
    if (components.topic === 'RICE prioritisation') {
      // Logic for C1 specifically handles outcome later in formula
    }
  }

  if (category.id === 'C3') {
    if (['earnings calls', 'investor report'].includes(components.source) && !PUBLIC_COMPANIES.includes(components.sector)) {
      components.sector = PUBLIC_COMPANIES[Math.floor(Math.random() * PUBLIC_COMPANIES.length)];
      rulesApplied.push('Public Company Sync');
    }
  }

  if (category.id === 'C4') {
    // Prevent tech-heavy methods on physical domains unless it's a "How I'd Fix" case
    if (PHYSICAL_DOMAINS.includes(components.domain) && ['A/B testing', 'SQL query'].includes(components.method)) {
      components.method = 'Journey map';
      rulesApplied.push('Domain/Method Compatibility');
    }
  }

  // 3. Generate raw title
  let title = category.formula(components);
  let subtitle = "";

  // 4. Validation Gates (Heuristic Score)
  let score = 3; // Baseline
  if (title.length > 20) score++;
  if (Object.keys(components).length >= 3) score++;

  // 5. Context Enrichment Rules
  if (score < 5) {
    if (category.id === 'C1' && !title.toLowerCase().includes('mistake')) {
      title += " — and the 1 thing I got wrong";
      rulesApplied.push('Mistake Enrichment');
    }
    if (category.id === 'C2') {
      title += " — why this saved me 2 hours/week";
      rulesApplied.push('Benefit Enrichment');
    }
    if (category.id === 'C4') {
      title += " (with before/after wireframes)";
      subtitle = "How small UX tweaks solve major physical pain points.";
      rulesApplied.push('Artifact Enrichment');
    }
    if (category.id === 'C5') {
      if (!title.startsWith('Teardown:')) title = 'Teardown: ' + title;
      subtitle = `Based on ${components.evidence}.`;
      rulesApplied.push('Evidence Hook');
    }
    if (category.id === 'C6') {
      subtitle = "Designed in 2 hours using Figma.";
      rulesApplied.push('Artifact Scaffolding');
    }
  }

  return {
    category: category.type,
    title,
    subtitle,
    components,
    validationScore: Math.min(score, 5),
    rulesApplied
  };
}
