import { Before, After, BeforeAll } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { ICustomWorld } from "./world";
import { setupEnvironment } from "./env";

BeforeAll(() => {
    //get env variables
    setupEnvironment();
});

Before(async function (this: ICustomWorld) {
    this.browser = await chromium.launch({
        headless: process.env.HEADLESS !== "false",
        slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0,
    });

    this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
    });

    this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld) {
    // Clean up test data and page objects
    this.cleanup();

    // Close browser resources with error handling
    try {
        if (!this.page.isClosed()) {
            await this.page.close();
        }
        await this.context.close();
        await this.browser.close();
    } catch (error) {
        // Ignore cleanup errors during test teardown
        console.warn("Error during cleanup:", error);
    }
});
