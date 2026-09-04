import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class MyAccountPage extends BasePage {
  private readonly emailField = this.page.locator('input#username');
  private readonly passwordField = this.page.locator('input#password');
  private readonly loginButton = this.page.locator('[name="login"]');
  private readonly errorMessage = this.page.locator('div.woocommerce-notices-wrapper ul.woocommerce-error');
  readonly myAccountContent = this.page.locator('div.woocommerce-MyAccount-content');

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async isMyAccountContentDisplayed(): Promise<boolean> {
    return this.myAccountContent.isVisible();
  }

  async isUsernameDisplayed(username: string): Promise<boolean> {
    const text = await this.myAccountContent.textContent();
    return text?.includes(username) ?? false;
  }
}
