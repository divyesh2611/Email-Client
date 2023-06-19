Feature: Update access token.

 Scenario Outline: Try to update aceess token , then it will give message.

    When Try to update access token
    Then It will give message: <message> while deleting user

  Examples:
    | message                          |
    | access token updated successfully|