const { Given, When, Then, After } = require("@cucumber/cucumber");
const { PageManager } = require("../../../pages/PageManager");
const { chromium } = require("@playwright/test"); // Correctly importing playwright here

let browser;
let page;
let context;

Given(
  "the user logs in with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    if (!browser) {
      browser = await chromium.launch({ headless: false }); // Initialize browser once
      context = await browser.newContext();
      page = await context.newPage();
    }
    this.pageManager = new PageManager(page);
    const loginPage = this.pageManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When(
  "Add {string} to Cart",
  { timeout: 100 * 1000 },
  async function (productName) {
    this.dashboardPage = this.pageManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
  }
);

Then("Verify {string} is displayed in the Cart", async function (productName) {
  const cartPage = this.pageManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When("Enter valid details and Place the Order", async function () {
  const ordersReviewPage = this.pageManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("pol", "Poland");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId(); // Ensure we wait for the orderId
  console.log(this.orderId);
});

// After hook to close the browser
After(async function () {
  if (browser) {
    console.log("Closing the browser...");
    await browser.close();
  }
});
