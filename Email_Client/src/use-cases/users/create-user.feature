Feature: Create New User.

  # Scenario Outline: Try to create new user with invalid details, then it will throw error.
  #   Given User details name: "<name>", email: "<email>" to create new user
  #   When Try to create new user
  #   Then It will throw error: "<error>" with message: <message> while creating new user
  #   # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
  #   # And createUser function will call <createUserFunctionCallCount> time while creating new user

  # Examples:
  #   | name           | email                |getUsersDetailByEmailFunctionCallCount | createUserFunctionCallCount | error | message                                                |
  #   |                |                      | 0                                     | 0                           | Error | '"name" is required'                                   |
  #   | Divyesh        |                      | 0                                     | 0                           | Error | '"email" is required'                                  |
  #   | Divyesh        | divyesh              | 0                                     | 0                           | Error | '"email" must be a valid email'                        |
  #   | Div            | divyesh@rapidops.com | 0                                     | 0                           | Error | '"name" length must be at least 5 characters long'     |
  #   | Divyesh        | 1234                 | 0                                     | 0                           | Error | '"email" must be a valid email'                        | 




  
  # Scenario Outline: Try to create new user with valid inputs, then it will throw error.
  #   Given User details name: "<name>", email: "<email>" to create new user
  #   When Try to create new user
  #   Then It will create new user with details: <newUserDetails>
  #   # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
  #   # And createUser function will call <createUserFunctionCallCount> time while creating new user

  #   Examples:
  #     | name       | email                   | newUserDetails | getUsersDetailByEmailFunctionCallCount | createUserFunctionCallCount |
  #     | Divyesh    | Divyesh@rapidops.com    | '{"id": 1}'    | 0                                      | 1                           |


  Scenario Outline: Try to create new user with already registered email, then it will throw error.
    Given User details name: "<name>", email: "<email>" to create new user
    And Already existed user details: "<userDetailsByEmail>" with same email
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | email                   | userDetailsByEmail | getUsersDetailByEmailFunctionCallCount | createUserFunctionCallCount | error | message                                      |
      | Divyesh    | Divyesh123@rapidops.com | '{"id":"10"}'      | 1                                      | 0                           | Error | User with the same email is already exists |