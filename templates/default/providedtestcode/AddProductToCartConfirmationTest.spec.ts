import { test, expect } from '@playwright/test';

test('Linear test script for test: Add product to cart confirmation', async ({ page }) => {

    // -- @Given( "I'm on the VGP Shop homepage" )
    await page.goto('https://vgp-shop.polteq-testing.com/');

    // -- @When( "I go to the SHOP" )
    await page.locator('#page li.my-shop a').click();

    // -- @And( "I go to the Hoodie with logo detail page" )
    await page.locator('h2 > a', { hasText: 'Hoodie with Logo' }).click();

    // -- @And( "I add the Hoodie with logo to the cart" )
    await page.locator('button[name="add-to-cart"]').click();

    // -- @Then( "I should get a confirmation that the product is added to the shopping cart" )
    await expect(page.locator('.woocommerce-message')).toBeVisible();

    // -- @But( "I should not be taken directly to my shopping cart" )
    await expect(page.locator('a.button.checkout')).toBeVisible();

});