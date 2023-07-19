const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 10000 })

/* disabling - evs explore Stage is not avail outside of NCI firewall!
test('visit page and check response code', async ({ page }) => {

  //evsexplore.nci.nih.gov now forwards to evsexplore.csemantics.cancer.gov
  const response = await page.goto('https://evsexplore-stage.semantics.cancer.gov/evsexplore/welcome')
  //const response = await page.goto('https://evsexplore-stage.nci.nih.gov/evsexplore/welcome')

    // Test that the response did not fail
    expect(response.status()).toBeLessThan(400)
})
*/