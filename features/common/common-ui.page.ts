import { Page, Locator } from "playwright";

export class CommonUI {
    readonly page: Page;
    readonly antSkeleton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.antSkeleton = page.locator(".ant-skeleton");
    }

    async waitForSkeletonToDisappear(): Promise<void> {
        if (await this.antSkeleton.isVisible({ timeout: 500 })) {
            await this.antSkeleton.waitFor({ state: "hidden" });
        }
    }
}
