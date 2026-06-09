import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/login');
});

test.describe('Authentication', () => {
    test.use({ storageState: { cookies: [], origins: []}})
    test.skip('Successful login', async ({ page }) => {
        await page.getByText('pista').isVisible();
        await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();
    });
});