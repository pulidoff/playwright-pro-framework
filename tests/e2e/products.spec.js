const { test, expect } = require('@playwright/test');
const { POManager }    = require('../../pageobjects/POManager');

test.describe('Products Page', () => {
  test('should display product cards on the products page', async ({ page }) => {
    const pom      = new POManager(page);
    const products = pom.getProductsPage();

    await products.goto();
    const loaded = await products.isLoaded();
    const count  = await products.getProductCount();

    expect(loaded).toBe(true);
    expect(count).toBeGreaterThan(0);
  });

  test('should filter products using the search box', async ({ page }) => {
    const pom      = new POManager(page);
    const products = pom.getProductsPage();

    await products.goto();
    await products.searchProduct('top');
    await page.waitForLoadState('networkidle');

    const count = await products.getProductCount();
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('.productinfo p').first()).toContainText(/.+/);
  });

  test('should open the product detail page', async ({ page }) => {
    await page.goto('/product_details/1');

    await expect(page).toHaveURL(/product_details/);
    await expect(page.locator('.product-information h2')).toBeVisible();
  });
});
