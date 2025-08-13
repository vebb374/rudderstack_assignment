Feature: User Authentication

  Scenario: Successful login with valid credentials
    Given the user is on the RudderStack login page
    When the user logs in with valid credentials
    Then the user should be successfully authenticated
