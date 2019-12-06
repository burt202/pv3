Feature: Transaction page
  @1

  Scenario: Viewing transactions page
    Given I am a user with transactions in different categories
    When I go to the transactions overview page
    Then I should see "Transactions" as the heading in the nav bar
    And I should see transactions in the list