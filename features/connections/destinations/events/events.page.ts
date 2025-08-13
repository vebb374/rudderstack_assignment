import { Page, Locator } from 'playwright';

export class EventsPage {
  readonly page: Page;
  readonly eventsTab: Locator;
  readonly deliveredEventsCount: Locator;
  readonly failedEventsCount: Locator;
  readonly failureRatePercentage: Locator;
  readonly eventsTrendChart: Locator;
  readonly refreshButton: Locator;
  readonly metricsLatencyAlert: Locator;
  readonly eventDetailsTable: Locator;
  readonly noDataMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.eventsTab = page.getByRole('tab', { name: 'Events' });
    this.deliveredEventsCount = page.locator('text=Delivered').locator('..').getByRole('heading', { level: 2 });
    this.failedEventsCount = page.locator('text=Failed').locator('..').getByRole('heading', { level: 2 });
    this.failureRatePercentage = page.locator('text=Failure rate').locator('..').getByRole('heading', { level: 2 });
    this.eventsTrendChart = page.locator('text=Events Trend').locator('..');
    this.refreshButton = page.getByRole('button', { name: 'Refresh' });
    this.metricsLatencyAlert = page.getByText('Metrics may not be real time due to reporting latency');
    this.eventDetailsTable = page.getByRole('table');
    this.noDataMessage = page.getByText('No data');
  }

  async navigateToEventsTab(): Promise<void> {
    await this.eventsTab.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getDeliveredEventsCount(): Promise<number> {
    const countText = await this.deliveredEventsCount.textContent();
    return parseInt(countText?.trim() || '0', 10);
  }

  async getFailedEventsCount(): Promise<number> {
    const countText = await this.failedEventsCount.textContent();
    return parseInt(countText?.trim() || '0', 10);
  }

  async getFailureRate(): Promise<string> {
    const rateText = await this.failureRatePercentage.textContent();
    return rateText?.trim() || '0%';
  }

  async refreshMetrics(): Promise<void> {
    await this.refreshButton.click();
    // Wait a moment for the refresh to complete
    await this.page.waitForTimeout(1000);
  }

  async waitForEventCount(expectedCount: number, timeout = 90000): Promise<void> {
    await this.page.waitForFunction(
      (expected) => {
        const element = document.querySelector('text=Delivered')?.parentElement?.querySelector('h2');
        const count = element ? parseInt(element.textContent!, 10) : 0;
        return count >= expected;
      },
      expectedCount,
      { timeout }
    );
  }

  async isEventsTrendChartVisible(): Promise<boolean> {
    return await this.eventsTrendChart.isVisible();
  }

  async isMetricsLatencyAlertVisible(): Promise<boolean> {
    return await this.metricsLatencyAlert.isVisible();
  }

  async hasEventData(): Promise<boolean> {
    const noDataVisible = await this.noDataMessage.isVisible();
    return !noDataVisible;
  }
}
