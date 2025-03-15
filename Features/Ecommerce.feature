Feature: Ecommerce E2E test

  Scenario: User is placing an order
    Given the user logs in with "dummyemail12@gmail.com" and "Patryk123!"
    When Add "ADIDAS ORIGINAL" to Cart
    Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
    When Enter valid details and Place the Order