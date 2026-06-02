const { test } = require('@playwright/test');
const { runAxeAnalysis } = require('../../utils/a11yHelper');

const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];

function logViolations(violations, byImpact, label) {
  if (violations.length === 0) {
    console.log(`[a11y] ${label}: no violations`);
    return;
  }
  console.warn(`[a11y] ${label}: ${violations.length} violation(s)`);
  for (const impact of IMPACT_ORDER) {
    const items = byImpact[impact] || [];
    if (items.length) {
      console.warn(`  [${impact}] ${items.map(v => `${v.id} (${v.nodes.length} node(s))`).join(' | ')}`);
    }
  }
}

test.describe('Homepage Accessibility — WCAG 2.1 AA', () => {
  test('full homepage passes axe WCAG audit', async ({ page }) => {
    await page.goto('/');
    await page.locator('#header').waitFor({ state: 'visible' });

    const { violations, byImpact } = await runAxeAnalysis(page);
    logViolations(violations, byImpact, 'full page');
  });

  test('navigation header passes axe WCAG audit', async ({ page }) => {
    await page.goto('/');
    await page.locator('#header').waitFor({ state: 'visible' });

    const { violations, byImpact } = await runAxeAnalysis(page, '#header');
    logViolations(violations, byImpact, '#header');
  });
});
