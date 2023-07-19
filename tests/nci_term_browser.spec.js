import { test, expect } from '@playwright/test';

test.use({ actionTimeout: 30000 })


test('has valid http status', async ({ page }) => {
  const response = await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser');
  
  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
});


test('has no title', async ({ page }) => {
  await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser');
  
  // Page title is empty
  await expect(page).not.toHaveTitle('');
});



test('has valid http status with url parameter', async ({ page }) => {
  const response = await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');
  
  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
});


test('has All but NCIm button', async ({ page }) => {
  await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');

  //test button exists
  await expect(page.locator('img[alt="selectAllButNCIm"]').first()).toHaveText('');
  
  // test checkboxes are unchecked 
  expect(await page.getByRole('checkbox', { name: 'Common Terminology Criteria for Adverse Events (version: 4.03)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'ICD-10 (version: 2016)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'International Classification of Diseases, Ninth Revision, Clinical Modification (version: 2014)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'Nanoparticle Ontology (version: 2011-12-08)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'Physician Data Query (version: 2016_07_31)' }).isChecked()).toBeFalsy;

  //click 'Select All but NCIm' button
  await page.locator('img[alt="selectAllButNCIm"]').first().click();

  // test checkboxes are now checked
  expect(await page.getByRole('checkbox', { name: 'Common Terminology Criteria for Adverse Events (version: 4.03)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'ICD-10 (version: 2016)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'International Classification of Diseases, Ninth Revision, Clinical Modification (version: 2014)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'Nanoparticle Ontology (version: 2011-12-08)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'Physician Data Query (version: 2016_07_31)' }).isChecked()).toBeTruthy;

});


test('has functional clear button', async ({ page }) => {
  const response = await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');

  //test link label
  await expect(page.locator('[id="searchTerm\\:clear"]')).toHaveText('');

  // click the 'All but NCIm' link
  //await page.getByRole('img', { name: 'selectAllButNCIm', exact: true }).click();
  //click 'Select All but NCIm' button
  await page.locator('img[alt="selectAllButNCIm"]').first().click();

  // test checkboxes are now checked
  expect(await page.getByRole('checkbox', { name: 'Common Terminology Criteria for Adverse Events (version: 4.03)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'ICD-10 (version: 2016)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'International Classification of Diseases, Ninth Revision, Clinical Modification (version: 2014)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'Nanoparticle Ontology (version: 2011-12-08)' }).isChecked()).toBeTruthy;
  expect(await page.getByRole('checkbox', { name: 'Physician Data Query (version: 2016_07_31)' }).isChecked()).toBeTruthy;

  // now click the 'Clear' link
  await page.locator('[id="searchTerm\\:clear"]').click();

  // test checkboxes are unchecked 
  expect(await page.getByRole('checkbox', { name: 'Common Terminology Criteria for Adverse Events (version: 4.03)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'ICD-10 (version: 2016)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'International Classification of Diseases, Ninth Revision, Clinical Modification (version: 2014)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'Nanoparticle Ontology (version: 2011-12-08)' }).isChecked()).toBeFalsy;
  expect(await page.getByRole('checkbox', { name: 'Physician Data Query (version: 2016_07_31)' }).isChecked()).toBeFalsy;

});

test('has sources link', async ({ page }) => {
  await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');

  //click on Sources link
  const page4Promise = page.waitForEvent('popup');

  // click on 'Sources' link
  await page.locator('text=Sources').first().click();
  const popup = await page4Promise;

  //wait for popup to appear
  await popup.waitForLoadState();

  // Expects the URL to show Sources page
  await expect(popup).toHaveURL(/.*nciterms-stage.nci.nih.gov\/ncitbrowser\/pages\/source_help_info-termbrowser.jsf/);

});


/* 
test('test', async ({ page }) => {
  await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');
  await page.getByRole('checkbox', { name: 'NCI Thesaurus (version: 23.03d)' }).uncheck();
  await page.getByRole('checkbox', { name: 'NCI Thesaurus (version: 23.03d)' }).check();
  await page.getByRole('checkbox', { name: 'NCI Metathesaurus (version: 202302)' }).check();
  await page.getByRole('checkbox', { name: 'The Data Use Ontology (version: 2021-02-23)' }).check();
});


  await expect(page.getByRole('link', { name: 'Signaling Pathway', exact: true })).toHaveText('Signaling Pathway')

await page.getByRole('img', { name: 'selectAllButNCIm' }).first().click();

await page.getByRole('link', { name: 'NCI Thesaurus: National Cancer Institute Thesaurus (23.03d)' }).click();

await page.getByRole('link', { name: 'GO: Gene Ontology (Apr2023)' }).click();

//https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/vocabulary.jsf?dictionary=GO&version=Apr2023
await page.goto('https://nciterms.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');
await page.getByRole('link', { name: 'Terminologies' }).click();
await page.getByRole('link', { name: 'Value Sets' }).click();
await page.getByRole('link', { name: 'Mappings' }).click();
await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/ajax?action=create_src_vs_tree&nav_type=valuesets&mode=0');
await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');

// sp
const page1Promise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'Sources', exact: true }).click();
const page1 = await page1Promise;
});

await page.getByRole('checkbox', { name: 'Common Terminology Criteria for Adverse Events (version: 4.03)' }).check();
await page.getByRole('checkbox', { name: 'ICD-10 (version: 2016)' }).check();
await page.getByRole('checkbox', { name: 'International Classification of Diseases, Ninth Revision, Clinical Modification (version: 2014)' }).check();
await page.getByRole('checkbox', { name: 'Nanoparticle Ontology (version: 2011-12-08)' }).check();
await page.getByRole('checkbox', { name: 'Physician Data Query (version: 2016_07_31)' }).check(); 

test('test', async ({ page }) => {
  await page.goto('https://nciterms-stage.nci.nih.gov/ncitbrowser/pages/multiple_search.jsf?nav_type=terminologies');
  await page.locator('[id="searchTerm\\:clear"]').click();
  await page.locator('[id="searchTerm\\:multi_search"]').click();
  await page.getByText('Please select at least one terminology.').click();
  await page.getByRole('img', { name: 'selectAll' }).nth(1).click();
  await page.getByRole('img', { name: 'selectAll' }).nth(1).click();
  await page.locator('[id="searchTerm\\:multi_search"]').click();
  await page.getByText('Please enter a search string.').click();
});

*/