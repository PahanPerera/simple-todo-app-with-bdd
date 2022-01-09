Feature: Count Todos
  Scenario: view todo count
    Given I load the TodoApp
    When I add new todo called "Pay rent"
    Then I should see 3 todos
    # There are 2 todos when app starts