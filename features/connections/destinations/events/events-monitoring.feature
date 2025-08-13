Feature: Events Monitoring

  Background:
    Given the user from company "dummy company" is authenticated
    And the user is on the connections page
    And the user clicks on the destination "request catcher 1"
    And the user is on the destination details page

  Scenario: User can view event delivery metrics
    When the user clicks on the "Events" tab in destination details page
    Then the user should see the delivered events count
    And the user should see the failed events count
    And the user should see the failure rate percentage


  Scenario: Verify end-to-end event delivery
    Given the user clicks on the "Events" tab in destination details page
    And the user has captured the initial event count
    When the user sends a "test_event" event to the source via API
    Then the "Delivered" event count should increase by 1

