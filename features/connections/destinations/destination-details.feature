Feature: Destination Details

  Background:
    Given the user from company "dummy company" is authenticated
    And the user is on the connections page
    And the user clicks on the destination "request catcher 1"

  Scenario: User can view destination details
    Given the user is on the destination details page
    Then the user should see the destination name "request catcher 1"
    And the user should see the destination status as "ENABLED"
    And the user is able to see different tabs in destination details page


