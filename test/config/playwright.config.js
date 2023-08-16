// let { defineConfig } = require("@playwright/test");
import { defineConfig } from "@playwright/test";
import path from "path";

export default defineConfig({
  testMatch: "*.spec.js",
  testDir: "../specs/",
  reportSlowTests: { max: 0, threshold: 240000 },
  timeout: 30000,
  maxFailures: 2,
  workers: 4,
  use: {
    headless: true,
    viewport: { width: 1200, height: 800 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "practiceAutomation",
      use: {
        browserName: "chromium",
        launchOptions: {
          channel: "chrome",
          // force GPU hardware acceleration
          // (even in headless mode)
          args: ["--use-angle=default"],
        },
      },
      fullyParallel: true,
    },
  ],
  reporter: [["list"], ["junit", { outputFile: "../output/results.xml" }]],
});
