import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomeDashboard extends BasePage {
  // Constructor
  constructor(page: Page) {
    super(page);
  }
  //Locator of Home Page

  protected readonly cardLocator: Locator = this.accessPage.locator("div.card");

  protected readonly signOutButton: Locator = this.accessPage.getByRole(
    "button",
    { name: " Sign Out " },
  );

  protected readonly addToCartButton: Locator = this.accessPage.getByRole(
    "button",
    { name: " Add To Cart" },
  );

  public readonly cartButton: Locator = this.accessPage.locator(
    'button[routerlink="/dashboard/cart"]',
  );
  public readonly cartNumber: Locator = this.accessPage.getByRole("button", {
    name: "Cart",
  });

  // this button at Summary Page before payment
  protected readonly checkoutButton: Locator = this.accessPage.getByRole(
    "button",
    {
      name: "Checkout",
    },
  );

  //Methods
  async addProductInCart(productName: string): Promise<HomeDashboard> {
    await this.cardLocator
      .filter({ hasText: productName })
      .getByRole("button", { name: " Add To Cart" })
      .click();
    return this;
  }

  async clickOncarttButton(): Promise<HomeDashboard> {
    await this.cartButton.click();
    return this;
  }

  async clickOnCheckoutOnAtCartScreen(): Promise<HomeDashboard> {
    await this.checkoutButton.click();
    return this;
  }

  getCardLocator(): Locator {
    return this.cardLocator;
  }
}
