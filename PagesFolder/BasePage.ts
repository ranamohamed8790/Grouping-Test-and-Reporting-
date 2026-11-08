import { type Page } from "@playwright/test";
import { paths } from "../config/paths";

export class BasePage {
  private readonly page;
  constructor(page: Page) {
    this.page = page;
  }
  // get page
  get accessPage() {
    return this.page;
  }

  // Open Login  Page
  async openLoginPage(): Promise<void> {
    await this.page.goto(paths.login);
    await this.page.waitForLoadState();
  }
}
