import { test, expect } from '@playwright/test';

test('PROD Test Erk2 Biochem Pathway in NCIt Hierarchy', async ({ page }) => {
  await page.goto('https://ncithesaurus-stage.nci.nih.gov/ncitbrowser/pages/hierarchy.jsf?dictionary=NCI_Thesaurus&version=23.02d');
  await page.locator('#IMG_N_4').click();
  await page.locator('#IMG_N_4_9').click();
  await expect(page.getByRole('link', { name: 'Signaling Pathway', exact: true })).toHaveText('Signaling Pathway')
  await expect(page.getByRole('link', { name: 'Erk1/Erk2 MAPK Signaling Pathway', exact: true })).toHaveText('Erk1/Erk2 MAPK Signaling Pathway')
}); 

// note that for CANCER domain, there is no STAGE -- as of 2023-07-19
/*
test('visit page', async ({ page }) => {
    // Change checklyhq.com to your site's URL,
    // or, even better, define a ENVIRONMENT_URL environment variable
    // to reuse it across your browser checks
    const response = await page.goto(process.env.ENVIRONMENT_URL || 'https://thesaurus.cancer.gov/ncitbrowser/pages/hierarchy.jsf?dictionary=NCI_Thesaurus&version=23.02d');

    // Test that the response did not fail
    expect(response.status()).toBeLessThan(400);

    // Take a screenshot
    //await page.screenshot({ path: 'screenshot.jpg' });
});
*/