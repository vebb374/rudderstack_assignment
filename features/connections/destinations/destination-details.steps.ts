import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ICustomWorld } from "@features/shared/world";
import { TabName } from "./destination-details.page";

Given("the user is on the destination details page", async function (this: ICustomWorld) {
    // User should already be on destination details page from Background steps
    // Just wait for the page to load and verify we're there
    await this.destinationDetailsPage.waitForPageLoad();
});

Then(
    "the user should see the destination name {string}",
    async function (this: ICustomWorld, expectedName: string) {
        const actualName = await this.destinationDetailsPage.getDestinationName();
        expect(actualName).toBe(expectedName);
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
    "the user is able to see different tabs in destination details page",
    async function (this: ICustomWorld) {
        const sourcesTab = this.destinationDetailsPage.tabLabel("Sources");
        await expect(sourcesTab).toBeVisible();
        const eventsTab = this.destinationDetailsPage.tabLabel("Events");
        await expect(eventsTab).toBeVisible();
        const configurationTab = this.destinationDetailsPage.tabLabel("Configuration");
        await expect(configurationTab).toBeVisible();
        const settingsTab = this.destinationDetailsPage.tabLabel("Settings");
        await expect(settingsTab).toBeVisible();
    }
);

// common steps

When(
    "the user clicks on the {string} tab in destination details page",
    async function (this: ICustomWorld, tabName: string) {
        await this.destinationDetailsPage.clickTab(tabName as TabName);
    }
);
