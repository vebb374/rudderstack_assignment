Feature: Connections Overview

  Background:
    Given the user from company "dummy company" is authenticated
    And the user is on the connections page

  Scenario: User can view connection details on the connections page
    When the user views the connections overview
    Then the user should see the Data Plane URL
    And the user should see the source  "assignment Source 1"
    And the user should see the destination "request catcher 1"
