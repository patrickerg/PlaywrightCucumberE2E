##This is a BDD e-commerce platform using Playwright and Cucumber.js

Feature: Ecommerce E2E test

  Scenario: User is placing an order
    Given the user logs in with {username} and {password}"
    When Add {ProductName} to Cart
    Then Verify {ProductName} is displayed in the Cart
    When Enter valid details and Place the Order
