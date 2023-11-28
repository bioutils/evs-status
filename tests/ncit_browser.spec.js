const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 60000 })


test('has valid http status', async ({ page }) => {
  const response = await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');
  
  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
});


test('has no title', async ({ page }) => {
  const response = await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');
  
  // Page title is empty
  await expect(page).not.toHaveTitle('');
});


test('has Welcome text', async ({ page }) => {
  const response = await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');
  
  // Page has 'Welcome' subtitle
  await expect(page.getByText('Welcome')).toBeVisible();
});


test('download link popup', async ({ page }) => {
  await page.goto('https://ncit.nci.nih.gov/ncitbrowser/');

  // Test for 'Download' link Popup 
  const page4Promise = page.waitForEvent('popup'); 
 
  // click the 'Download' link
  await page.getByRole('link', { name: 'https://evs.nci.nih.gov/ftp1/NCI_Thesaurus' }).click();
  const popup = await page4Promise;

  //wait for popup to appear
  await popup.waitForLoadState();

  // test popup title
  const title_ = await popup.title();
  await expect(title_).toBe('Index of /ftp1/NCI_Thesaurus');

  // Expects the URL to contain FTP
  await expect(popup).toHaveURL(/.*ftp1\/NCI_Thesaurus/);
});
