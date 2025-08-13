import { Page, Locator } from "playwright";
import { CommonUI } from "@features/common/common-ui.page";
export type TabName = "Sources" | "Events" | "Configuration" | "Settings" | "Transformation";
export class DestinationDetailsPage {
    readonly page: Page;
    readonly commonUI: CommonUI;
    readonly destinationName: Locator;

    readonly syncToggleSwitch: Locator;

    readonly tabLabel: (tabName: TabName) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.commonUI = new CommonUI(page);
        this.destinationName = page
            .locator(".dest-syncing-target")
            .getByRole("heading", { name: "request catcher" });
        this.syncToggleSwitch = page.getByTestId("syncToggleSwitch");

        //tabs
        this.tabLabel = (tabName: TabName) => page.getByRole("tab", { name: tabName });
    }

    async waitForPageLoad(): Promise<void> {
        // Wait for URL to match destinations pattern (e.g., /destinations/31BPgcHpqmVmaQSpxfpFGPvw6Ct)
        await this.page.waitForURL(/.*\/destinations\/[a-zA-Z0-9]+/, { timeout: 30000 });
        await this.page.waitForLoadState("load");
        await this.destinationName.waitFor({ state: "visible" });
    }

    async getDestinationName(): Promise<string> {
        const name = await this.destinationName.textContent();
        return name?.trim() ?? "";
    }

    async isDestinationEnabled(): Promise<boolean> {
        return (await this.syncToggleSwitch.getAttribute("aria-checked")) === "true";
    }

    async clickTab(tabName: TabName): Promise<void> {
        await this.tabLabel(tabName).click();
        await this.commonUI.waitForSkeletonToDisappear();
    }
}
