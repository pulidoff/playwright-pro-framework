class HomePage {
  constructor(page) {
    this.page = page;
    this.navBar        = page.locator('#header');
    this.logo          = page.locator('#header .logo img');
    this.navHome       = page.locator('a[href="/"]').first();
    this.navProducts   = page.locator('a[href="/products"]');
    this.navCart       = page.locator('#header').getByRole('link', { name: 'Cart' });
    this.navLogin      = page.locator('a[href="/login"]');
    this.slider        = page.locator('#slider');
    this.featuredItems = page.locator('.features_items');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickProducts() {
    await this.navProducts.click();
  }

  async clickCart() {
    await this.navCart.click();
  }

  async clickLogin() {
    await this.navLogin.click();
  }

  async isLoaded() {
    await this.logo.waitFor({ state: 'visible' });
    return true;
  }

  async getTitle() {
    return this.page.title();
  }
}

module.exports = { HomePage };
