const { test: base } = require('@playwright/test');
const { SOManager }  = require('../serviceobjects/SOManager');

const test = base.extend({
  soManager: async ({ request }, use) => {
    const som = new SOManager(request);
    await use(som);
  },
});

const expect = base.expect;

module.exports = { test, expect };
