import { World, IWorldOptions, setWorldConstructor, setDefaultTimeout } from "@cucumber/cucumber";
import { Page, Browser, BrowserContext } from "playwright";
import { PageFactory } from "./page-factory";
import { LoginPage } from "../authentication/login.page";
import { ConnectionsPage } from "../connections/connections.page";
import { DestinationDetailsPage } from "../connections/destinations/destination-details.page";
import { EventsPage } from "../connections/destinations/events/events.page";

export interface ICustomWorld extends World {
    // Browser objects (set in hooks)
    browser: Browser;
    context: BrowserContext;
    page: Page;

    // Page objects (lazy loaded)
    readonly loginPage: LoginPage;
    readonly connectionsPage: ConnectionsPage;
    readonly destinationDetailsPage: DestinationDetailsPage;
    readonly eventsPage: EventsPage;

    // Test state for event tracking
    initialEventCount?: number;

    cleanup(): void;
}

export class CustomWorld extends World implements ICustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    private pageFactory?: PageFactory;

    constructor(options: IWorldOptions) {
        super(options);
    }

    cleanup(): void {
        this.pageFactory?.clear();
    }

    /**
     * Get or create the page factory instance
     * This ensures we always have a factory tied to the current page
     */
    private getPageFactory(): PageFactory {
        this.pageFactory ??= new PageFactory(this.page);
        return this.pageFactory;
    }

    /**
     * Update page factory when page changes (useful for page navigation)
     */
    updatePageReference(newPage: Page): void {
        this.page = newPage;
        this.pageFactory?.updatePage(newPage);
    }

    // Simple page object getters using instance-based factory
    get loginPage(): LoginPage {
        return this.getPageFactory().get(LoginPage);
    }

    get connectionsPage(): ConnectionsPage {
        return this.getPageFactory().get(ConnectionsPage);
    }

    get destinationDetailsPage(): DestinationDetailsPage {
        return this.getPageFactory().get(DestinationDetailsPage);
    }

    get eventsPage(): EventsPage {
        return this.getPageFactory().get(EventsPage);
    }
}

// Set default timeout for all Cucumber steps to 60 seconds
setDefaultTimeout(60 * 1000);

setWorldConstructor(CustomWorld);
