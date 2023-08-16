import fs from "fs";
import path from "path";

const baseURL = "https://practicetestautomation.com/practice-test-login/";
const loginPageURL =
  "https://practicetestautomation.com/logged-in-successfully/";
const userId = "student";
const password = "Password123";
const regEx = /(Congratulations|successfully logged in)/i;
const incorrectUserName = "incorrectUser";
const incorrectPassword = "incorrectPassword";
const userIdErrorText = "Your username is invalid!";
const passwordErrorText = "Your password is invalid!";
const baseLogoFileName = "logo.png";
const baseLogoImageFilePath = path.resolve(
  process.cwd(),
  "test",
  "specs",
  "login.spec.ts-snapshots",
  "logo.png",
);
const timeout = 2000;

export {
  baseURL,
  loginPageURL,
  userId,
  password,
  regEx,
  incorrectUserName,
  incorrectPassword,
  timeout,
  userIdErrorText,
  passwordErrorText,
  baseLogoFileName,
  baseLogoImageFilePath,
};
