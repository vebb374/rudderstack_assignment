import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { ICustomWorld } from '../shared/world';
import { LoginPage } from './login.page';
import { getAccountCredentials } from '../../test-data/account-data';
import { getEnvironmentConfig } from '../shared/env';

Given('the user is on the RudderStack login page', async function (this: ICustomWorld) {
  this.loginPage = new LoginPage(this.page!);
  const config = getEnvironmentConfig();
  await this.loginPage.navigate(config.baseUrl);
});

When('the user logs in with valid credentials', async function (this: ICustomWorld) {
  const { email, password } = getAccountCredentials('discrip_production');
  await this.loginPage!.login(email, password);
  await this.loginPage!.handle2FA();
});

Then('the user should be successfully authenticated', async function (this: ICustomWorld) {
  const isLoggedIn = await this.loginPage!.isLoggedIn();
  expect(isLoggedIn).toBe(true);
});

Then('the user should be on the connections page', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/.*app\.rudderstack\.com/);
  await expect(this.page!.getByText('Connections')).toBeVisible();
});
