import { Page, Locator } from "playwright";
import { CommonUI } from "@features/common/common-ui.page";
type TabName = "Sources" | "Events" | "Configuration" | "Settings" | "Transformation";
export class DestinationDetailsPage {
    readonly page: Page;
    readonly commonUI: CommonUI;
    readonly destinationName: Locator;
    readonly destinationType: Locator;
    readonly syncToggleSwitch: Locator;

    readonly tabLabel: (tabName: TabName) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.commonUI = new CommonUI(page);
        this.destinationName = page.getByRole("heading", { level: 3 });
        this.destinationType = page.locator("text=HTTP Webhook");
        this.syncToggleSwitch = page.getByTestId("syncToggleSwitch");

        //tabs
        this.tabLabel = (tabName: TabName) => page.getByRole("tab", { name: tabName });
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
        return (await this.syncToggleSwitch.getAttribute("checked")) === "true";
    }

    async clickTab(tabName: TabName): Promise<void> {
        await this.tabLabel(tabName).click();
        await this.commonUI.waitForSkeletonToDisappear();
    }
}
