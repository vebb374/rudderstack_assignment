import { RudderStackAccount } from "./accounts/account-interface";
import dummyCompanyAccount from "./accounts/dummy-company-account";
import stagingTestAccount from "./accounts/staging-test-account";

// Map of all available accounts
const accounts = {
    "dummy company": dummyCompanyAccount,
    staging_test: stagingTestAccount,
} as const;

export type AccountKey = keyof typeof accounts;

/**
 * Retrieves RudderStack account data for testing
 *
 * @param key - The account key identifier
 * @returns The account data object
 *
 * @example
 * const { email, password, dataPlaneUrl } = getAccountData('discrip_production');
 *
 * @example
 * const account = getAccountData('discrip_production');
 * await loginPage.login(account.email, account.password);
 */
export function getAccountData<K extends AccountKey>(key: K): RudderStackAccount {
    return accounts[key];
}

/**
 * Get account credentials only (email and password)
 */
export function getAccountCredentials<K extends AccountKey>(
    key: K
): { email: string; password: string } {
    const account = accounts[key];
    return {
        email: account.email,
        password: account.password,
    };
}

/**
 * Get all available account keys for reference
 */
export function getAvailableAccounts(): AccountKey[] {
    return Object.keys(accounts) as AccountKey[];
}
