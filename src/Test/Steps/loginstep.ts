import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";

let browser: Browser;
let page: Page;

Given('User navigates to the application', { timeout: 20000 }, async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://bookcart.azurewebsites.net/");
});

Given('User click on the login link', async function () {
  await page.locator("xpath=//span[text()=' Login ']").click();
});

Given('User enter the username as {string}', async function (username: string) {
  await page.locator("xpath=//input[@placeholder='Username']").fill(username);
});

Given('User enter the password as {string}', async function (password: string) {
  await page.locator("xpath=//input[@placeholder='Password']").fill(password);
});

When('User click on the login button', async function () {
  await page.locator("xpath=//span[text()='Login']").click();
});

    Then('login should be success', async function () {
  const userWelcome = await page.locator("xpath=(//span[@class='mdc-button__label']/child::span)[1]").isVisible();
  expect(userWelcome).toBeTruthy();
});
      Then('login should fail', async function () {
  const errorMessage = await page.locator("text=Password is required").isVisible();
  expect(errorMessage).toBeTruthy();
});