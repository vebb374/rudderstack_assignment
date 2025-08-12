import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { ICustomWorld } from '../shared/world';
import { DestinationPage } from './events.page';
import { sendTrackEvent } from '../shared/utils';

Given('the user has the Data Plane URL and the HTTP Source Write Key', async function (this: ICustomWorld) {
  this.dataPlaneUrl = await this.dashboardPage!.getDataPlaneUrl();
  this.writeKey = await this.dashboardPage!.getSourceWriteKey();
});

Given('the user navigates to the destination and records the initial event count', async function (this: ICustomWorld) {
  this.destinationPage = new DestinationPage(this.page!);
  await this.dashboardPage!.goToDestinationPage();
  await this.destinationPage.goToEventsTab();
  this.initialEventCount = await this.destinationPage.getDeliveredEventsCount();
});

When('the user sends a {string} event to the source via API', async function (this: ICustomWorld, eventName: string) {
  await sendTrackEvent(this.dataPlaneUrl!, this.writeKey!, eventName);
});

Then('the {string} event count should increase by {int}', async function (this: ICustomWorld, countType: string, increase: number) {
  if (countType === 'Delivered') {
    await this.destinationPage!.waitForEventCount(this.initialEventCount! + increase);
    const newEventCount = await this.destinationPage!.getDeliveredEventsCount();
    expect(newEventCount).toBe(this.initialEventCount! + increase);
  }
});
