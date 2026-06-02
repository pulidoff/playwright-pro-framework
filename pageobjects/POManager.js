const { HomePage }     = require('./HomePage');
const { ProductsPage } = require('./ProductsPage');
const { CartPage }     = require('./CartPage');

class POManager {
  constructor(page) {
    this.page = page;
  }

  getHomePage()     { return new HomePage(this.page); }
  getProductsPage() { return new ProductsPage(this.page); }
  getCartPage()     { return new CartPage(this.page); }
}

module.exports = { POManager };
