Feature: Account details page
  Background:
    Given I am a user with "3" current accounts

  Scenario: Balance should be visible
    When I go to the details of the first current account
    Then I should see the balance displayed

  @2 @3
  Scenario: Edit button in corner
    When I go to the details of the first current account
    And I click edit
    Then I should see the edit account form