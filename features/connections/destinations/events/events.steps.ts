import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import { ICustomWorld } from "../../../shared/world";
import { sendTrackEventForAccount } from "../../../shared/utils";

Given("the user is on the events tab", async function (this: ICustomWorld) {
    // Factory provides clean access to events page
    await this.eventsPage.navigateToEventsTab();
});

Given("the user has captured the initial event count", async function (this: ICustomWorld) {
    this.initialEventCount = await this.eventsPage.getDeliveredEventsCount();
});

When("the user views the events monitoring dashboard", function (this: ICustomWorld) {
    // This step is intentionally empty as the user is already viewing the events tab
});

When("the user clicks the refresh button", async function (this: ICustomWorld) {
    await this.eventsPage.refreshMetrics();
});

When(
    "the user sends a {string} event to the source via API",
    async function (this: ICustomWorld, eventName: string) {
        // Simple, direct approach - no need to capture from UI
        await sendTrackEventForAccount("dummy company", eventName);
    }
);

Then("the user should see the delivered events count", async function (this: ICustomWorld) {
    const deliveredCount = await this.eventsPage.getMetricValue("Delivered");
    expect(typeof deliveredCount).toBe("number");
    expect(deliveredCount).toBeGreaterThanOrEqual(0);
});

Then("the user should see the failed events count", async function (this: ICustomWorld) {
    const failedCount = await this.eventsPage.getMetricValue("Failed");
    expect(typeof failedCount).toBe("number");
    expect(failedCount).toBeGreaterThanOrEqual(0);
});

Then("the user should see the failure rate percentage", async function (this: ICustomWorld) {
    const failureRate = await this.eventsPage.getMetricValue("Failure rate");
    expect(failureRate).toBeGreaterThanOrEqual(0);
});

Then(
    "the {string} event count should increase by {int}",
    async function (this: ICustomWorld, countType: string, increase: number) {
        if (countType === "Delivered") {
            await this.eventsPage.waitForEventCount(this.initialEventCount! + increase);
            const newEventCount = await this.eventsPage.getDeliveredEventsCount();
            expect(newEventCount).toBe(this.initialEventCount! + increase);
        } else {
            throw new Error(`Unsupported count type: ${countType}`);
        }
    }
);
