Feature: Create Folder

Scenario Outline: Try to create new folder with invalid details, then it will throw error,
    Given folder details userId: "<userId>", folderName: "<folderName>" to create new folder
    When Try to create new folder
    Then It will throw error: "<error>" with message: <message> while creating new folder 

    Examples:
    | userId   | folderName     | error   | message    |
    |          |                | Error   | '"userId" is required'|
    | abc      | My file        | Error   | '"userId" must be a number'|
    | 27       |                | Error   | '"folderName" is not allowed to be empty'|
    | 27       | 123            | Error   | '"folderName" is must be string'|         

Scenario Outline: Try to create new folder with valid details, then it will create new folder,
    Given folder details userId: "<userId>", folderName: "<folderName>" to create new folder
    When Try to create new folder
    Then It will create new folder with details: "<newFolderDetails>"

    Examples:
     | userId   | folderName     | newFolderDetails   | message               |
     | 27       | My file        | '{"Id":1}'         | '"userId" is required'|

