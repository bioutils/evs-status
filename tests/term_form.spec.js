const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 60000 });

test('visit page and take screenshot', async ({ page }) => {

  test.setTimeout(120000);
  
  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://ncitermform.nci.nih.gov/ncitermform/?dictionary=NCI%20Thesaurus')

    // Test that the response did not fail
    expect(response.status()).toBeLessThan(400)

});
