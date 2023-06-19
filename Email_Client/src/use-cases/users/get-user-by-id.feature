Feature: Get User By Id.

  Scenario Outline: Try to get user by id , then it will give message.

    Given User Id: "<id>" and columes:"<columes>" to get user details
    When Try to get user details
    Then It will give message: <message> getting user details

  Examples:
    | id         | columes          |message               |
    | abc      | User_name        |'"id" must be a number'|
    | 7          | ['User_name']        |'user details'        |

