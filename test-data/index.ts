// Account data exports (new approach)
export { getAccountData, getAccountCredentials, getAvailableAccounts } from './account-data';
export type { AccountKey } from './account-data';
export type { RudderStackAccount } from './accounts/account-interface';

// Factories exports  
export { EventFactory } from './factories/event-factory';
export type { EventData } from './factories/event-factory';

// Fixtures - JSON files need to be imported directly
export { default as testEvents } from './fixtures/test-events.json';

