import { test, expect } from '@playwright/test';

test('klikanice', async ({ page }) => {
  await page.goto('https://saucedemo.com/');
  console.log(await page.locator('[data-test="username"]').isVisible());
  console.log(await page.locator('[data-test="login-button"]').isEnabled());
  console.log(await page.locator('[data-test="login-button"]').isEditable());

  if (await page.locator('[data-test="username"]').isEditable() == true) {
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.getByRole('textbox', { name: 'Password' }).fill("secret_sauce");
  }
  await expect(page.locator('[data-test="login-button"]')).not.toHaveText("Login");
  await page.locator('[data-test="login-button"]').click

  
});