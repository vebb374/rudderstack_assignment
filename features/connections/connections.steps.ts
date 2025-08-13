import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ICustomWorld } from "../shared/world";

Given("the user is on the connections page", async function (this: ICustomWorld) {
    await this.connectionsPage.waitForPageLoad();
});

When("the user views the connections overview", async function (this: ICustomWorld) {
    const title = await this.connectionsPage.pageTitle.textContent();
    expect(title).toContain("Connections");
});

Then("the user should see the Data Plane URL", async function (this: ICustomWorld) {
    const url = await this.connectionsPage.getDataPlaneUrl();
    expect(url).toContain("dataplane.rudderstack.com");
});

Then(
    "the user should see the source  {string}",
    async function (this: ICustomWorld, sourceName: string) {
        const isSourceVisible = await this.connectionsPage.isSourceVisible(sourceName);
        expect(isSourceVisible).toBe(true);
    }
);

Then(
    "the user should see the destination {string}",
    async function (this: ICustomWorld, destinationName: string) {
        const isDestinationVisible =
            await this.connectionsPage.isDestinationVisible(destinationName);
        expect(isDestinationVisible).toBe(true);
    }
);

When(
    "the user clicks on the destination {string}",
    async function (this: ICustomWorld, destinationName: string) {
        await this.connectionsPage.clickDestination(destinationName);
    }
);
