import { test as base, createBdd } from 'playwright-bdd';
import { HomePage } from '../pages/home.page';
import { MyAccountPage } from '../pages/my-account.page';
import { ContactPage } from '../pages/contact.page';

type Fixtures = {
  homePage: HomePage;
  myAccountPage: MyAccountPage;
  contactPage: ContactPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
