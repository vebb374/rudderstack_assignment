import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { ICustomWorld } from '../shared/world';
import { ConnectionsPage } from './connections.page';
import { LoginPage } from '../authentication/login.page';
import { getAccountCredentials } from '../../test-data/account-data';
import { getEnvironmentConfig } from '../shared/env';

Given('the user is on the connections page', async function (this: ICustomWorld) {
  // Check if we're already on connections page
  if (!this.page!.url().includes('app.rudderstack.com') || this.page!.url().includes('/login')) {
    // Need to login first
    if (!this.loginPage) {
      this.loginPage = new LoginPage(this.page!);
      const config = getEnvironmentConfig();
      await this.loginPage.navigate(config.baseUrl);
      const { email, password } = getAccountCredentials('discrip_production');
      await this.loginPage.login(email, password);
      await this.loginPage.handle2FA();
    }
  }
  
  this.connectionsPage = new ConnectionsPage(this.page!);
  await this.connectionsPage.waitForPageLoad();
});

When('the user views the connections overview', function (this: ICustomWorld) {
  // This step is intentionally empty as the user is already viewing the connections page
});

When('the user clicks on the HTTP source', async function (this: ICustomWorld) {
  await this.connectionsPage!.clickHttpSource();
});

When('the user clicks on the webhook destination', async function (this: ICustomWorld) {
  await this.connectionsPage!.clickWebhookDestination();
});

Then('the user should see the Data Plane URL', async function (this: ICustomWorld) {
  const url = await this.connectionsPage!.getDataPlaneUrl();
  expect(url).toContain('dataplane.rudderstack.com');
});

Then('the user should see the HTTP Source with Write Key', async function (this: ICustomWorld) {
  const key = await this.connectionsPage!.getSourceWriteKey();
  expect(key).toMatch(/^31[A-Za-z0-9]+/);
});

Then('the user should see the connected destinations', async function (this: ICustomWorld) {
  const isDestinationVisible = await this.connectionsPage!.isDestinationVisible();
  expect(isDestinationVisible).toBe(true);
});

Then('the user should be on the source details page', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/.*\/sources\/.*/);
});

Then('the user should be on the destination details page', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/.*\/destinations\/.*/);
});
