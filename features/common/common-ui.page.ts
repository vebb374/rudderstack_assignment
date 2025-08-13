import { Page, Locator } from "playwright";

export class CommonUI {
    readonly page: Page;
    readonly antSkeleton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.antSkeleton = page.locator(".ant-skeleton");
    }

    async waitForSkeletonToDisappear(): Promise<void> {
        try {
            await this.antSkeleton.waitFor({ state: "visible", timeout: 1000 });
            await this.antSkeleton.waitFor({ state: "hidden", timeout: 5000 });
        } catch {
            return;
        }
    }
}
