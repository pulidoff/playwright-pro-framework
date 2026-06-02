const { test, expect } = require('@playwright/test');

test.describe('Homepage Visual Regression', () => {
  test('nav header matches snapshot', async ({ page }) => {
    await page.goto('/');
    await page.locator('#header').waitFor({ state: 'visible' });

    // Mask dynamic content (e.g. banners/ads) before snapshotting
    await expect(page.locator('#header')).toHaveScreenshot('nav-header.png', {
      mask: [page.locator('.shop-menu')],
      maxDiffPixelRatio: 0.02,
    });
  });
});
