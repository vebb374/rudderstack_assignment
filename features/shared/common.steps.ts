import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { ICustomWorld } from './world';
import { LoginPage } from '../login/login.page';
import { DashboardPage } from '../dashboard/dashboard.page';

Given('the user is on the RudderStack login page', async function (this: ICustomWorld) {
  this.loginPage = new LoginPage(this.page!);
  await this.loginPage.navigate(this.parameters.baseUrl);
});

When('the user logs in with valid credentials', async function (this: ICustomWorld) {
  await this.loginPage!.login(process.env.USERNAME!, process.env.PASSWORD!);
  await this.loginPage!.handle2FA();
});

When('the user is on the connections page', async function (this: ICustomWorld) {
  this.dashboardPage = new DashboardPage(this.page!);
  await expect(this.page!).toHaveURL(/.*connections/);
});

Then('the user should be on the connections page', async function (this: ICustomWorld) {
  this.dashboardPage = new DashboardPage(this.page!);
  await expect(this.page!).toHaveURL(/.*connections/);
});
