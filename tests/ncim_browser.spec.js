const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 60000 })

test('visit page and take screenshot', async ({ page }) => {

  const response = await page.goto('https://ncim.nci.nih.gov/ncimbrowser/');

    // Test that the response did not fail
    expect(response.status()).toBeLessThan(400)

})

test('has valid http status', async ({ page }) => {
  const response = await page.goto('https://ncim.nci.nih.gov/ncimbrowser/');
  
  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
});


test('has no title', async ({ page }) => {
  const response = await page.goto('https://ncim.nci.nih.gov/ncimbrowser/');
  
  // Page title is empty
  await expect(page).not.toHaveTitle('');
});


test('has Welcome text', async ({ page }) => {
  const response = await page.goto('https://ncim.nci.nih.gov/ncimbrowser/');
  
  // Page has 'Welcome' subtitle
  await expect(page.getByText('Welcome')).toBeVisible();
});
