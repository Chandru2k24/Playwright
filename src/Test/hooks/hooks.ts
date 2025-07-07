import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { pageFixture } from './PageFixture';


let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  pageFixture.page = page;
  
});

After(async function () {
  await pageFixture.page.close();
  await browser.close();
});