import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  private readonly stayLocationJa = this.page.locator('input[name="your-stay-location"][value="Ja"]');
  private readonly stayLocationNee = this.page.locator('input[name="your-stay-location"][value="Nee"]');
  private readonly nameField = this.page.locator('input[name="your-name"]');
  private readonly emailField = this.page.locator('input[name="your-email"]');
  private readonly subjectField = this.page.locator('input[name="your-subject"]');
  private readonly messageField = this.page.locator('textarea[name="your-message"]');
  private readonly departmentSelect = this.page.locator('select#your-department');
  private readonly sendButton = this.page.locator('input#send-button');
  private readonly messageSentIndicator = this.page.locator('div.wpcf7-response-output');

  constructor(page: Page) {
    super(page);
  }

  async sendContactMessage(
    stayAtPark: string,
    name: string,
    email: string,
    subject: string,
    message: string,
    department: string,
  ): Promise<void> {
    await this.selectStayAtPark(stayAtPark);
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.subjectField.fill(subject);
    await this.messageField.fill(message);
    await this.departmentSelect.selectOption({ label: department });
    await this.sendButton.click();
  }

  async isMessageSent(): Promise<boolean> {
    await this.messageSentIndicator.waitFor({ state: 'visible', timeout: 30_000 });
    return this.messageSentIndicator.isVisible();
  }

  private async selectStayAtPark(stayAtPark: string): Promise<void> {
    switch (stayAtPark.toLowerCase()) {
      case 'ja':
        await this.stayLocationJa.click();
        break;
      case 'nee':
        await this.stayLocationNee.click();
        break;
      default:
        throw new Error(`Invalid stay at park value: ${stayAtPark}`);
    }
  }
}
