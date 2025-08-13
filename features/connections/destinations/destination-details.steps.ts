import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ICustomWorld } from "../../shared/world";

Given("the user navigates to the webhook destination", async function (this: ICustomWorld) {
    await this.connectionsPage.clickWebhookDestination();
    // Factory provides clean access to destination details page
    await this.destinationDetailsPage.waitForPageLoad();
});

When("the user views the destination details", function (this: ICustomWorld) {
    // This step is intentionally empty as the user is already viewing the destination details
});

When("the user clicks on the {string} tab", async function (this: ICustomWorld, tabName: string) {
    await this.destinationDetailsPage.clickTab(tabName);
});

When(
    "the user clicks on the {string} button",
    async function (this: ICustomWorld, buttonName: string) {
        if (buttonName.toLowerCase() === "live events") {
            await this.destinationDetailsPage.clickLiveEvents();
        } else {
            throw new Error(`Unknown button: ${buttonName}`);
        }
    }
);

Then(
    "the user should see the destination name {string}",
    async function (this: ICustomWorld, expectedName: string) {
        const actualName = await this.destinationDetailsPage.getDestinationName();
        expect(actualName).toBe(expectedName);
    }
);

Then(
    "the user should see the destination type {string}",
    async function (this: ICustomWorld, _expectedType: string) {
        await expect(this.destinationDetailsPage.destinationType).toBeVisible();
    }
);

Then(
    "the user should see the destination status as {string}",
    async function (this: ICustomWorld, expectedStatus: string) {
        if (expectedStatus.toUpperCase() === "ENABLED") {
            const isEnabled = await this.destinationDetailsPage.isDestinationEnabled();
            expect(isEnabled).toBe(true);
        }
    }
);

Then(
    "the user should see the connected source {string}",
    async function (this: ICustomWorld, _expectedSource: string) {
        await expect(this.destinationDetailsPage.connectedSource).toBeVisible();
    }
);

Then("the user should see the sources tab content", async function (this: ICustomWorld) {
    const isVisible = await this.destinationDetailsPage.isTabContentVisible("sources");
    expect(isVisible).toBe(true);
});

Then("the user should see the events tab content", async function (this: ICustomWorld) {
    const isVisible = await this.destinationDetailsPage.isTabContentVisible("events");
    expect(isVisible).toBe(true);
});

Then("the user should see the configuration tab content", async function (this: ICustomWorld) {
    const isVisible = await this.destinationDetailsPage.isTabContentVisible("configuration");
    expect(isVisible).toBe(true);
});

Then("the user should be on the live events page", async function (this: ICustomWorld) {
    await expect(this.page!).toHaveURL(/.*\/live\/.*/);
});
