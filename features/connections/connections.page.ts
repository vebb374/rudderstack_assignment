import { Page, Locator } from 'playwright';

export class ConnectionsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly dataPlaneUrlElement: Locator;
  readonly sourceWriteKeyElement: Locator;
  readonly httpSourceLink: Locator;
  readonly webhookDestinationLink: Locator;
  readonly sourcesSection: Locator;
  readonly destinationsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: 'Connections' });
    this.dataPlaneUrlElement = page.locator('text=https://').first();
    this.sourceWriteKeyElement = page.locator('text=Write key').locator('..').locator('text=/^31[A-Za-z0-9]+/');
    this.httpSourceLink = page.getByRole('link').filter({ hasText: 'assignment Source 1' });
    this.webhookDestinationLink = page.getByRole('link').filter({ hasText: 'request catcher 1' });
    this.sourcesSection = page.locator('text=Sources (1)').locator('..');
    this.destinationsSection = page.locator('text=Destinations (1)').locator('..');
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  async getDataPlaneUrl(): Promise<string> {
    const url = await this.dataPlaneUrlElement.textContent();
    if (!url) {
      throw new Error('Data plane URL not found');
    }
    return url.trim();
  }

  async getSourceWriteKey(): Promise<string> {
    const key = await this.sourceWriteKeyElement.textContent();
    if (!key) {
      throw new Error('Source write key not found');
    }
    return key.trim();
  }

  async clickHttpSource(): Promise<void> {
    await this.httpSourceLink.click();
  }

  async clickWebhookDestination(): Promise<void> {
    await this.webhookDestinationLink.click();
  }

  async isSourceVisible(): Promise<boolean> {
    return await this.httpSourceLink.isVisible();
  }

  async isDestinationVisible(): Promise<boolean> {
    return await this.webhookDestinationLink.isVisible();
  }
}
