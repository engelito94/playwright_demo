import { Locator, Page } from "@playwright/test";

export class HomePage {
    page : Page;
    menu: Locator;
    title: Locator;
    item: Locator;
    addToCart: Locator;

    constructor(page:Page) {
        this.page = page;
        this.menu = page.getByRole('button', { name: 'Open Menu' });
        this.title = page.getByText('Swag Labs');
        this.item = page.locator(':text-is("Sauce Labs Backpack")');
        this.addToCart = page.getByRole('button', { name: 'Add to cart' });
    }

    async clickOnMenu() {
        await this.menu.click();
    }

    async clickOnItem() {
        await this.item.click();
    }

    async clickOnAddToCart() {
        await this.addToCart.click();
    }

}