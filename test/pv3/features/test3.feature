Feature: User able to add manual account
  @2

  Scenario: Adding a manual asset
    Given I am a new user
    And I navigate to the Add asset page
    And I save the "Asset" form with
      | Asset name | Classic car A |
      | Asset value | 100000 |
    Then I should see the asset listed in the accounts list
