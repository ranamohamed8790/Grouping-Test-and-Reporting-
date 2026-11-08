import { defineConfig, devices } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";
import { on } from "cluster";

dotenv.config({ path: path.resolve(__dirname, ".env") });
console.log("BASE_URL is:", process.env.BASE_URL);

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "reports" }],
    ["json", { outputFile: "results.json/results.json" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "https://rahulshettyacademy.com/client/",
    screenshot: "on",
    trace: "on-first-retry",
  },

  // projects: [
  //   {
  //     name: "chromium",
  //     use: { ...devices["Desktop Chrome"] },
  //   },

  // {
  //   name: "firefox",
  //   use: { ...devices["Desktop Firefox"] },
  // },

  // {
  //   name: "webkit",
  //   use: { ...devices["Desktop Safari"] },
  // },

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
