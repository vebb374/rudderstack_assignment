import { When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { ICustomWorld } from '../shared/world';

When('the user views the dashboard', function (this: ICustomWorld) {
  // This step is intentionally empty as the user is already on the dashboard.
});

Then('the user should see the Data Plane URL', async function (this: ICustomWorld) {
  const url = await this.dashboardPage!.getDataPlaneUrl();
  expect(url).toContain('dataplane.rudderstack.com');
});

Then('the user should see the HTTP Source Write Key', async function (this: ICustomWorld) {
  const key = await this.dashboardPage!.getSourceWriteKey();
  expect(key).not.toBeNull();
});
