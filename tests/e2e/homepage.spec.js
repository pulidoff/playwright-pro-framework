const { test, expect } = require('@playwright/test');
const { POManager }    = require('../../pageobjects/POManager');

test.describe('Homepage Navigation', () => {
  test('should load the homepage and display the logo', async ({ page }) => {
    const pom  = new POManager(page);
    const home = pom.getHomePage();

    await home.goto();
    const loaded = await home.isLoaded();

    expect(loaded).toBe(true);
    await expect(home.logo).toBeVisible();
  });

  test('should navigate to the Products page from the nav bar', async ({ page }) => {
    const pom  = new POManager(page);
    const home = pom.getHomePage();

    await home.goto();
    await home.clickProducts();

    await expect(page).toHaveURL(/products/);
    await expect(page.locator('.features_items')).toBeVisible();
  });

  test('should navigate to the Cart page from the nav bar', async ({ page }) => {
    const pom  = new POManager(page);
    const home = pom.getHomePage();

    await home.goto();
    await home.clickCart();

    await expect(page).toHaveURL(/view_cart/);
  });
});
