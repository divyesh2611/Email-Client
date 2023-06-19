Feature: Get all user.

Scenario Outline: Try to get all user, then it will give error.

    Given 
    When Try to get all users details
    Then It will give data: <data> 
    And  give message:<message> getting user details
    
    Examples:
   | data              | message           |
   | '[{}]'            | 'users not found' |

Scenario Outline: Try to get all user, then it will give data.

    Given 
    When Try to get all users details
    Then It will give data: <data> 
    And  give message:<message> getting user details
    
    Examples:
    | data                  | message      |
    | '[{"id":1}]'          | 'user list'  |