Feature: Events Monitoring

  Background:
    Given the user is on the connections page
    And the user navigates to the webhook destination
    And the user is on the events tab

  Scenario: User can view event delivery metrics
    When the user views the events monitoring dashboard
    Then the user should see the delivered events count
    And the user should see the failed events count
    And the user should see the failure rate percentage
    And the user should see the events trend chart

  Scenario: User can refresh event metrics
    When the user clicks the refresh button
    Then the event metrics should be updated

  Scenario: Verify end-to-end event delivery
    Given the user has captured the initial event count
    When the user sends a "test_event" event to the source via API
    Then the "Delivered" event count should increase by 1
    And the events trend chart should show the new event
