Feature: Ecommerce E2E test

  Scenario Outline: User is placing an order
    Given the user logs in with "<username>" and "<password>"
    When Add "<product>" to Cart
    Then Verify "<product>" is displayed in the Cart
    When Enter valid details and Place the Order

    Examples:
        | username | password | product |
        | dummyemail12@gmail.com  | Patryk123!  | ADIDAS ORIGINAL  |
        
        