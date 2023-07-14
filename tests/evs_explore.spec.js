const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 10000 })

test('visit page and take screenshot', async ({ page }) => {

  const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://FAKETEST.evsexplore.nci.nih.gov/evsexplore/welcome')

    // Test that the response did not fail
    expect(response.status()).toBeLessThan(400)
})
