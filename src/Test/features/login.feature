Feature: User Authentication tests

Background:
  Given User navigates to the application
  And User click on the login link
Scenario:
  Given User enter the username as "Chandru123"
  And User enter the password as "Chandru@2004"
  When User click on the login button
  Then login should be success

Scenario: Login should not be success
  Given User enter the username as "karan123"
  And User enter the password as ""
  When User click on the login button
  Then login should fail