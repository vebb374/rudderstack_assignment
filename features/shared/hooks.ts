import { Before, After, BeforeAll } from "@cucumber/cucumber";
import { chromium, request } from "playwright";
import { ICustomWorld } from "./world";
import { getEnvironmentConfig, setupEnvironment } from "./env";
import * as fs from "fs";
import * as path from "path";

/**
 * Clears only ZIP files (Playwright traces) from the test-results folder
 * Keeps HTML and JSON reports intact for persistence across test runs
 * Only runs on the main worker to avoid race conditions in parallel execution
 */
function clearTestResults(): void {
    // Only the main worker (worker 0 or undefined) should clean the folder
    // This prevents race conditions when running tests in parallel
    const workerId = process.env.CUCUMBER_WORKER_ID;
    const isMainWorker = !workerId || workerId === "0";

    if (!isMainWorker) {
        return;
    }

    const testResultsDir = path.join(process.cwd(), "test-results");

    try {
        if (!fs.existsSync(testResultsDir)) {
            fs.mkdirSync(testResultsDir, { recursive: true });
        }

        // Read all files in the directory
        const files = fs.readdirSync(testResultsDir);

        // Remove only ZIP files (Playwright traces), keep reports
        files
            .filter((file) => file.endsWith(".zip"))
            .forEach((file) => {
                const filePath = path.join(testResultsDir, file);
                try {
                    fs.unlinkSync(filePath);
                } catch (fileError) {
                    // File might have been deleted by another process, continue
                    const error = fileError as { code?: string };
                    if (error.code !== "ENOENT") {
                        console.warn(`⚠️ Could not remove ZIP file ${file}:`, error);
                    }
                }
            });
    } catch (error: unknown) {
        // Handle directory-level errors
        const errorWithCode = error as { code?: string; message?: string };
        console.warn("⚠️ Error cleaning test-results folder:", errorWithCode.message ?? error);
    }
}

BeforeAll(() => {
    // Clear test-results folder before starting tests
    clearTestResults();

    // Get env variables
    setupEnvironment();
});

Before(async function (this: ICustomWorld) {
    const config = getEnvironmentConfig();

    // Ensure test-results directory exists
    const testResultsDir = path.join(process.cwd(), "test-results");
    if (!fs.existsSync(testResultsDir)) {
        fs.mkdirSync(testResultsDir, { recursive: true });
    }

    this.browser = await chromium.launch({
        headless: config.headless,
        slowMo: config.slowMo,
    });

    this.context = await this.browser.newContext({
        viewport: { width: 1280, height: 720 },
    });
    this.apiContext = await request.newContext();

    // Start tracing
    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true,
    });

    this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld, scenario) {
    const testResultsDir = path.join(process.cwd(), "test-results");
    const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    try {
        // Stop tracing and save it
        const tracePath = path.join(testResultsDir, `trace-${scenarioName}-${timestamp}.zip`);
        await this.context.tracing.stop({ path: tracePath });

        // If scenario failed, capture additional debugging info
        if (scenario.result?.status === "FAILED") {
            console.error(`\n🚨 Scenario Failed: ${scenario.pickle.name}`);
            console.error(`📁 Open trace viewer with: npx playwright show-trace ${tracePath}`);

            // Attach trace to Cucumber report
            this.attach(fs.readFileSync(tracePath), {
                mediaType: "application/zip",
                fileName: `trace-${scenarioName}.zip`,
            });
        } else {
            // For passed tests, just clean up the trace file
            if (fs.existsSync(tracePath)) {
                fs.unlinkSync(tracePath);
            }
        }
    } catch (error) {
        console.error("Error handling trace:", error);
    }

    // Clean up test data and page objects
    this.cleanup();

    // Close browser resources with error handling
    try {
        if (!this.page.isClosed()) {
            await this.page.close();
        }
        await this.context.close();
        await this.browser.close();
        await this.apiContext.dispose();
    } catch (error) {
        console.warn("Error during cleanup:", error);
    }
});
