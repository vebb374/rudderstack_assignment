import { Page, Locator } from "playwright";

export class ConnectionsPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly dataPlaneUrlElement: Locator;

    // Sources
    readonly sourcesListSection: Locator;
    readonly sourceCardContainer: (sourceName: string) => Locator;
    readonly sourceWriteKeyElement: Locator;

    // Destinations
    readonly destinationsListSection: Locator;
    readonly destinationCardContainer: (destinationName: string) => Locator;
    readonly destinationWriteKeyElement: Locator;

    // Ask AI Pop Up
    readonly askAIPopUp: Locator;
    readonly closeAskAIPopUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.askAIPopUp = page
            .getByRole("alertdialog")
            .filter({ hasText: "Have a question? Ask AI (Beta)" });
        this.closeAskAIPopUpButton = this.askAIPopUp.getByRole("button", { name: "Close" });
        this.pageTitle = page.getByRole("heading", { name: "Connections" });
        this.dataPlaneUrlElement = page
            .locator("#top-layout")
            .locator("span")
            .filter({ hasText: "https://" });
        this.sourcesListSection = page.locator("div[id=sources-list]");
        this.destinationsListSection = page.locator("div[id=destinations-list]");
        this.sourceCardContainer = (sourceName: string) =>
            this.sourcesListSection.locator(`div[id^="source-"]`).filter({ hasText: sourceName });
        this.destinationCardContainer = (destinationName: string) =>
            this.destinationsListSection
                .locator(`div[id^="destination-"]`)
                .filter({ hasText: destinationName });
        this.sourceWriteKeyElement = this.sourcesListSection
            .locator(`div[id^="source-"]`)
            .getByText("Write key");
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState();
        await this.pageTitle.waitFor({ state: "visible" });
    }

    async getDataPlaneUrl(): Promise<string> {
        const url = await this.dataPlaneUrlElement.textContent();
        if (!url) {
            throw new Error("Data plane URL not found");
        }
        return url.trim();
    }

    async getSourceWriteKey(): Promise<string> {
        const key = await this.sourceWriteKeyElement.textContent();
        if (!key) {
            throw new Error("Source write key not found");
        }
        return key.trim();
    }

    async clickSource(sourceName: string): Promise<void> {
        await this.sourceCardContainer(sourceName).click();
    }

    async clickDestination(destinationName: string): Promise<void> {
        await this.destinationCardContainer(destinationName).click();
    }

    async isSourceVisible(sourceName: string): Promise<boolean> {
        return await this.sourceCardContainer(sourceName).isVisible();
    }

    async isDestinationVisible(destinationName: string): Promise<boolean> {
        return await this.destinationCardContainer(destinationName).isVisible();
    }
}
