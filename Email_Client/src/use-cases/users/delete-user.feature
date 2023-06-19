Feature: Delete User.

  Scenario Outline: Try to delete user , then it will give message.

    Given User Id: "<id>" to delete user
    When Try to delete user
    Then It will give message: <message> while deleting user

  Examples:
    | id         | message               |
    |            | '"id" is required'    |
    | abc        |'"id" must be a number'|
    | 7          | 'user is deleted'     |