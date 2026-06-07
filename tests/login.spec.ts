import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage'

test('prihlasovanie', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.gotoLoginPage();
  await loginPage.enterValidUserName("standard_user");
  await loginPage.enterPassword();
  await loginPage.clickLoginButton();
  
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});