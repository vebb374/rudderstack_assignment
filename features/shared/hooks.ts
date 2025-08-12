import { Before, After, BeforeAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { ICustomWorld } from './world';
import { setupEnvironment } from './env';

BeforeAll(() => {
  setupEnvironment();
});

Before(async function (this: ICustomWorld) {
  this.browser = await chromium.launch({ headless: true });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: ICustomWorld) {
  await this.browser?.close();
});
