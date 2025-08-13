Feature: Destination Details

  Background:
    Given the user is on the connections page
    And the user navigates to the webhook destination

  Scenario: User can view destination details
    When the user views the destination details
    Then the user should see the destination name "request catcher 1"
    And the user should see the destination type "HTTP Webhook"
    And the user should see the destination status as "ENABLED"
    And the user should see the connected source "assignment Source 1"

  Scenario: User can navigate between destination tabs
    When the user clicks on the "Sources" tab
    Then the user should see the sources tab content
    When the user clicks on the "Events" tab
    Then the user should see the events tab content
    When the user clicks on the "Configuration" tab
    Then the user should see the configuration tab content

  Scenario: User can view live events
    When the user clicks on the "Live events" button
    Then the user should be on the live events page
