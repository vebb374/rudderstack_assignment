import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ICustomWorld } from "@features/shared/world";
import { getAccountCredentials } from "@test-data/account-data";
import { getEnvironmentConfig } from "@features/shared/env";

Given("the user is on the RudderStack login page", async function (this: ICustomWorld) {
    // Clean syntax - factory handles initialization automatically
    const config = getEnvironmentConfig();
    await this.page.goto(config.baseUrl);
});

When("the user logs in with valid credentials", async function (this: ICustomWorld) {
    // Same instance reused automatically via factory caching
    const { email, password } = getAccountCredentials("discrip_production");
    console.log("email", email);
    console.log("password", password);
    await this.loginPage.login(email, password);
    await this.loginPage.handle2FA();
});

Then("the user should be successfully authenticated", function (this: ICustomWorld) {
    // Same instance reused automatically
    const isLoggedIn = this.loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
});

Then("the user should be on the connections page", async function (this: ICustomWorld) {
    await expect(this.page).toHaveURL(/.*app\.rudderstack\.com/);
    await expect(this.page.getByText("Connections")).toBeVisible();
});
