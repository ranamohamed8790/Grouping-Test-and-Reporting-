import { expect, test } from "@playwright/test";
import { LoginPage } from "../PagesFolder/LoginPage";
import { HomeDashboard } from "../PagesFolder/HomeDashboard";
import fs from "fs";
import path from "path";
import { paths } from "../config/paths";

const email = process.env.EMAIL ?? "";
const password = process.env.PASSWORD ?? "";

const loginData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../test-data/login-data.json"),
    "utf-8",
  ),
);
const productData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../test-data/product-data.json"),
    "utf-8",
  ),
);

const invalidLogins = loginData.filter(
  (c: any) => c.expectedResult === "invalid",
);
const validProducts = productData.filter((p: any) => p.validity === "valid");
const invalidProducts = productData.filter(
  (p: any) => p.validity === "invalid",
);

let login: LoginPage;
let home: HomeDashboard;

test.beforeEach(async ({ page }) => {
  login = new LoginPage(page);
  home = new HomeDashboard(page);
});

async function loginAs(user: string, pass: string) {
  await login.openLoginPage();
  await login.logintoHomePage(user, pass);
}

test.describe("Login", () => {
  test.describe.configure({ mode: "parallel" });

  test(
    "Valid login using .env credentials",
    { tag: ["@smoke", "@valid"] },
    async ({ page }) => {
      if (!email || !password)
        throw new Error("Set EMAIL and PASSWORD in .env");
      await loginAs(email, password);
      await expect(page).toHaveURL(paths.home);
    },
  );

  for (const c of invalidLogins) {
    test(
      `Invalid login: ${c.testCaseTitle}`,
      { tag: ["@regression", "@invalid"] },
      async () => {
        await loginAs(c.username, c.password);
        await login.errorMessage(c.expectedMessage);
      },
    );
  }
});

test.describe("Cart", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async () => {
    await loginAs(email, password);
  });

  for (const p of validProducts) {
    test(
      `Add valid product: ${p.productName}`,
      { tag: ["@smoke", "@valid"] },
      async () => {
        await home.addProductInCart(p.productName);
        await expect(home.cartButton).toContainText("1");
      },
    );
  }

  for (const p of invalidProducts) {
    test(
      `Invalid product not listed: ${p.productName}`,
      { tag: ["@regression", "@invalid"] },
      async () => {
        await expect(
          home.getCardLocator().filter({ hasText: p.productName }),
        ).toHaveCount(0);
      },
    );
  }
});
