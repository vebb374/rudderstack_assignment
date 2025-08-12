import { Page } from 'playwright';

export class LoginPage {
  private readonly page: Page;
  private readonly emailInput = 'input[name="email"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly illDoThisLaterButton = 'a[href="/addmfalater"]';
  private readonly goToDashboardButton = 'button:has-text("Go to dashboard")';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async handle2FA(): Promise<void> {
    await this.page.click(this.illDoThisLaterButton);
    await this.page.click(this.goToDashboardButton);
  }
}
