class ProductsPage {
  constructor(page) {
    this.page = page;
    this.searchInput      = page.locator('#search_product');
    this.searchButton     = page.locator('#submit_search');
    this.productCards     = page.locator('.features_items .product-image-wrapper');
    this.productTitles    = page.locator('.features_items .productinfo p');
    this.firstViewProduct = page.locator('.choose a').first();
    this.productName      = page.locator('.product-information h2');
    this.addToCartButtons = page.locator('.product-image-wrapper .btn');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async getProductCount() {
    return this.productCards.count();
  }

  async viewFirstProduct() {
    await this.firstViewProduct.click();
  }

  async getFirstProductName() {
    return this.productTitles.first().textContent();
  }

  async isLoaded() {
    await this.productCards.first().waitFor({ state: 'visible' });
    return true;
  }
}

module.exports = { ProductsPage };
