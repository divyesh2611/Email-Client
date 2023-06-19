Feature: Update User.

  Scenario Outline: Try to update user , then it will give message.

    Given User Id: "<id>" and name:"<name>" to update user
    When Try to update user
    Then It will give message: <message> while updating user

  Examples:
    | id         | name              | message               |
    |            |                   | '"id" is required'    |
    |            | Divyesh           | '"id" is required'    |
    | abc        | Divyesh           |'"id" must be a number'|
    | 7          | Div               | '"name" length must be at least 5 characters long' |
    | 7          | Divyesh           |'user is updated'      | 