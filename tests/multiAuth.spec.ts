import { test, expect } from "@playwright/test";

test.describe('Home page user', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test.skip('Verify successful user login', async ({ page }) => {
    await page.goto('https://demoqa.com/login');
    await expect(page.getByText('pista')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  });
});

test.describe('Home page admin', () => {
  test.use({ storageState: 'playwright/.auth/admin.json' });

  test.skip('Verify successful admin login', async ({ page }) => {
    await page.goto('https://demoqa.com/login');
    await expect(page.getByText('pista_admin')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
  });
});