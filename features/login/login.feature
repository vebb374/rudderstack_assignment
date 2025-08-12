Feature: User Login

  Scenario: Successful login
    Given the user is on the RudderStack login page
    When the user logs in with valid credentials
    Then the user should be on the connections page
