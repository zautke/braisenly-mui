import { test, expect } from '@playwright/test';

test('demo app loads and shows title', async ({ page }) => {
  page.on('console', msg => console.log(`BROWSER [${msg.type()}]: ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

  await page.goto('/');
  
  // Wait for the body to be present
  await page.waitForSelector('body');
  
  // Log page content for debugging if title not found
  const content = await page.content();
  if (!content.includes('MUI 7 Migration Demo')) {
    console.log('Page content:', content);
  }

  // Check the title in the AppBar - using a more relaxed matcher
  await expect(page.getByText('MUI 7 Migration Demo', { exact: false })).toBeVisible({ timeout: 10000 });

  // Check if the theme selector is present
  const themeSelector = page.getByLabel('Theme');
  await expect(themeSelector).toBeVisible();
});

test('can switch themes', async ({ page }) => {
  await page.goto('/');

  const themeSelector = page.getByRole('combobox', { name: 'Theme' });
  await themeSelector.click();
  
  // Select 'Glass (Dark)'
  await page.getByRole('option', { name: 'Glass (Dark)' }).click();
  
  // Verify selection changed
  await expect(themeSelector).toHaveText('Glass (Dark)');
});