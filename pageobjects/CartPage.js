class CartPage {
  constructor(page) {
    this.page = page;
    this.cartTable      = page.locator('#cart_info_table');
    this.cartRows       = page.locator('#cart_info_table tbody tr');
    this.emptyCartMsg   = page.locator('#empty_cart');
    this.productNames   = page.locator('.cart_description h4 a');
    this.productPrices  = page.locator('.cart_price p');
    this.quantities     = page.locator('.cart_quantity button');
    this.deleteButtons  = page.locator('.cart_delete a');
    this.proceedCheckout = page.locator('.btn.btn-default.check_out');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async getCartItemCount() {
    return this.cartRows.count();
  }

  async isEmpty() {
    return this.emptyCartMsg.isVisible();
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async removeFirstItem() {
    await this.deleteButtons.first().click();
  }

  async proceedToCheckout() {
    await this.proceedCheckout.click();
  }

  async isLoaded() {
    await this.page.waitForSelector('#cart_info', { state: 'visible' });
    return true;
  }
}

module.exports = { CartPage };
