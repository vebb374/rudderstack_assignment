Feature: Connections Overview

  Background:
    Given the user is on the connections page

  Scenario: User can view connection details on the connections page
    When the user views the connections overview
    Then the user should see the Data Plane URL
    And the user should see the HTTP Source with Write Key
    And the user should see the connected destinations

  Scenario: User can navigate to source details
    When the user clicks on the HTTP source
    Then the user should be on the source details page

  Scenario: User can navigate to destination details  
    When the user clicks on the webhook destination
    Then the user should be on the destination details page
