Feature: Fetch folder.

  Scenario Outline: Try to fetch folder , then it will give message.

    Given folder access_token: "Access_Token" and refresh_token: "Refresh_Token" to fetch folder
    When Try to fetch folder
    Then It will give message: <message> while fetch folder

  Examples:
    | Access_Token                                                                   | Refresh_Token                                                                                             | message               |
    |                                                                                |                                                                                                           | 'Access_Token" is required'    |
    | "ya29.a0Ael9sCP8pL72AnGtbbkBMaj-bj7lkZTCbabKMzccWfadsfafsdfas456sdfgkknmtiertw"|                                                                                                           |'"Refresh_Token" must be a number'|
    | "ya29.a0Ael9sCP8pL72AnGtbbkBMaj-bj7lkZTCbabKMzccWfadsfafsdfas456sdfgkknmtiertw"|  "1//0gAGDh52-17FKCgYIARAAGBASNwF-L9Ir54wBZuAa3H9Z52cJoa211zN5CQwsu-Bl-N454mJlDBGrFN-5hRfbRteE7UeoSdDgRc" | 'folder is fetched'     |