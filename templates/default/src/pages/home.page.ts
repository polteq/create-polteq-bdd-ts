import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  private readonly myAccountButton = this.page.locator('#page li.my-account a');
  private readonly contactUsButton = this.page.locator('#page li.contact-us a');
  private readonly recentPosts = this.page.locator('section#recent-posts-2 li a');

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async clickMyAccount(): Promise<void> {
    await this.myAccountButton.click();
  }

  async clickContactUs(): Promise<void> {
    await this.contactUsButton.click();
  }

  async isRecentPostPresent(title: string): Promise<boolean> {
    const posts = await this.recentPosts.allTextContents();
    return posts.includes(title);
  }
}
