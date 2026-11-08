import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  // Constructor
  constructor(page: Page) {
    super(page);
  }

  //locator of checkoutPage
  protected readonly cardNumberLocator: Locator = this.accessPage
    .locator("div.field", {
      has: this.accessPage.locator("div.title", {
        hasText: "Credit Card Number",
      }),
    })
    .locator("input");

  protected readonly CVVLocator: Locator = this.accessPage
    .locator("div.field", {
      has: this.accessPage.locator("div.title", { hasText: "CVV" }),
    })
    .locator("input");

  protected readonly cardNameLoactor: Locator = this.accessPage
    .locator("div.field", {
      has: this.accessPage.locator("div.title", { hasText: "Name on Card " }),
    })
    .locator("input");

  protected readonly userNameShipperLocator: Locator = this.accessPage
    .locator("div.title")
    .locator("input");

  protected readonly placeOrderLocator: Locator = this.accessPage.getByRole(
    "button",
    { name: /place order/i },
  );

  protected readonly countryLocator: Locator =
    this.accessPage.getByPlaceholder("Select Country");

  protected readonly selectionCountryLocator: Locator =
    this.accessPage.locator("button.ta-item");

  //Methods
  // Enter card number
  async enterCardNumber(CardNumberField: string): Promise<CheckoutPage> {
    await this.cardNumberLocator.click();
    await this.cardNumberLocator.clear();
    await this.cardNumberLocator.fill(CardNumberField);
    return this;
  }

  // enter cvv
  async enterCVV(CVVField: string): Promise<CheckoutPage> {
    await this.CVVLocator.click();
    await this.CVVLocator.fill(CVVField);
    return this;
  }
  // enter card name
  async enterCardName(cardName: string): Promise<CheckoutPage> {
    await this.cardNameLoactor.click();
    await this.cardNameLoactor.fill(cardName);
    return this;
  }
  // enter select country
  async selectcountry(
    partialName: string,
    countryFullName: string,
  ): Promise<CheckoutPage> {
    await this.countryLocator.click();
    await this.countryLocator.pressSequentially(partialName, {
      delay: 100,
    });
    await this.selectionCountryLocator
      .filter({ hasText: countryFullName })
      .click();
    return this;
  }
}
