import { Page } from 'playwright';

export class DashboardPage {
  private readonly page: Page;
  private readonly dataPlaneUrl = 'div[data-testid="data-plane-url"] >> div';
  private readonly sourceWriteKey = 'div:has-text("Write key") >> div';
  private readonly destinationLink = 'a[href*="/destinations/"]';

  constructor(page: Page) {
    this.page = page;
  }

  async getDataPlaneUrl(): Promise<string> {
    const url = await this.page.textContent(this.dataPlaneUrl);
    return url!.trim();
  }

  async getSourceWriteKey(): Promise<string> {
    const key = await this.page.textContent(this.sourceWriteKey);
    return key!.trim();
  }
  
  async goToDestinationPage(): Promise<void> {
    await this.page.click(this.destinationLink);
  }
}
