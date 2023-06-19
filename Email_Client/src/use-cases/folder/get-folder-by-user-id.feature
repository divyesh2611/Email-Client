Feature: getfolderbyuserid

  Scenario Outline: Try to get folder by userId , then it will give message.

    Given UserId: "<userId>" and columes:"<columns>" to get folder details
    When Try to get folder details
    Then It will give message: <message> getting folder details

  Examples:
    | userId         | columns          |message                    |
    |                |                  |'"userId" is required'     |
    | abc            | ['Name']         |'"userId" must be a number'|
    | 7              | ['Name']         |'user details'             |