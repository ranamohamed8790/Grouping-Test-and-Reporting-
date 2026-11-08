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
    baseURL: process.env.BASE_URL || "https://rahulshettyacademy.com/client/",
    screenshot: "on",
    trace: "on-first-retry",
  },
});
