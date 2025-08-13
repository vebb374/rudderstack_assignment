export interface EventData {
  userId: string;
  event?: string;
  properties?: Record<string, unknown>;
  traits?: Record<string, unknown>;
  context?: Record<string, unknown>;
}

export class EventFactory {
  private static baseUserId = 'test-user';
  private static counter = 0;

  static createTrackEvent(overrides: Partial<EventData> = {}): EventData {
    this.counter++;
    return {
      userId: `${this.baseUserId}-${this.counter}`,
      event: 'test_event',
      properties: {
        test: 'test-property',
        timestamp: new Date().toISOString(),
        source: 'automated-test',
        testRun: Date.now()
      },
      context: {
        library: {
          name: 'playwright-test',
          version: '1.0.0'
        }
      },
      ...overrides
    };
  }

  static createIdentifyEvent(overrides: Partial<EventData> = {}): EventData {
    this.counter++;
    return {
      userId: `${this.baseUserId}-${this.counter}`,
      traits: {
        email: `test.user.${this.counter}@example.com`,
        name: `Test User ${this.counter}`,
        createdAt: new Date().toISOString()
      },
      context: {
        library: {
          name: 'playwright-test',
          version: '1.0.0'
        }
      },
      ...overrides
    };
  }

  static createPageEvent(overrides: Partial<EventData> = {}): EventData {
    this.counter++;
    return {
      userId: `${this.baseUserId}-${this.counter}`,
      properties: {
        name: 'Test Page',
        url: 'https://example.com/test',
        title: 'Test Page Title',
        timestamp: new Date().toISOString()
      },
      context: {
        library: {
          name: 'playwright-test',
          version: '1.0.0'
        }
      },
      ...overrides
    };
  }

  static reset(): void {
    this.counter = 0;
  }
}

