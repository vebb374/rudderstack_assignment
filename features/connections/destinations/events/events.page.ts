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
}
