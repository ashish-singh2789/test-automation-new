import { test, expect } from "@playwright/test";
// import expect from "chai";
import {
  baseURL,
  loginPageURL,
  userId,
  password,
  regEx,
  userIdErrorText,
  passwordErrorText,
  incorrectUserName,
  incorrectPassword,
} from "../config/constants.js";
import { Utils } from "../utils/utilities.js";
import locators from "../config/locators.js";

test.describe("Test login : ", () => {
  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    // Open the webpage
    await utils.open(baseURL);
  });

  test("login : ", async ({ page }) => {
    const utils = new Utils(page);
    // Login to the webpage
    await utils.login(userId, password);
    // Assert page URL
    await expect(page).toHaveURL(loginPageURL);
    // Assert page contains expected text
    await utils.verifyTextWithRegex(regEx);
    await utils.logout();
  });

  test("incorrect userName : ", async ({ page }) => {
    const utils = new Utils(page);
    // Login to the webpage
    await utils.login(incorrectUserName, password);
    // Assert the error
    await utils.verifyTextwithStrings(userIdErrorText);
  });

  test("incorrect password : ", async ({ page }) => {
    const utils = new Utils(page);
    // Login to the webpage
    await utils.login(userId, incorrectPassword);
    // Assert the error
    await utils.verifyTextwithStrings(passwordErrorText);
  });

  test("Validate company logo : ", async ({ page }) => {
    const utils = new Utils(page);
    // Compare logo image
    await utils.runPixelTest(page, `${locators.LOGO}`, "logo.png");
  });
});
