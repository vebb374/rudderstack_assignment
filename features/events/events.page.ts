import { Page } from 'playwright';

export class DestinationPage {
  private readonly page: Page;
  private readonly eventsTab = 'button:has-text("Events")';
  private readonly deliveredEventsCount = 'h2:near(:text("Delivered"))';

  constructor(page: Page) {
    this.page = page;
  }

  async goToEventsTab(): Promise<void> {
    await this.page.click(this.eventsTab);
  }

  async getDeliveredEventsCount(): Promise<number> {
    const deliveredCount = await this.page.textContent(this.deliveredEventsCount);
    return parseInt(deliveredCount!, 10);
  }

  async waitForEventCount(expectedCount: number): Promise<void> {
    await this.page.waitForFunction(
      (expected) => {
        const element = document.querySelector('h2:near(:text("Delivered"))');
        const count = element ? parseInt(element.textContent!, 10) : 0;
        return count === expected;
      },
      expectedCount,
      { timeout: 90000 }
    );
  }
}
