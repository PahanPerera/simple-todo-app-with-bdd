Feature: Add Todo
  Scenario: add simple todo
    Given I load the TodoApp
    When I add new todo called "Pay rent"
    Then I should see a "pending" todo called "Pay rent"