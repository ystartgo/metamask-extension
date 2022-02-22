const { strict: assert } = require('assert');
const { convertToHexValue, withFixtures } = require('../helpers');
const LoginPage = require('../page-objects/login.page');

describe('Show account details', function () {
  const ganacheOptions = {
    accounts: [
      {
        secretKey:
          '0x7C9529A67102755B7E6102D6D950AC5D5863C98713805CEC576B945B15B71EAC',
        balance: convertToHexValue(25000000000000000000),
      },
    ],
  };
  it('should show the QR code for the account', async function () {
    await withFixtures(
      {
        fixtures: 'imported-account',
        ganacheOptions,
        title: this.test.title,
      },
      async ({ driver }) => {
        const loginPage = new LoginPage(driver);
        await driver.navigate();
        await loginPage.unlock('correct horse battery staple');

        await driver.clickElement(
          '[data-testid="account-options-menu-button"]',
        );
        await driver.clickElement(
          '[data-testid="account-options-menu__account-details"]',
        );

        const qrCode = await driver.findElement('.qr-code__wrapper');
        assert.equal(await qrCode.isDisplayed(), true);
      },
    );
  });
});