import { Page } from "playwright";

/**
 * Instance-based page factory for proper page object caching
 * Each browser context gets its own factory instance to avoid cross-test contamination
 */
export class PageFactory {
    private cache = new Map<string, unknown>();

    constructor(private page: Page) {
        // Page is guaranteed to exist due to TypeScript typing
    }

    get<T>(PageClass: new (page: Page) => T): T {
        const key = PageClass.name;
        if (!this.cache.has(key)) {
            this.cache.set(key, new PageClass(this.page));
        }
        return this.cache.get(key) as T;
    }

    clear(): void {
        this.cache.clear();
    }

    /**
     * Update the page reference and clear cache when page changes
     * This ensures page objects use the correct page instance
     */
    updatePage(newPage: Page): void {
        this.page = newPage;
        this.clear(); // Clear cache when page changes
    }
}
