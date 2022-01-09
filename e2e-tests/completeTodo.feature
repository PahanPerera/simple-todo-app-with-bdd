Feature: Complete Todo
  Scenario: complete simple todo
    Given I load the TodoApp
    When I add new todo called "Pay rent"
    When I mark "Pay rent" as "completed"
    Then I should see a "completed" todo called "Pay rent"
    Then I should not see a "pending" todo called "Pay rent"