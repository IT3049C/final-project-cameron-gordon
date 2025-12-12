import { test, expect } from '@playwright/test';

test('hub unit testing', async ({ page }) => {
  await page.goto('http://localhost:5173/final-project-cameron-gordon/');

    const gameSection = page.locator("section"); // or main

    const gameList = [
    "Rock Paper Scissors",
    "Tic Tac Toe",
    "Wordle",
    "Arxiv vs. Snarxiv"
    ];

    for (const title of gameList) {
    await expect(gameSection.getByRole("link", { name: title })).toBeVisible();
    }

  await page.getByRole('link', { name: 'Lobby' }).click();
  await page.getByRole('textbox', { name: 'Player Name' }).click();
  await page.getByRole('textbox', { name: 'Player Name' }).fill('Cameron');
  await page.getByRole('button', { name: 'Save Settings' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Rock Paper Scissors' }).click();
await expect(page.getByTestId("greeting")).toContainText("Cameron");


  await page.getByRole('link', { name: 'Tic Tac Toe' }).click();
  await expect(page.getByTestId("greeting")).toContainText("Cameron");

  await page.getByRole('link', { name: 'Wordle' }).click();
await expect(page.getByTestId("greeting")).toContainText("Cameron");


  await page.getByRole('link', { name: 'Arxiv vs. Snarxiv' }).click();
await expect(page.getByTestId("greeting")).toContainText("Cameron");

  await page.getByRole('link', { name: 'Home' }).click();
});