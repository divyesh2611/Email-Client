Feature: Delete folder.

  Scenario Outline: Try to delete folder , then it will give message.

    Given folder Id: "<Id>" to delete folder
    When Try to delete folder
    Then It will give message: <message> while deleting folder

  Examples:
    | Id         | message               |
    |            | '"Id" is required'    |
    | abc        |'"Id" must be a number'|
    | 7          | 'folder is deleted'     |