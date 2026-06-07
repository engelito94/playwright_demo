import { Locator, Page } from "@playwright/test";

export class LoginPage {
    page : Page;
    userNameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page:Page) {
        this.page = page;
        this.userNameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button')
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUserName() {
        await this.userNameInput.fill("standard_user");
    }

    async enterValidUserName(meno: string) {
        await this.userNameInput.fill(meno);
    }

    async enterPassword() {
        await this.passwordInput.fill("secret_sauce");
    }
    
    async clickLoginButton() {
        await this.loginButton.click();
    }

    async prihlasRiaditela(ucet: string, heslo: string) {
        await this.page.getByRole('link', { name: 'Pre školy' }).click();
        await this.page.getByRole('textbox', { name: 'Prihlasovacie meno *' }).fill(ucet);
        await this.page.getByRole('textbox', { name: 'Heslo *' }).fill(heslo);
        await this.page.getByRole('button', { name: 'Prihlásiť sa' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('textbox', { name: 'Vybrať školu *' }).click();
        await this.page
            .locator('.autocomplete-item[data-value="910021626"]')
            .filter({ hasText: 'Materská škola pre AT' })
            .click();
        await this.page.getByRole('button', { name: 'Pokračovať' }).click();
        await this.page.waitForLoadState('networkidle');
    }
}