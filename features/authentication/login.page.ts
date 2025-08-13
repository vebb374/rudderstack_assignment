import { Page, Locator } from "playwright";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly illDoThisLaterButton: Locator;
    readonly goToDashboardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId("Email");
        this.passwordInput = page.getByTestId("Password");
        this.loginButton = page.getByRole("button", { name: "Log in", exact: true });
        this.illDoThisLaterButton = page.getByRole("link", { name: "I'll do this later" });
        this.goToDashboardButton = page.getByRole("button", { name: "Go to dashboard" });
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async handle2FA(): Promise<void> {
        try {
            // Wait for the 2FA element to appear, timeout after 5 seconds if not found
            await this.illDoThisLaterButton.waitFor({ state: "visible", timeout: 5000 });
            await this.illDoThisLaterButton.click();
            await this.goToDashboardButton.click();
        } catch {
            return;
        }
    }

    async isLoggedIn(): Promise<boolean> {
        await this.page.waitForURL((url) => !url.toString().includes("/login"), { timeout: 5000 });
        return true;
    }
}
