import { test, expect } from '@playwright/test';

test('rps testing', async ({ page }) => { 
     await page.goto('http://localhost:5173/final-project-cameron-gordon/');
  await page.getByRole('navigation').getByRole('link', { name: 'Rock Paper Scissors' }).click();
  await page.getByRole('textbox', { name: 'Player Name' }).click();
  await page.getByRole('textbox', { name: 'Player Name' }).fill('Cameron');
  await page.getByRole('button', { name: 'Save Settings' }).click();
  await page.getByRole('button', { name: 'Start Game' }).click();
  await page.getByRole('button', { name: 'Rock' }).click();

   const result = page.locator('.result');
        await expect(result).toBeVisible();
        await expect(result).toHaveText(/You win!|CPU wins!|Tie\./);

  await page.getByRole('button', { name: 'Reset Game' }).click();
});