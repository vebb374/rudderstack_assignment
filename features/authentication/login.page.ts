import { Page, Locator } from 'playwright';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly illDoThisLaterButton: Locator;
  readonly goToDashboardButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.illDoThisLaterButton = page.getByRole('link', { name: 'I\'ll do this later' });
    this.goToDashboardButton = page.getByRole('button', { name: 'Go to dashboard' });
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async handle2FA(): Promise<void> {
    // Handle potential 2FA setup screen
    try {
      await this.illDoThisLaterButton.waitFor({ timeout: 5000 });
      await this.illDoThisLaterButton.click();
      await this.goToDashboardButton.click();
    } catch {
      // 2FA screen didn't appear, continue
    }
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('app.rudderstack.com') && !this.page.url().includes('/login');
  }
}
