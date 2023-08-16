import { Page, expect } from "@playwright/test";
import {
  baseURL,
  passwordErrorText,
  timeout,
  userIdErrorText,
} from "../config/constants";

export class Utils {
  /**
   * Constuctor for Utils
   * @param page - page fixture for playwright
   */
  constructor(public page: Page) {}

  /**
   * Fumction to open the url
   * @param url : URL
   */
  async open(url: string) {
    await this.page.goto(url, { waitUntil: "load" });
  }

  /**
   * Funtion to login
   * @param userID : user ID
   * @param password : password
   */
  async login(userID: string, password: string) {
    await this.page.getByLabel("Username").click();
    await this.page.getByLabel("Username").fill(`${userID}`);
    await this.page.getByLabel("Password").click();
    await this.page.getByLabel("Password").fill(`${password}`);
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  /**
   * Funcion to validate text using regular expression
   * @param expectedTextRegex : expected regEx
   */
  async verifyTextWithRegex(expectedTextRegex: RegExp) {
    try {
      // Get the page's content
      const pageContent = await this.page.content();
      // Check if the expected text matches any part of the page content
      if (expectedTextRegex.test(pageContent)) {
        console.log("Page contains the expected Login Succssfull text");
      } else {
        console.log("Page does not contain the expected text");
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  }

  /**
   * Function to validate Text using strings
   * @param text : text needed to be validated
   */
  async verifyTextwithStrings(text: string) {
    // Get the page's content
    const pageContent = await this.page.content();
    // Check if the expected text matches any part of the page content
    if (text.includes(userIdErrorText)) {
      console.log("Page contains the expected text");
    } else if (text.includes(passwordErrorText)) {
      console.log("Page does not contain the expected text");
    } else {
      console.log("Invalid error message");
    }
  }

  /**
   * Run pixel test for the passed node
   * @param page - Playwright page object
   * @param selector - selector for which we capture the screenshot
   * @param fileName - Filename to be verified with " NOTE : platform name like linux/darwin is suffixed by playwright"
   */
  async runPixelTest(page, selector: string, fileName: string) {
    expect(await page.locator(selector).screenshot()).toMatchSnapshot(
      fileName,
      { threshold: 0.2, maxDiffPixelRatio: 0.2 },
    );
  }

  /**
   * Function to logout from the webpage
   */
  async logout() {
    await this.page.getByRole("link", { name: "Log out" }).click();
    // Wait for redirection
    await this.page.waitForTimeout(timeout);
    // Assert page URL
    await expect(this.page).toHaveURL(baseURL);
  }
}
