import { pageFixture } from '../hooks/PageFixture';
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
//import { PageFixture } from "../../hooks/PageFixture";

const page = () => pageFixture.page;

Then('User search the book {string}', async function (book: string) {
  await page().locator("//input[@type='search']").fill(book);
  const option = page().locator("mat-option[role='option'] span").first();
  await option.waitFor({ state: 'visible' });
  await option.click();
});

Then('User add the book to cart', async function () {
  const addToCart = page().locator("//button[@color='primary']").first();
  await addToCart.waitFor({ state: 'visible' });
  await addToCart.click();

  const toast = page().locator("simple-snack-bar");
  await expect(toast).toBeVisible();
  await toast.waitFor({ state: 'hidden' });
});

Then('User can view the book carted', async function () {
  const badgeLocator = await page().locator("#mat-mdc-badge-content-0").textContent();
  expect(Number(badgeLocator)).toBeGreaterThan(0);
});