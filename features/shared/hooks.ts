import { Before, After, BeforeAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { ICustomWorld } from './world';
import { setupEnvironment } from './env';

BeforeAll(() => {
  setupEnvironment();
});

Before(async function (this: ICustomWorld) {
  this.browser = await chromium.launch({ 
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
  });
  
  const context = await this.browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: process.env.RECORD_VIDEO === 'true' ? { dir: 'test-results/videos' } : undefined
  });
  
  this.page = await context.newPage();
});

After(async function (this: ICustomWorld) {
  if (this.page) {
    await this.page.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});