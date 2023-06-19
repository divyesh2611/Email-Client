Feature: Update folder.

  Scenario Outline: Try to update user , then it will give message.

    Given folder Id: "<folderId>" and folderName:"<folderName>" to update folder
    When Try to update folder
    Then It will give message: <message> while updating folder

  Examples:
    | folderId   | folderName        | message               |
    |            |                   | '"folderId" is required'    |
    |            | Myfile           | '"folderId" is required'    |
    | abc        | Myfile           |'"folderId" must be a number'|
    | 7          | My                | '"folderName" length must be at least 5 characters long' |
    | 7          | Myfile            |'folder is updated'      | 