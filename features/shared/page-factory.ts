import { Page } from "playwright";

/**
 * Simple static factory for page objects with caching
 */
export class PageFactory {
    private static cache = new Map<string, object>();

    static get<T>(page: Page, PageClass: new (page: Page) => T): T {
        const key = PageClass.name;
        if (!this.cache.has(key)) {
            this.cache.set(key, new PageClass(page));
        }
        return this.cache.get(key);
    }

    static clear(): void {
        this.cache.clear();
    }
}
