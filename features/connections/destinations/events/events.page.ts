import { Page, Locator } from "playwright";
import { CommonUI } from "@features/common/common-ui.page";
type Metrics = "Delivered" | "Failed" | "Failure rate";
export class EventsPage {
    readonly page: Page;
    readonly commonUI: CommonUI;

    readonly metricValue: (metric: Metrics) => Locator;
    readonly eventsTrendChart: Locator;
    readonly refreshButton: Locator;
    readonly metricsLatencyAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commonUI = new CommonUI(page);
        this.metricValue = (metric: Metrics) =>
            page.locator(`text=${metric}`).locator("..").getByRole("heading", { level: 2 });
        this.eventsTrendChart = page.getByTestId("graph");
        this.refreshButton = page.getByRole("button", { name: "Refresh" });
        this.metricsLatencyAlert = page
            .getByRole("alert")
            .getByText("Metrics may not be real time due to reporting latency");
    }

    async waitForPageLoad(): Promise<void> {
        await this.metricsLatencyAlert.waitFor({ state: "visible" });
        await this.metricValue("Delivered").waitFor({ state: "visible" });
    }

    async getMetricValue(metric: Metrics): Promise<number> {
        const value = await this.metricValue(metric).textContent();
        if (!value) {
            throw new Error(`Metric value not found for ${metric}`);
        }

        let cleanedValue = value.trim();
        if (cleanedValue.includes("%")) {
            cleanedValue = cleanedValue.replace("%", "");
        }
        return parseInt(cleanedValue, 10);
    }

    async refreshMetrics(): Promise<void> {
        await this.refreshButton.click();
        await this.commonUI.waitForSkeletonToDisappear();
        await this.waitForPageLoad();
    }

    /**
     * Navigate to the Events tab (assumes we're on destination details page)
     */
    async navigateToEventsTab(): Promise<void> {
        const eventsTab = this.page.getByRole("tab", { name: "Events" });
        await eventsTab.click();
        await this.waitForPageLoad();
    }

    /**
     * Get the delivered events count specifically
     */
    async getDeliveredEventsCount(): Promise<number> {
        return await this.getMetricValue("Delivered");
    }

    /**
     * Wait for the delivered event count to reach a specific value
     * Refreshes metrics every 10 seconds to get latest data
     */
    async waitForEventCount(expectedCount: number, timeout = 90000): Promise<void> {
        const startTime = Date.now();
        const refreshInterval = 10000; // 10 seconds

        while (Date.now() - startTime < timeout) {
            console.log(`🔄 Refreshing metrics to check for event count >= ${expectedCount}`);

            // Refresh the metrics to get latest data
            await this.refreshMetrics();

            // Check current count
            const currentCount = await this.getDeliveredEventsCount();
            console.log(`📊 Current delivered count: ${currentCount}, Expected: ${expectedCount}`);

            if (currentCount >= expectedCount) {
                console.log(
                    `✅ Event count reached! Current: ${currentCount}, Expected: ${expectedCount}`
                );
                return;
            }

            // Wait 10 seconds before next refresh
            console.log(`⏳ Waiting 10 seconds before next refresh...`);
            await this.page.waitForTimeout(refreshInterval);
        }

        // Final check and throw error if timeout reached
        const finalCount = await this.getDeliveredEventsCount();
        throw new Error(
            `Timeout waiting for event count. Expected: ${expectedCount}, Final count: ${finalCount}, Timeout: ${timeout}ms`
        );
    }

    /**
     * Check if the events trend chart is visible
     */
    async isEventsTrendChartVisible(): Promise<boolean> {
        try {
            await this.eventsTrendChart.waitFor({ state: "visible", timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if there's any event data displayed
     */
    async hasEventData(): Promise<boolean> {
        const deliveredCount = await this.getDeliveredEventsCount();
        return deliveredCount > 0;
    }
}
