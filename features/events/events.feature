Feature: RudderStack Event Flow

  Background:
    Given the user is on the connections page

  Scenario: Verify end-to-end event delivery
    Given the user has the Data Plane URL and the HTTP Source Write Key
    And the user navigates to the destination and records the initial event count
    When the user sends a "test_event" event to the source via API
    Then the "Delivered" event count should increase by 1
