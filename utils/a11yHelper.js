const { AxeBuilder } = require('@axe-core/playwright');

async function runAxeAnalysis(page, selector = null, tags = ['wcag2a', 'wcag2aa']) {
  let builder = new AxeBuilder({ page }).withTags(tags);
  if (selector) {
    builder = builder.include(selector);
  }
  const results = await builder.analyze();

  const byImpact = {};
  for (const violation of results.violations) {
    const impact = violation.impact || 'unknown';
    if (!byImpact[impact]) byImpact[impact] = [];
    byImpact[impact].push(violation);
  }

  return { violations: results.violations, byImpact };
}

async function runA11yAudit(page, options = {}) {
  const { violations, byImpact } = await runAxeAnalysis(page);
  if (violations.length > 0) {
    console.warn(`[a11y] ${violations.length} violation(s) found:`);
    for (const [impact, items] of Object.entries(byImpact)) {
      console.warn(`  [${impact}] ${items.map(v => v.id).join(', ')}`);
    }
  }
}

async function runA11yAuditOnElement(page, selector, options = {}) {
  const { violations, byImpact } = await runAxeAnalysis(page, selector);
  if (violations.length > 0) {
    console.warn(`[a11y] ${violations.length} violation(s) in "${selector}":`);
    for (const [impact, items] of Object.entries(byImpact)) {
      console.warn(`  [${impact}] ${items.map(v => v.id).join(', ')}`);
    }
  }
}

module.exports = { runAxeAnalysis, runA11yAudit, runA11yAuditOnElement };
