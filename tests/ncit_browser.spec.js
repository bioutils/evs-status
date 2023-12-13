const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 60000 })


test('has valid http status', async ({ page }) => {
  const response = await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');

  // set timeout for single test
  test.setTimeout(120000);
  
  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
});


test('has no title', async ({ page }) => {
  const response = await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');

  // set timeout for single test
  test.setTimeout(120000);
  
  // Page title is empty
  await expect(page).not.toHaveTitle('');
});


test('has Welcome text', async ({ page }) => {
  const response = await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');

    // set timeout for single test
    test.setTimeout(120000);
  
  // Page has 'Welcome' subtitle
  await expect(page.getByText('Welcome')).toBeVisible();
});


test('download link popup', async ({ page }) => {
  await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');

  // set timeout for single test
  test.setTimeout(120000);
  
  // Test for 'Download' link Popup 
  const page4Promise = page.waitForEvent('popup'); 
 
  // click the 'Download' link
  await page.getByRole('link', { name: 'http://evs.nci.nih.gov/ftp1/NCI_Thesaurus' }).click();
  const popup = await page4Promise;

  //wait for popup to appear
  await popup.waitForLoadState();

  // test popup title
  const title_ = await popup.title();
  await expect(title_).toBe('Index of /ftp1/NCI_Thesaurus');

  // Expects the URL to contain FTP
  await expect(popup).toHaveURL(/.*ftp1\/NCI_Thesaurus/);
});
