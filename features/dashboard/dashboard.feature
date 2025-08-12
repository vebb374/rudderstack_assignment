Feature: RudderStack Dashboard

  Background:
    Given the user is on the connections page

  Scenario: User can view connection details on the dashboard
    When the user views the dashboard
    Then the user should see the Data Plane URL
    And the user should see the HTTP Source Write Key
