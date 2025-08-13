import { Page, Locator } from "playwright";

export class DestinationDetailsPage {
    readonly page: Page;
    readonly destinationName: Locator;
    readonly destinationType: Locator;
    readonly destinationStatus: Locator;
    readonly connectedSource: Locator;
    readonly sourcesTab: Locator;
    readonly eventsTab: Locator;
    readonly configurationTab: Locator;
    readonly settingsTab: Locator;
    readonly liveEventsButton: Locator;
    readonly sourcesTabContent: Locator;
    readonly eventsTabContent: Locator;
    readonly configurationTabContent: Locator;

    constructor(page: Page) {
        this.page = page;
        this.destinationName = page.getByRole("heading", { level: 3 });
        this.destinationType = page.locator("text=HTTP Webhook");
        this.destinationStatus = page.locator("text=ENABLED");
        this.connectedSource = page.getByText("assignment Source 1");
        this.sourcesTab = page.getByRole("tab", { name: "Sources" });
        this.eventsTab = page.getByRole("tab", { name: "Events" });
        this.configurationTab = page.getByRole("tab", { name: "Configuration" });
        this.settingsTab = page.getByRole("tab", { name: "Settings" });
        this.liveEventsButton = page.getByRole("button", { name: "Live events" });
        this.sourcesTabContent = page.getByRole("tabpanel", { name: "Sources" });
        this.eventsTabContent = page.getByRole("tabpanel", { name: "Events" });
        this.configurationTabContent = page.getByRole("tabpanel", { name: "Configuration" });
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("domcontentloaded");
        await this.destinationName.waitFor({ state: "visible" });
    }

    async getDestinationName(): Promise<string> {
        const name = await this.destinationName.textContent();
        return name?.trim() ?? "";
    }

    async isDestinationEnabled(): Promise<boolean> {
        return await this.destinationStatus.isVisible();
    }

    async clickTab(tabName: string): Promise<void> {
        switch (tabName.toLowerCase()) {
            case "sources":
                await this.sourcesTab.click();
                break;
            case "events":
                await this.eventsTab.click();
                break;
            case "configuration":
                await this.configurationTab.click();
                break;
            case "settings":
                await this.settingsTab.click();
                break;
            default:
                throw new Error(`Unknown tab: ${tabName}`);
        }
    }

    async clickLiveEvents(): Promise<void> {
        await this.liveEventsButton.click();
    }

    async isTabContentVisible(tabName: string): Promise<boolean> {
        switch (tabName.toLowerCase()) {
            case "sources":
                return await this.sourcesTabContent.isVisible();
            case "events":
                return await this.eventsTabContent.isVisible();
            case "configuration":
                return await this.configurationTabContent.isVisible();
            default:
                return false;
        }
    }
}
