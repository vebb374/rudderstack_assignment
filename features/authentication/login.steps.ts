import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ICustomWorld } from "@features/shared/world";
import { getAccountCredentials, type AccountKey } from "@test-data/account-data";
import { getEnvironmentConfig } from "@features/shared/env";

Given("the user is on the RudderStack login page", async function (this: ICustomWorld) {
    // Clean syntax - factory handles initialization automatically
    const config = getEnvironmentConfig();
    await this.page.goto(config.baseUrl, { waitUntil: "domcontentloaded" });
});

When("the user logs in with valid credentials", async function (this: ICustomWorld) {
    // Same instance reused automatically via factory caching
    const { email, password } = getAccountCredentials("dummy company");
    await this.loginPage.login(email, password);
    await this.loginPage.handle2FA();
});

Then("the user should be successfully authenticated", async function (this: ICustomWorld) {
    // Same instance reused automatically
    const isLoggedIn = await this.loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
});

// Common steps

Given(
    "the user from company {string} is authenticated",
    async function (this: ICustomWorld, organization: string) {
        const config = getEnvironmentConfig();
        await this.page.goto(config.baseUrl, { waitUntil: "domcontentloaded" });
        const { email, password } = getAccountCredentials(organization as AccountKey);
        await this.loginPage.login(email, password);
        await this.loginPage.handle2FA();
    }
);
