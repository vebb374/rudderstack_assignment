import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
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

    // Test data
    testData: Map<string, unknown>;

    // Utilities
    storeTestData<T>(key: string, value: T): void;
    getTestData<T>(key: string): T | undefined;
    cleanup(): void;
}

export class CustomWorld extends World implements ICustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    testData = new Map<string, unknown>();

    constructor(options: IWorldOptions) {
        super(options);
    }

    storeTestData<T>(key: string, value: T): void {
        this.testData.set(key, value);
    }

    getTestData<T>(key: string): T | undefined {
        return this.testData.get(key) as T | undefined;
    }

    cleanup(): void {
        this.testData.clear();
        PageFactory.clear();
    }

    // Simple page object getters
    get loginPage(): LoginPage {
        return PageFactory.get(this.page, LoginPage);
    }

    get connectionsPage(): ConnectionsPage {
        return PageFactory.get(this.page, ConnectionsPage);
    }

    get destinationDetailsPage(): DestinationDetailsPage {
        return PageFactory.get(this.page, DestinationDetailsPage);
    }

    get eventsPage(): EventsPage {
        return PageFactory.get(this.page, EventsPage);
    }
}

setWorldConstructor(CustomWorld);
