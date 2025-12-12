import { test, expect } from '@playwright/test'; 

test('arxiv_snarkiv', async ({ page }) => {
  await page.goto('http://localhost:5173/final-project-cameron-gordon/');
  await page.getByRole('navigation').getByRole('link', { name: 'Arxiv vs. Snarxiv' }).click();
  await page.getByRole('textbox', { name: 'Player Name' }).click();
  await page.getByRole('textbox', { name: 'Player Name' }).fill('Cameron');
  await page.getByRole('button', { name: 'Save Settings' }).click();
  await page.getByRole('button', { name: 'Start Game' }).click();
  await page.getByRole('button', { name: 'Create Room' }).click();
  await page.getByRole('button', { name: 'SnarXiv Troll Paper' }).click();
  await expect(
    page.locator('text=/✔ Correct|✘ Wrong/')
  ).toBeVisible();
});